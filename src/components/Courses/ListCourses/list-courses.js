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
} from "react-native";
import ListCourseItem from "./ListCourseItem/list-course-item";
const { width, height } = Dimensions.get("window");
const ListCourses = ({ navigation, route }) => {
  const [courses, setCourses] = useState(route.params.courses);
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);
  const onPressCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  const renderItems = (coursesList) => {
    return coursesList.map((item) => (
      <ListCourseItem
        key={item.id.toString()}
        item={item}
        onPress={onPressCourse}
        navigation={navigation}
      />
    ));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
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
      <ScrollView>{renderItems(courses)}</ScrollView>
    </SafeAreaView>
  );
};

export default ListCourses;
