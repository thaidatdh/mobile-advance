import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ImageButton from "../../Common/image-button";
import SectionCategories from "./SectionCategories/section-categories";
import SignInSection from "./SignInSection/sign-in-section";
import SectionTags from "./SectionTags/section-tag"
import SectionAuthor from "./SectionAuthors/section-authors"
import SectionPath from "./SectionPaths/section-path"

const Browse = (props) => {
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
      <SignInSection
        style={isSignedIn ? styles.signedIn : styles.notSignedIn}
        isSignedIn={isSignedIn}
      />
      <ImageButton
        key={imageButtonData[0].id}
        title={imageButtonData[0].title}
        onPress={onPressNewReleaseButton()}
      />
      <ImageButton
        key={imageButtonData[1].id}
        title={imageButtonData[1].title}
        onPress={onPressNewReleaseButton()}
      />
      <SectionCategories/>
      <SectionTags title="Popular Skills"/>
      <SectionPath title="Paths"/>
      <SectionAuthor title="Top Authors"/>
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
export default Browse;
