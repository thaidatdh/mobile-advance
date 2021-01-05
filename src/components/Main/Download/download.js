import React, { useState } from "react";
import { Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";
import DownloadData from "./download-data";
import DownloadEmpty from "./download-empty";
import MAppBar from "../app-bar";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
import { useEffect } from "react/cjs/react.development";
const { width, height } = Dimensions.get("window");
const Download = ({ navigation }) => {
  const { downloaded, removeAllDownloaded, user, token } = React.useContext(
    AuthContext
  );
  const { topSell } = React.useContext(DataContext);
  const findCourse = () => {
    navigation.navigate("List Courses", {
      title: "Top Sell",
      courses: topSell,
      offset: 0,
      onLoadMore: 'top-sell',
    });
  };
  const onPressCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <MAppBar navigation={navigation} title="Download" />
      {downloaded && downloaded.length > 0 ? (
        <DownloadData
          courses={downloaded}
          onCheckEmpty={removeAllDownloaded}
          onPressCourse={onPressCourse}
        />
      ) : (
        <DownloadEmpty onCheckNotEmpty={findCourse} />
      )}
    </SafeAreaView>
  );
};

export default Download;
