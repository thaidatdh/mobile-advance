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
import CourseInfo from "./CourseInfo/course-info";
import { DataContext } from "../../../Contexts/DataContextProvider";
const { width, height } = Dimensions.get("window");

const CourseDetail = ({ navigation, route }) => {
  const [courseDetail, setCourseDetail] = useState(route.params.course);
  const [videoUrl, setVideoUrl] = useState(
    route.params.course.promoVidUrl
  );
  const { authors,searchCourses, getSearchCourses} = React.useContext(DataContext);
  useEffect(() => {
    navigation.setOptions({ title: route.params.course.title });
  }, []);
  useEffect(() => {
    setVideoUrl(route.params.course.promoVidUrl);
    setCourseDetail(route.params.course);
    const fetchData = async (title) => {
      await getSearchCourses(title);
      if (searchCourses.length > 0) {
        setCourseDetail(searchCourses[0]);
      }
    };
    fetchData(route.params.course.title);
  }, []);
  const onChangeVideo = (url) => {
    setVideoUrl(url);
  }
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
        {videoUrl && videoUrl != null ? (
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
          course={courseDetail}
          onPressAuthor={onPressAuthor}
          onChangeVideo={onChangeVideo}
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
