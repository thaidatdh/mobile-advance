import React, { useState, useEffect } from "react";
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
import { SettingContext } from "../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");
const SearchData = (props) => {
  const { theme, language } = React.useContext(SettingContext);
  const renderCourses = (coursesList) => {
    if (coursesList == undefined || coursesList.length == 0) {
      return (
        <Text style={{ color: "red", textAlign: "center" }}>
          {language.noCoursefound}
        </Text>
      );
    }
    return coursesList
      .slice()
      .map((item, index) =>
        index < 5 ? (
          <ListCourseItem
            key={"C_" + item.id.toString()}
            item={item}
            onPress={props.onPressCourse}
          />
        ) : null
      );
  };
  /*const renderPaths = (pathsList) => {
    return pathsList
      .slice()
      .map((item, index) =>
        index < 5 ? (
          <ListPathItem key={"P_" + item.id.toString()} item={item} />
        ) : null
      );
  };*/
  const renderAuthors = (authorsList) => {
    if (authorsList == undefined || authorsList.length == 0) {
      return (
        <Text style={{ color: "red", textAlign: "center" }}>
          {language.noAuthorfound}
        </Text>
      );
    }
    return authorsList
      .slice()
      .map((item, index) =>
        index < 5 ? (
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
  };
  const onSeeAllAuthors = () => {
    props.onPressSeeAllAuthor(props.authorsData);
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.c_0E0F13 }}>
      <ScrollView>
        <SearchHeader
          key="courseList"
          dataLength={props.coursesInfo.total}
          data={language.Courses}
          onPress={onSeeAllCourses}
        />
        {renderCourses(props.coursesData)}
        {/*<SearchHeader key="pathList" dataLength={paths.length} data="Paths" />
        {renderPaths(paths)}*/}
        <SearchHeader
          key="authorList"
          dataLength={props.authorsInfo.total}
          data={language.Instructors}
          onPress={onSeeAllAuthors}
        />
        {renderAuthors(props.authorsData)}
      </ScrollView>
    </View>
  );
};

export default SearchData;
