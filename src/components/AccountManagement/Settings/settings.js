import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import TextSettingButton from "./SettingComponent/text-setting-button";
import { Button } from "react-native-paper";
import CheckSettingButton from "./SettingComponent/check-setting-button";
const { width, height } = Dimensions.get("window");
const Setting = (props) => {
  const accountSetting = [
    {
      type: "text",
      title: "Account",
    },
    {
      type: "text",
      title: "Subscription",
      desc: "Free",
    },
    {
      type: "text",
      title: "Communication Preference",
    },
  ];
  const mainSetting = [
    {
      type: "text",
      title: "Default Caption Language",
      desc: "Free",
    },
    {
      type: "check",
      title: "Require Wifi for streaming",
      isCheck: true,
    },
    {
      type: "check",
      title: "Require Wifi for downloading",
      isCheck: true,
    },
    {
      type: "check",
      title: "Show quiz at the end of video",
      isCheck: true,
    },
    {
      type: "text",
      title: "Download location",
      desc: "Default Download location",
    },
    {
      type: "check",
      title: "Recommended content push notifications",
      desc: "Receive notification about recommended content.",
      isCheck: false,
    },
    {
      type: "check",
      title: "Reminder to learn notifications",
      desc:
        "Schedule the app to learn to skill up faster and conquer your goals.",
      isCheck: false,
    },
    {
      type: "text",
      title: "Caption",
    },
    {
      type: "text",
      title: "Notification",
    },
    {
      type: "text",
      title: "Advanced Options",
    },
  ];
  const appVersion = {
    type: "text",
    title: "App version",
    desc: "1.0.0",
  };
  const data = {
    name: "Dat Ho",
    username: "datho324",
  };
  const renderAccountSection = () => {
    return accountSetting.map((item) =>
      item.type === "text" ? (
        <TextSettingButton key={item.title} item={item} />
      ) : (
        <CheckSettingButton key={item.title} item={item} />
      )
    );
  };
  const renderSettingSection = () => {
    return mainSetting.map((item) =>
      item.type === "text" ? (
        <TextSettingButton key={item.title} item={item} />
      ) : (
        <CheckSettingButton key={item.title} item={item} />
      )
    );
  };
  const renderAppVersion = () => {
    return <TextSettingButton item={appVersion} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.userContainer}>
          <Image
            source={require("../../../../assets/bg.png")}
            style={styles.image}
          />
          <View style={styles.nameView}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.username}>{data.username}</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>{renderAccountSection()}</View>
        <View style={styles.sectionContainer}>{renderSettingSection()}</View>
        <View style={styles.sectionContainer}>{renderAppVersion()}</View>
        <Button style={styles.signOut}>
          <Text style={styles.buttonTextBlue}>Sign Out</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width * 0.9,
  },
  nameView: {
    flexDirection: "column",
    justifyContent: "center",
    height: width * 0.15,
    alignSelf: "center",
  },
  name: { color: "white", fontSize: width * 0.05 },
  username: { color: "gray", fontSize: width * 0.03 },
  image: {
    height: width * 0.15,
    width: width * 0.15,
    maxHeight: 100,
    maxWidth: 100,
    borderRadius: width * 0.15 > 100 ? 50 : width * 0.15 * 0.5,
    margin: 20,
    alignSelf: "center",
  },
  sectionContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: width * 0.9,
  },
  signOut: {
    margin: 20,
    width: width * 0.9,
    backgroundColor: "#0E0F13",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2384ae",
    borderWidth: 2,
  },
  buttonTextBlue: {
    color: "white",
    fontSize: 11,
    textTransform: "uppercase",
    color: "#2384ae",
    fontWeight: "bold",
  },
});
export default Setting;
