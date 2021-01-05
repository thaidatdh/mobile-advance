import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
import TextSettingButton from "./SettingComponent/text-setting-button";
import { Button } from "react-native-paper";
import CheckSettingButton from "./SettingComponent/check-setting-button";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { NavigationActions } from "react-navigation";
const { width, height } = Dimensions.get("window");
const Setting = ({ navigation }) => {
  const { theme, switchTheme, isDark, isEnglish, switchLanguage } = React.useContext(SettingContext);
  const { user, settings, updateSetting, logout } = React.useContext(
    AuthContext
  );
  const accountSetting = [
    {
      type: "text",
      title: "Account",
      onPress: () => {
        navigation.navigate("Profile");
      },
    },
    {
      type: "text",
      title: "Subscription",
      desc: "Free",
      onPress: () => {},
    },
  ];
  const themeItem = {
    type: "switch",
    title: isDark ? "Dark Mode" : "Light Mode",
    desc: "Enable is Dark Mode. Disable is Light Mode",
    isCheck: isDark,
    onPress: () => {
      switchTheme();
    },
  };
  const languageItem = {
    type: "switch",
    title: isEnglish ? "Language" : "Ngôn ngữ",
    desc: isEnglish ? "English" : "Vietnamese",
    icon: 'language',
    isCheck: isEnglish,
    onPress: () => {
      switchLanguage();
    },
  };
  const appVersion = {
    type: "text",
    title: "App version",
    desc: "1.0.0",
  };
  const onSignOut = () => {
    navigation.navigate("Main");
    logout();
  };
  const renderAccountSection = () => {
    return accountSetting.map((item) => (
      <TextSettingButton key={item.title} item={item} onPress={item.onPress} />
    ));
  };
  /*const renderSettingSection = () => {
    return settings.map((item) =>
      item.type === "text" ? (
        <TextSettingButton key={item.title} item={item} />
      ) : (
        <CheckSettingButton
          key={item.title}
          item={item}
          onChange={updateSetting}
        />
      )
    );
  };*/
  const renderAppVersion = () => {
    return <TextSettingButton item={appVersion} />;
  };
  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.c_0E0F13} />
      <ScrollView
        style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.userContainer}>
          <Image source={{ uri: user.avatar }} style={styles.image} />
          <View style={styles.nameView}>
            <Text style={{ ...styles.name, color: theme.c_white }}>
              {user.name}
            </Text>
            <Text style={{ ...styles.username, color: theme.c_gray }}>
              {user.type}
            </Text>
            <Text style={{ ...styles.username, color: theme.c_gray }}>
              {user.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.sectionContainer,
            borderBottomColor: theme.c_gray,
          }}
        >
          {renderAccountSection()}
        </View>
        <View
          style={{
            ...styles.sectionContainer,
            borderBottomColor: theme.c_gray,
          }}
        >
          <CheckSettingButton
            key={"theme"}
            item={themeItem}
            onChange={themeItem.onPress}
          />
          <CheckSettingButton
            key={"lang"}
            item={languageItem}
            onChange={languageItem.onPress}
          />
        </View>
        <View
          style={{
            ...styles.sectionContainer,
            borderBottomColor: theme.c_gray,
          }}
        >
          {renderAppVersion()}
        </View>
        <Button
          style={{ ...styles.signOut, backgroundColor: theme.c_0E0F13 }}
          onPress={onSignOut}
        >
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
