import React, { useState } from "react";
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
const Home = ({ navigation }) => {
  const { user, channel, bookmark } = React.useContext(AuthContext);
  const handleSeeAll = (title, coursesList) => {
    navigation.navigate("List Courses", { title: title, courses: coursesList });
  };
  const handleViewCourse = (course) => {
    navigation.navigate("Course", { course: course });
  };
  const onPressSignIn = () => {
    navigation.navigate("Sign In");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <MAppBar navigation={navigation} title="Home" />

      {user ? (
        <ScrollView style={styles.container}>
          {/*<SectionCourses
            title="Continue learning"
            onSeeAll={handleSeeAll}
            onPressCourse={handleViewCourse}
          />*/}
          <SectionCourses
            title="Channel"
            onSeeAll={handleSeeAll}
            onPressCourse={handleViewCourse}
            coursesList={channel}
          />
          <SectionCourses
            title="Bookmark"
            onSeeAll={handleSeeAll}
            onPressCourse={handleViewCourse}
            coursesList={bookmark}
          />
        </ScrollView>
      ) : (
        <View style={styles.container}>
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
    alignSelf: 'center',
  },
});
export default Home;
