import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SectionCourseItem from "./SectionCourseItem/section-course-item";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const SectionCourses = (props) => {
  const courses = [
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
  ];

  const renderListItems = (courses) => {
    return courses.map((item) => (
      <SectionCourseItem key={item.id} item={item} />
    ));
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.titleText}>{props.title}</Text>
        <TouchableOpacity style={styles.seeAllButtonView}>
          <Text style={{ color: "lightgray", fontSize: 10 }}>See all <FontAwesome5 name={"angle-right"} color="lightgray" size={10}/></Text>
         
        </TouchableOpacity>
      </View>
      <ScrollView style={{ paddingLeft: 10 }} horizontal={true}>
        {renderListItems(courses)}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  titleText: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
    fontSize: 16,
    color: "white",
  },
  seeAllButtonView: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    borderRadius: 8,
    height: 20,
    alignSelf: "flex-end",
    marginRight: 5,
  },
});
export default SectionCourses;
