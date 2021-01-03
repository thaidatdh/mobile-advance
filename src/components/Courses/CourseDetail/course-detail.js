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
} from "react-native";
import { Video } from "expo-av";
import { WebView } from "react-native-webview";
import CourseInfo from "./CourseInfo/course-info";
import { DataContext } from "../../../Contexts/DataContextProvider";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import ApiServices from "../../../services/api-services";
import PhoneStorage from "../../../services/phone-storage";
const { width, height } = Dimensions.get("window");

const CourseDetail = ({ navigation, route }) => {
  const [courseDetail, setCourseDetail] = useState(route.params.course);
  const [videoUrl, setVideoUrl] = useState(route.params.course.promoVidUrl);
  const [learnedTime, setLearnedTime] = useState("");
  const {
    authors,
    searchCourses,
    getSearchCourses,
    isInternetReachable,
  } = React.useContext(DataContext);
  const { user, getLastLearnTime } = React.useContext(AuthContext);
  useEffect(() => {
    navigation.setOptions({ title: route.params.course.title });
  }, []);
  const fetchData = async (id) => {
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
    try {
      let res = await ApiServices.getCourseDetails(id, user ? user.id : id);
      let response = await res.json();
      if (response.payload !== undefined && response.payload !== null) {
        await setCourseDetail(response.payload);
        PhoneStorage.save(
          "@course_detail_info_" + id,
          JSON.stringify(response.payload)
        );
        if (response.payload.promoVidUrl) {
          setVideoUrl(response.payload.promoVidUrl);
        }
      }
    } catch (err) {
      console.log(err);
      if (!isInternetReachable) {
        PhoneStorage.load("@course_detail_info_" + id, "json").then(
          (persistData) => {
            if (persistData) {
              setCourseDetail(persistData);
              if (persistData.promoVidUrl) {
                setVideoUrl(persistData.promoVidUrl);
              }
            }
          }
        );
      }
    }
  };
  useEffect(() => {
    setVideoUrl(route.params.course.promoVidUrl);
    setCourseDetail(route.params.course);
    fetchData(route.params.course.id);
  }, []);
  const ReloadData = () => {
    fetchData(route.params.course.id);
  }
  const onChangeVideo = (url, lession_id) => {
    setVideoUrl(url);
  };
  const onPressAuthor = (authorName) => {
    const author = authors.find((n) => n["user.name"] === authorName);
    if (author) {
      navigation.navigate("Author", { author: author });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <View style={styles.imageView}>
        {videoUrl && videoUrl != null && videoUrl != undefined ? (
          videoUrl.includes("youtube.com") ? (
            <WebView source={{ uri: videoUrl }} />
          ) : (
            <Video
              source={{
                uri: videoUrl,
              }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              isLooping={false}
              useNativeControls
              style={styles.image}
            />
          )
        ) : (
          <Image
            source={{
              uri: courseDetail.imageUrl
                ? courseDetail.imageUrl
                : courseDetail.courseImage,
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
