import React, { useState } from "react";
import { useEffect } from "react";
import { View, Dimensions, StyleSheet, Text, ScrollView } from "react-native";
import RatingSubsection from "./rating-subsection";
import { SettingContext } from "../../../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");

const SectionRating = (props) => {
  const { theme } = React.useContext(SettingContext);
  const renderSubSections = (sections) => {
    if (sections === undefined)
      return (
        <View key="NULLVALUE" style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", color: theme.c_white }}>
           No Rating
          </Text>
        </View>
      );
    return sections.map((item) => (
      <RatingSubsection
        key={"RATING" + item.id}
        item={item}
      />
    ));
  };
  return (
    <View style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}>
      <ScrollView style={styles.scrollViewContainer} nestedScrollEnabled={true}>
        {renderSubSections(props.content.ratingList)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    height: height,
  },
  scrollViewContainer: {
    paddingTop: 20,
    height: height,
  },
});

export default SectionRating;
