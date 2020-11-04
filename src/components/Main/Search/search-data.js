import React from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SectionList,
  Text,
  Dimensions
} from "react-native";
import ListCourseItem from "../../Courses/ListCourses/ListCourseItem/list-course-item";
const {width, height} = Dimensions.get("window");
const SearchData = (props) => {
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
  const renderItems = (coursesList) => {
    return coursesList.map(item => <ListCourseItem key={item.id.toString()} item={item} />);
  }
  return (
    <View style={{flex:1, backgroundColor: "#0E0F13"}}>
      <View style={{marginLeft: 10, marginTop: 20, marginBottom: 20, marginRight: 20, color: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: 'white', fontSize: 15}}>{courses.length} courses</Text>
      </View>
      <ScrollView>
        {renderItems(courses)}
      </ScrollView>
    </View>
  );
};

export default SearchData;
