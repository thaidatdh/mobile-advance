import React, { useState } from "react";
import { Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";
import DownloadData from "./download-data";
import DownloadEmpty from "./download-empty";
import MAppBar from "../app-bar";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
const { width, height } = Dimensions.get("window");
const Download = ({navigation}) => {
  const { channel, removeAllDownloaded } = React.useContext(AuthContext);
  const { topSell } = React.useContext(DataContext);
  const findCourse = () => {
    navigation.navigate("List Courses", {
      title: "Courses",
      courses: topSell,
    });
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <MAppBar navigation={navigation} title="My Courses" />
      {channel && channel.length > 0 ? (
        <DownloadData courses={channel} onCheckEmpty={removeAllDownloaded} />
      ) : (
        <DownloadEmpty onCheckNotEmpty={findCourse} />
      )}
    </SafeAreaView>
  );
};

export default Download;
