import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import ImageButton from "../../Common/image-button";
import SectionCategories from "./SectionCategories/section-categories";
import SignInSection from "./SignInSection/sign-in-section";
import SectionTags from "./SectionTags/section-tag";
import SectionAuthor from "./SectionAuthors/section-authors";
import SectionPath from "./SectionPaths/section-path";
import MAppBar from "../app-bar";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
const Browse = ({ navigation }) => {
  const imageButtonData = [
    {
      id: 1,
      title: ["New", "Releases"],
    },
    {
      id: 2,
      title: ["Recommended", "For you"],
    },
  ];
  const { user } = React.useContext(AuthContext);
  const { courses, authors } = React.useContext(DataContext);
  const onPressNewReleaseButton = () => {
    navigation.navigate("List Courses", {
      title: "New Released",
      courses: courses,
    });
  };
  const onPressRecommendedButton = () => {
    navigation.navigate("List Courses", {
      title: "Recommended for you",
      courses: courses,
    });
  };
  const onPressCategory = (category) => {
    navigation.navigate("List Courses", {
      title: category,
      courses: courses,
    });
  }
  const onPressSkills = (skills) => {
    const data = courses.filter((n) => n.title.includes(skills));
    navigation.navigate("List Courses", {
      title: skills,
      courses: data,
    });
  };
  const onPressSignIn = () => {
    navigation.navigate("Sign In");
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <MAppBar navigation={navigation} title="Browse" />
      <ScrollView style={styles.container}>
        <SignInSection
          style={user ? styles.signedIn : styles.notSignedIn}
          isSignedIn={user ? true : false}
          onPress={onPressSignIn}
        />
        <ImageButton
          key={imageButtonData[0].id}
          title={imageButtonData[0].title}
          onPress={onPressNewReleaseButton}
        />
        <ImageButton
          key={imageButtonData[1].id}
          title={imageButtonData[1].title}
          onPress={onPressRecommendedButton}
        />
        <SectionCategories onPress={onPressCategory} />
        <SectionTags title="Popular Skills" onPress={onPressSkills} />
        {/*<SectionPath title="Paths" />*/}
        <SectionAuthor
          title="Top Authors"
          authors={authors}
          navigation={navigation}
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
export default Browse;
