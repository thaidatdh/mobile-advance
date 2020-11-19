import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SafeAreaView,
  Text,
  Dimensions,
  StatusBar,
} from "react-native";
import ListCourseItem from "./ListCourseItem/list-course-item";
const { width, height } = Dimensions.get("window");
const ListCourses = ({navigation, route}) => {
  const courses_mock = [
    {
      id: 1,
      title: "title 1",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38h",
      rating: 4.5,
      ratingCount: 10,
    },
    {
      id: 2,
      title: "title 2",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10h",
      rating: 4.2,
      ratingCount: 10,
    },
    {
      id: 3,
      title: "title 3",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38h",
      rating: 4.8,
      ratingCount: 10,
    },
    {
      id: 4,
      title: "title 4",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10h",
      rating: 4.2,
      ratingCount: 11,
    },
    {
      id: 5,
      title: "title 1",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38h",
      rating: 5,
      ratingCount: 15,
    },
    {
      id: 6,
      title: "title 2",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10h",
      rating: 3.5,
      ratingCount: 20,
    },
    {
      id: 7,
      title: "title 3",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38h",
      rating: 4,
      ratingCount: 12,
    },
    {
      id: 8,
      title: "title 4",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10h",
      rating: 2.5,
      ratingCount: 10,
    },
    {
      id: 9,
      title: "title 3",
      author: "author 1",
      level: "beginner",
      released: "June 6, 2020",
      duration: "38h",
      rating: 4,
      ratingCount: 12,
    },
    {
      id: 10,
      title: "title 4",
      author: "author 1",
      level: "advance",
      released: "June 6, 2020",
      duration: "10h",
      rating: 2.5,
      ratingCount: 10,
    },
  ];
  const [courses] = useState(route.params.courses);
  const onPressCourse = (course) => {
    navigation.navigate("Course", { course: course });
  }
  const renderItems = (coursesList) => {
    return coursesList.map((item) => (
      <ListCourseItem
        key={item.id.toString()}
        item={item}
        onPress={onPressCourse}
      />
    ));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <View
        style={{
          marginLeft: 10,
          marginTop: 20,
          marginBottom: 20,
          color: "white",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>
          {route.params.title}
        </Text>
      </View>
      <ScrollView>{renderItems(courses)}</ScrollView>
    </SafeAreaView>
  );
};

export default ListCourses;
