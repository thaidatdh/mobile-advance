import React, { useState } from "react";
import { Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";
import DownloadData from "./download-data";
import DownloadEmpty from "./download-empty";
import MAppBar from "../app-bar";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");
const Download = ({ navigation }) => {
  const { downloaded, removeAllDownloaded, user, token } = React.useContext(
    AuthContext
  );
  const { theme, language } = React.useContext(SettingContext);
  const { topSell } = React.useContext(DataContext);
  const findCourse = () => {
    navigation.navigate("List Courses", {
      title: language.TopSell,
      courses: topSell,
      offset: 0,
      onLoadMore: 'top-sell',
    });
  };
  const onPressCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.c_0E0F13 }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.c_0E0F13} />
      <MAppBar navigation={navigation} title={language.Download} />
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
