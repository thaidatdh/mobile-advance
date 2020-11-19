import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import ImageButton from "../../Common/image-button";
import SectionCategories from "./SectionCategories/section-categories";
import SignInSection from "./SignInSection/sign-in-section";
import SectionTags from "./SectionTags/section-tag";
import SectionAuthor from "./SectionAuthors/section-authors";
import SectionPath from "./SectionPaths/section-path";
import { authorsData, coursesData } from "../../../data/dataMockup";

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

  const [isSignedIn, setSignedIn] = useState(false);
  const onPressNewReleaseButton = () => {
    navigation.navigate("List Courses", {
      title: "New Released",
      courses: coursesData,
    });
  };
  const onPressRecommendedButton = () => {
    navigation.navigate("List Courses", {
      title: "Recommended for you",
      courses: coursesData,
    });
  };
  const onPressCategory = (category) => {
    navigation.navigate("List Courses", {
      title: category,
      courses: coursesData,
    });
  }
  const onPressSkills = (skills) => {
    const data = coursesData.filter(n => n.title.includes(skills));
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
      <ScrollView style={styles.container}>
        <SignInSection
          style={isSignedIn ? styles.signedIn : styles.notSignedIn}
          isSignedIn={isSignedIn}
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
        <SectionAuthor title="Top Authors" authors={authorsData} />
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
