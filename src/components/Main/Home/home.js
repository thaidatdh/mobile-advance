import React, { useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import SectionPath from "../Browse/SectionPaths/section-path";
import SectionCourses from "./SectionCourses/section-courses";

const Home = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <SectionCourses title="Continue learning" />
        <SectionPath title="Paths" />
        <SectionCourses title="Channel" />
        <SectionCourses title="Bookmark" />
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
