import React, { useState } from "react";
import { SafeAreaView, Dimensions, StatusBar } from "react-native";
import DownloadData from "./download-data";
import DownloadEmpty from "./download-empty";
import MAppBar from "../app-bar";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
const { width, height } = Dimensions.get("window");
const Download = ({navigation}) => {
  const { downloaded, removeAllDownloaded } = React.useContext(AuthContext);
  const { courses } = React.useContext(DataContext);
  const findCourse = () => {
    navigation.navigate("List Courses", {
      title: "Courses",
      courses: courses,
    });
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <MAppBar navigation={navigation} title="Download" />
      {downloaded && downloaded.length > 0 ? (
        <DownloadData courses={downloaded} onCheckEmpty={removeAllDownloaded} />
      ) : (
        <DownloadEmpty onCheckNotEmpty={findCourse} />
      )}
    </SafeAreaView>
  );
};

export default Download;
