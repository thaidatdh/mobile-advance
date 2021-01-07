import React, { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import SectionPath from "../Browse/SectionPaths/section-path";
import SectionCourses from "./SectionCourses/section-courses";
import { coursesData } from "../../../data/dataMockup";
import MAppBar from "../app-bar";
import SignInSection from "../Browse/SignInSection/sign-in-section";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../Contexts/DataContextProvider";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
const Home = ({ navigation }) => {
  const { user, channel, bookmark } = React.useContext(AuthContext);
  const { getAuthors } = React.useContext(DataContext);
  const { theme, language } = React.useContext(SettingContext);
  const handleSeeAll = (title, coursesList) => {
    navigation.navigate("List Courses", {
      title: title,
      courses: coursesList,
      offset: 0,
      onLoadMore: 'history',
    });
  };
  const handleViewCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  const onPressSignIn = () => {
    navigation.navigate("Sign In");
  };
  useEffect(() => {
    getAuthors();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.c_0E0F13} />
      <MAppBar navigation={navigation} title={language.Home} />

      {user ? (
        <ScrollView
          style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
        >
          {/*<SectionCourses
            title="Continue learning"
            onSeeAll={handleSeeAll}
            onPressCourse={handleViewCourse}
          />*/}
          <SectionCourses
            title={language.Progress}
            onSeeAll={handleSeeAll}
            onPressCourse={handleViewCourse}
            coursesList={channel}
          />
          <SectionCourses
            title={language.Bookmark}
            onSeeAll={handleSeeAll}
            onPressCourse={handleViewCourse}
            coursesList={bookmark}
          />
        </ScrollView>
      ) : (
        <View style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}>
          <SignInSection
            style={user ? styles.signedIn : styles.notSignedIn}
            isSignedIn={user ? true : false}
            onPress={onPressSignIn}
          />
        </View>
      )}
    </SafeAreaView>
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
    alignSelf: "center",
  },
});
export default Home;
