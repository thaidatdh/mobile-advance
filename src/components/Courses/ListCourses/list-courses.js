import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SafeAreaView,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ApiServices from "../../../services/api-services";
import ListCourseItem from "./ListCourseItem/list-course-item";
import {AuthContext} from "../../../Contexts/AuthContextProvider"
import { SettingContext } from "../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");
const ListCourses = ({ navigation, route }) => {
  const [courses, setCourses] = useState(route.params.courses);
  const [offset, setOffset] = useState(route.params.offset);
  const [isMore, setIsMore] = useState(route.params.courses.length >= 10);
  const { user, token } = React.useContext(AuthContext);
  const { theme, language } = React.useContext(SettingContext);
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);
  const onPressCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  const renderItems = (coursesList) => {
    if (coursesList === undefined || Promise.resolve(coursesList) == coursesList) {
      return null;
    }
    return coursesList.map((item) => (
      <ListCourseItem
        key={item.id.toString()}
        item={item}
        onPress={onPressCourse}
        navigation={navigation}
      />
    ));
  };
  
  const onLoadMore = (offset, currentLength) => {
    switch (route.params.onLoadMore) {
      case "top-rated":
        return ApiServices.OnMoreButton.onLoadMoreTopRate(offset);
      case "top-sell":
        return ApiServices.OnMoreButton.onLoadMoreTopSell(offset);
      case "top-new":
        return ApiServices.OnMoreButton.onLoadMoreNewRelease(offset);
      case "recommended":
        {
          if (user && token) {
            return ApiServices.OnMoreButton.onLoadMoreRecommended(
              currentLength,
              token,
              user
            );
          }
          else {
            return null;
          }
        }
      case "history":
        return null;
      case "category": 
        return ApiServices.OnMoreButton.onMoreCategory(currentLength, offset);
      default:
        return ApiServices.OnMoreButton.onMoreSearchCourse(
          currentLength,
          route.params.onLoadMore
        );
      // code block
    }
  }
  const onMore = () => {
    onLoadMore(offset, courses.length).then(newCourses => {
      if (newCourses && newCourses.data) {
        const newList = courses.slice().concat(newCourses.data);
        setIsMore(newList.length % 10 == 0 && newList.length != courses.length);
        setCourses(newList);
        setOffset(newCourses.offset);
      }
      else {
        setIsMore(false);
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.c_0E0F13 }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.c_0E0F13} />
      {/*<View
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
      </View>*/}
      <ScrollView>
        {renderItems(courses)}
        {isMore ? (
          <TouchableOpacity onPress={onMore} style={{...styles.btn, backgroundColor: theme.c_0E0F13, borderColor: theme.c_2384ae}}>
            <Text style={styles.textMore}>{language.More}</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  btn: {
    width: width * 0.8,
    backgroundColor: "#0E0F13",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2384ae",
    borderWidth: 2,
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 20,
    height: 30,
  },
  textMore: {
    color: "#2384ae",
  },
});
export default ListCourses;
