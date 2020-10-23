import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import SectionPath from "../Browse/SectionPaths/section-path";
import SectionCourses from "./SectionCourses/section-courses";

const Home = (props) => {
  const imageButtonData = [{
    id: 1,
    title: ["New", "Releases"],
  },
  {
    id: 2,
    title: ["Recommended", "For you"],
  },
]

  const [isSignedIn, setSignedIn] = useState(false);
  const onPressNewReleaseButton = () => {
    console.log("clicked New Release");
  };


  return (
    <ScrollView style={styles.container}>
      <SectionCourses title="Continue learning" />
      <SectionPath title="Paths" />
      <SectionCourses title="Channel" />
      <SectionCourses title="Bookmark" />
    </ScrollView>
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
