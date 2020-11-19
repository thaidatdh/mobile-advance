import React, { useState } from "react";
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
  const courseDetail_mock = {
    title: "Angular Fundamentals",
    authors: [
      {
        icon: "../../../../../assets/bg.png",
        name: "James Eames",
      },
      {
        icon: "../../../../../assets/bg.png",
        name: "Jim Cooper",
      },
    ],
    level: "Intermediate",
    released: "2019-02-01",
    duration: "9.6 h",
    rating: 4.5,
    ratingCount: 896,
    descriptions:
      "Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345",
    transcript:
      "Transcript\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345Descriptions\n12345\n12345\n1ddddd dddddddddff ffffff ffffffffffff fffffffffddddd dddddd2345\n12345\n12345\n12345",
    sections: [
      {
        id: 1,
        title: "section 1",
        content: [
          {
            id: 1,
            name: "video 1",
          },
          {
            id: 2,
            name: "video 2",
          },
          {
            id: 3,
            name: "video 3",
          },
        ],
      },
    ],
  };
  const [courseDetail] = useState(route.params.course);
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
