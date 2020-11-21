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
const { width, height } = Dimensions.get("window");

const CourseDetail = ({navigation, route}) => {
  const [courseDetail] = useState(route.params.course);
  useEffect(() => {
    navigation.setOptions({ title: courseDetail.title });
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <View style={styles.imageView}>
        <Image
          source={require("../../../../assets/bg.png")}
          style={styles.image}
        />
      </View>
      <ScrollView style={{ height: height * 0.7 }}>
        <CourseInfo course={courseDetail} />
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
