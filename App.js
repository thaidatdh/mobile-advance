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



const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Setting} />
        <Stack.Screen name="Sign Up" component={Register} />
        <Stack.Screen name="Sign In" component={Login} />
        <Stack.Screen name="List" component={ListCourses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
