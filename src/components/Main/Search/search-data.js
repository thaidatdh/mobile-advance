import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import ListCourseItem from "../../Courses/ListCourses/ListCourseItem/list-course-item";
import ListAuthorItem from "./components/list-author-item";
import ListPathItem from "./components/list-path-item";
import SearchHeader from "./components/search-header";
const { width, height } = Dimensions.get("window");
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
  const paths = [
    {
      id: 1,
      title: "Angular",
    },
    {
      id: 2,
      title: "JavaScript",
    },
    {
      id: 3,
      title: "C#",
    },
    {
      id: 4,
      title: "Java",
    },
    {
      id: 5,
      title: "Data Analysis",
    },
    {
      id: 6,
      title: "ASP.NET",
    },
    {
      id: 7,
      title: "Node.js",
    },
  ];
  const authors = [
    { id: 1, name: "Bob", courses: 5 },
    { id: 2, name: "Venessa", courses: 3 },
    { id: 3, name: "Tom", courses: 1 },
  ];
  const renderCourses = (coursesList) => {
    return coursesList.map((item, index) =>
      index <= 5 ? (
        <ListCourseItem key={"C_" + item.id.toString()} item={item} />
      ) : null
    );
  };
  const renderPaths = (pathsList) => {
    return pathsList.map((item, index) =>
      index <= 5 ? (
        <ListPathItem key={"P_" + item.id.toString()} item={item} />
      ) : null
    );
  };
  const renderAuthors = (authorsList) => {
    return authorsList.map((item, index) =>
      index <= 5 ? (
        <ListAuthorItem key={"A_" + item.id.toString()} item={item} />
      ) : null
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <ScrollView>
        <SearchHeader
          key="courseList"
          dataLength={courses.length}
          data="Courses"
        />
        {renderCourses(courses)}
        <SearchHeader key="pathList" dataLength={paths.length} data="Paths" />
        {renderPaths(paths)}
        <SearchHeader
          key="authorList"
          dataLength={authors.length}
          data="Authors"
        />
        {renderAuthors(authors)}
      </ScrollView>
    </View>
  );
};

export default SearchData;
