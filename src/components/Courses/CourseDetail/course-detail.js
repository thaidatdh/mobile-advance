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
import CourseInfo from "./CourseInfo/course-info";
import { DataContext } from "../../../Contexts/DataContextProvider";
const { width, height } = Dimensions.get("window");

const CourseDetail = ({ navigation, route }) => {
  const [courseDetail, setCourseDetail] = useState({});
  const { authors } = React.useContext(DataContext);
  useEffect(() => {
    navigation.setOptions({ title: courseDetail.title });
  }, []);
  useEffect(() => {
    ; //​
    const url =
      "http://api.dev.letstudy.org/course​/detail-with-lesson​/" +
      route.params.course.id;
    const requestOptionsUser = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
    };
    fetch(url, requestOptionsUser)
      .then((res) => res.json())
      .then((response) => setCourseDetail(response.payload))
      .catch((err) => console.log(err));
  }, []);
  const onPressAuthor = (authorName) => {
    const author = authors.find((n) => n.title === authorName);
    if (author) {
      navigation.navigate("Author", { author: author });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <View style={styles.imageView}>
        <Image
          source={{ uri: route.params.course.imageUrl }}
          style={styles.image}
        />
      </View>
      <ScrollView style={{ height: height * 0.7 }}>
        <CourseInfo
          course={courseDetail}
          onPressAuthor={onPressAuthor}
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
