import React, { useState } from "react";
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
  const renderCourses = (coursesList) => {
    return coursesList.slice().map((item, index) =>
      index <= 5 ? (
        <ListCourseItem key={"C_" + item.id.toString()} item={item} onPress={props.onPressCourse}/>
      ) : null
    );
  };
  const renderPaths = (pathsList) => {
    return pathsList
      .slice()
      .map((item, index) =>
        index <= 5 ? (
          <ListPathItem key={"P_" + item.id.toString()} item={item} />
        ) : null
      );
  };
  const renderAuthors = (authorsList) => {
    return authorsList
      .slice()
      .map((item, index) =>
        index <= 5 ? (
          <ListAuthorItem
            key={"A_" + item.id.toString()}
            item={item}
            onPress={props.onPressAuthor}
          />
        ) : null
      );
  };
  const onSeeAllCourses = () => {
    props.onPressSeeAllCourse(props.coursesData);
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <ScrollView>
        <SearchHeader
          key="courseList"
          dataLength={props.coursesData.length}
          data="Courses"
          onPress={onSeeAllCourses}
        />
        {renderCourses(props.coursesData)}
        {/*<SearchHeader key="pathList" dataLength={paths.length} data="Paths" />
        {renderPaths(paths)}*/}
        <SearchHeader
          key="authorList"
          dataLength={props.authorsData.length}
          data="Authors"
        />
        {renderAuthors(props.authorsData)}
      </ScrollView>
    </View>
  );
};

export default SearchData;
