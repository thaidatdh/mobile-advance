import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Login from "./src/components/Authentication/Login/login";
import ListCourses from "./src/components/Courses/ListCourses/list-courses";
import Home from "./src/components/Main/Home/home";
import Browse from "./src/components/Main/Browse/browse";
import Register from "./src/components/Authentication/Register/register"
import Profile from "./src/components/AccountManagement/Profile/profile";
import Setting from "./src/components/AccountManagement/Settings/settings";
import CourseDetail from "./src/components/Courses/CourseDetail/course-detail"


const Stack = createStackNavigator();
export default function App() {
  const renderListCourse = () => {return <ListCourses title="Software Development"/>};
  const renderCourseDetaul = () => {return <CourseDetail/>};
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Course" component={renderCourseDetaul}/>
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="List" component={renderListCourse}  />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sign Up" component={Register} />
        <Stack.Screen name="Sign In" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
