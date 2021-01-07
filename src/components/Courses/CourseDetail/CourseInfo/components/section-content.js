import React, { useState } from "react";
import { useEffect } from "react";
import { View, Dimensions, StyleSheet, Text, ScrollView } from "react-native";
import ContentSubsection from "./content-subsection";
import { SettingContext } from "../../../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");

const SectionContent = (props) => {
  const data_mock = [
    {
      id: 1,
      title: "Title 1",
      content: [
        {
          title: "subtitle 1",
          time: "1:12",
        },
        {
          title: "subtitle 2",
          time: "2:12",
        },
        {
          title: "subtitle 3",
          time: "3:12",
        },
      ],
    },
    {
      id: 2,
      title: "Title 2",
      content: [
        {
          title: "subtitle 1",
          time: "1:12",
        },
        {
          title: "subtitle 2",
          time: "2:12",
        },
        {
          title: "subtitle 3",
          time: "3:12",
        },
      ],
    },
    {
      id: 3,
      title: "Title 3",
      content: [
        {
          title: "subtitle 1",
          time: "1:12",
        },
        {
          title: "subtitle 2",
          time: "2:12",
        },
        {
          title: "subtitle 3",
          time: "3:12",
        },
      ],
    },
    {
      id: 4,
      title: "Title 4",
      content: [
        {
          title: "subtitle 1",
          time: "1:12",
        },
        {
          title: "subtitle 2",
          time: "2:12",
        },
        {
          title: "subtitle 3",
          time: "3:12",
        },
      ],
    },
  ];
  const { theme, language } = React.useContext(SettingContext);
  const renderSubSections = (sections) => {
    if (sections === undefined) return (
      <View key="NULLVALUE" style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", color: "white" }}>
          {language.Buycoursetosee}
        </Text>
      </View>
    );
    return sections.map((item) => (
      <ContentSubsection
        key={"SECTION" + item.id}
        item={item}
        onChangeVideo={props.onChangeVideo}
        onChangeTranscript={props.onChangeTranscript}
        currentLesson={props.currentLesson}
      />
    ));
  };
  return (
    <View style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}>
      <ScrollView style={styles.scrollViewContainer} nestedScrollEnabled={true}>
        {renderSubSections(props.content)}
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

export default SectionContent;
