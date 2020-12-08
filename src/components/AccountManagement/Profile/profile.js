import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar
} from "react-native";
import ProfileContentSecion from "./profile-content-section";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
const { width, height } = Dimensions.get("window");

const Profile = ({navigation}) => {
  const sections = [
    {
      title: "total active days",
      value: "0",
      subValue: "0 day streak",
    },
    {
      title: "most active time of day",
      value: "7:00 AM",
      subValue: "",
    },
    {
      title: "most viewed subject",
      value: "N/A",
      subValue: "",
    },
  ];
  const { user } = React.useContext(AuthContext);

  const createSections = () => {
    return sections.map((item) => (
      <ProfileContentSecion
        key={item.title}
        title={item.title}
        value={item.value}
        subValue={item.subValue}
      />
    ));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <View style={styles.headerContainer}>
        <Image source={{ uri: user.avatar }} style={styles.image} />
        <View style={styles.nameView}>
          <Text style={styles.name}>{user.email}</Text>
        </View>
      </View>
      <View style={{ margin: 20 }}>
        <Text style={styles.recentActivity}>
          Activity insights (last 30 days)
        </Text>
        {createSections()}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width * 0.8,
  },
  nameView: {
    flexDirection: "column",
    justifyContent: "center",
    height: width * 0.15,
    alignSelf: "center",
  },
  name: { color: "white", fontSize: width * 0.05 },
  image: {
    height: width * 0.15,
    width: width * 0.15,
    maxHeight: 200,
    maxWidth: 200,
    borderRadius: width * 0.15 > 200 ? 100 : width * 0.15 * 0.5,
    margin: 20,
    alignSelf: "center",
  },
  recentActivity: {
    fontSize: 15,
    color: "white",
    marginBottom: 20,
    marginTop: 20,
  },
});
export default Profile;
