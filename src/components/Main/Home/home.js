import React, { useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import SectionPath from "../Browse/SectionPaths/section-path";
import SectionCourses from "./SectionCourses/section-courses";
import { coursesData } from "../../../data/dataMockup";
const Home = ({navigation}) => {
  const handleSeeAll = (title) => {
    navigation.navigate("List Courses", { title: title, courses: coursesData });
  }
  const handleViewCourse = (course) => {
    navigation.navigate('Course', {course: course});
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <ScrollView style={styles.container}>
        <SectionCourses
          title="Continue learning"
          onSeeAll={handleSeeAll}
          onPressCourse={handleViewCourse}
        />
        {/*<SectionPath title="Paths" />*/}
        <SectionCourses
          title="Channel"
          onSeeAll={handleSeeAll}
          onPressCourse={handleViewCourse}
        />
        <SectionCourses
          title="Bookmark"
          onSeeAll={handleSeeAll}
          onPressCourse={handleViewCourse}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  signedIn: {
    margin: 10,
  },
  notSignedIn: {
    margin: 0,
  },
});
export default Home;
