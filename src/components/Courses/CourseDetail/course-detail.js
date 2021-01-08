import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import NetInfo from "@react-native-community/netinfo";
import { WebView } from "react-native-webview";
import CourseInfo from "./CourseInfo/course-info";
import { DataContext } from "../../../Contexts/DataContextProvider";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
import ApiServices from "../../../services/api-services";
import PhoneStorage from "../../../services/phone-storage";
import FileSystemApi from "../../../services/file-system-api";
const { width, height } = Dimensions.get("window");

const CourseDetail = ({ navigation, route }) => {
  const [courseDetail, setCourseDetail] = useState(route.params.course);
  const [videoUrl, setVideoUrl] = useState("");
  const [learnedTime, setLearnedTime] = useState("");
  const [isLesson, setIsLesson] = useState(false);
  const [currLesson, setCurrLesson] = useState(null);
  const [isGetUrlOffline, setIsGetUrlOffline] = useState(true);
  const [imageUrl, setImageUrl] = useState(
    route.params.course.courseImage
      ? route.params.course.courseImage
      : route.params.course.imageUrl
  );
  const {
    authors,
    searchCourses,
    getSearchCourses,
    isInternetReachable,
  } = React.useContext(DataContext);
  const { user, token, getLastLearnTime, isChanneled } = React.useContext(AuthContext);
  const { theme, language } = React.useContext(SettingContext);
  useEffect(() => {
    navigation.setOptions({ title: route.params.course.title });
  }, []);
  const getLastLesson = (id) => {
    if (user && token && isChanneled(id)) {
      ApiServices.getLastWatchLesson(token, id).then(res => res.json()).then(response => {
        if (response.payload) {
          setIsLesson(true);
          setCurrLesson(response.payload.lessonId);
          setVideoUrl(response.payload.videoUrl);
        }
      }).catch(err => {});
    }
  }
  const fetchData = (id) => {
    if (route.params.course.latestLearnTime) {
      setLearnedTime(route.params.course.latestLearnTime);
      PhoneStorage.save(
        "@LAST_LEARN_" + route.params.course.id,
        route.params.latestLearnTime
      );
    } else {
      const learnTime = getLastLearnTime(route.params.course.id);
      if (learnTime) {
        setLearnedTime(learnTime);
        PhoneStorage.save("@LAST_LEARN_" + route.params.course.id, learnTime);
      } else {
        const lastestLearnTime = PhoneStorage.load(
          "@LAST_LEARN_" + route.params.course.id
        );
        if (lastestLearnTime) {
          setLearnedTime(lastestLearnTime);
        }
      }
    }
    ApiServices.getCourseDetails(id, user ? user.id : id)
      .then((res) => res.json())
      .then((response) => {
        if (response.payload !== undefined && response.payload !== null) {
          setCourseDetail(response.payload);
          PhoneStorage.save(
            "@course_detail_info_" + id,
            JSON.stringify(response.payload)
          );
          if (response.payload.promoVidUrl) {
            setVideoUrl(response.payload.promoVidUrl);
          }
          getLastLesson(route.params.course.id);
        }
      })
      .catch((err) => {
        console.log(err);
        PhoneStorage.load("@course_detail_info_" + id, "json").then(
          (persistData) => {
            if (persistData) {
              setCourseDetail(persistData);
              if (
                persistData.promoVidUrl &&
                !persistData.promoVidUrl.includes("youtube.com")
              ) {
                FileSystemApi.getCourseVideo(
                  persistData.id,
                  persistData.promoVidUrl
                )
                  .then((promoVidUrl) => {
                    if (
                      promoVidUrl &&
                      promoVidUrl != "" &&
                      promoVidUrl != null
                    ) {
                      setVideoUrl(promoVidUrl);
                    }
                  })
                  .catch((err) => {});
              }
            }
          }
        );
      });
  };
  useEffect(() => {
    //setVideoUrl(route.params.course.promoVidUrl);
    const getImage = () => {
      const url = route.params.course.courseImage
        ? route.params.course.courseImage
        : route.params.course.imageUrl;
      setImageUrl(url);
      if (!isInternetReachable) {
        FileSystemApi.getCourseImage(route.params.course.id, url)
          .then((courseImage) => {
            if (courseImage) {
              setImageUrl(courseImage);
            }
          })
          .catch((e) => {});
      }
    };
    try {
      getImage();
    } catch (err) {}
    setCourseDetail(route.params.course);
    try {
      fetchData(route.params.course.id);
    } catch (err) {}
    NetInfo.addEventListener((state) => {});
    NetInfo.fetch()
      .then((state) => {
        if (!state.isInternetReachable) {
          setVideoUrl(null);
          FileSystemApi.getCourseVideo(
            route.params.course.id,
            route.params.course.promoVidUrl
          )
            .then((promoVidUrl) => {
              if (promoVidUrl) {
                setVideoUrl(promoVidUrl);
                setIsGetUrlOffline(false);
              }
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  }, []);

  const onVideoError = (e) => {
    console.log(e);
    NetInfo.addEventListener((state) => {});
    NetInfo.fetch()
      .then((state) => {
        if (!state.isInternetReachable) {
          setVideoUrl(null);
          FileSystemApi.getCourseVideo(
            route.params.course.id,
            route.params.course.promoVidUrl
          )
            .then((promoVidUrl) => {
              if (promoVidUrl) {
                setVideoUrl(promoVidUrl);
              }
            })
            .catch((err) => {
              alert(language.canNotLoadVideo);
            });
        }
      })
      .catch((err) => {
        alert(language.canNotLoadVideo);
      });
  };
  const ReloadData = () => {
    fetchData(route.params.course.id);
    getLastLesson(route.params.course.id);
  };
  const onChangeVideo = (url, lesson_id) => {
    setVideoUrl(url);
    setIsLesson(true);
    setCurrLesson(lesson_id);
  };
  const onPressAuthor = (authorName) => {
    const author = authors.find((n) => n["user.name"] === authorName);
    if (author) {
      navigation.navigate("Author", { author: author });
    }
  };
  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.c_0E0F13} />
      <View style={styles.imageView}>
        {videoUrl ? (
          videoUrl.includes("youtube.com") ? (
            <WebView 
              source={{ uri: videoUrl }} 
              mediaPlaybackRequiresUserAction={false} 
              allowsInlineMediaPlayback={true}
              allowsFullscreenVideo={true}
            />
          ) : (
            <Video
              source={{
                uri: videoUrl,
              }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay={true}
              isLooping={!isLesson}
              useNativeControls={true}
              style={styles.image}
              onError={onVideoError}
            />
          )
        ) : (
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.image}
          />
        )}
      </View>
      <ScrollView style={{ height: height * 0.7 }}>
        <CourseInfo
          learnedTime={learnedTime}
          course={courseDetail}
          onPressAuthor={onPressAuthor}
          onChangeVideo={onChangeVideo}
          onReload={ReloadData}
          currentLesson={currLesson}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  imageView: {
    width: width,
    height: height * 0.3,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default CourseDetail;
