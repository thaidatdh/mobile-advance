import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Login from "./src/components/Authentication/Login/login";
import ListCourses from "./src/components/Courses/ListCourses/list-courses";
import Home from "./src/components/Main/Home/home";
import Browse from "./src/components/Main/Browse/browse";
import Register from "./src/components/Authentication/Register/register";
import Profile from "./src/components/AccountManagement/Profile/profile";
import Setting from "./src/components/AccountManagement/Settings/settings";
import CourseDetail from "./src/components/Courses/CourseDetail/course-detail";
import CoursePath from "./src/components/Courses/CoursePath/course-path";
import Download from "./src/components/Main/Download/download";
import Search from "./src/components/Main/Search/search";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const HomeS = createStackNavigator();
const HomeStack = () => {
  return (
    <HomeS.Navigator initialRouteName="Home">
      <HomeS.Screen name="Home" component={Home} />
    </HomeS.Navigator>
  );
};
const DownloadS = createStackNavigator();
const DownloadStack = () => {
  const renderDownload = () => {
    return <Download isEmpty={true} />;
  };
  return (
    <DownloadS.Navigator initialRouteName="Download">
      <DownloadS.Screen name="Download" component={renderDownload} />
    </DownloadS.Navigator>
  );
};
const BrowseS = createStackNavigator();
const BrowseStack = () => {
  return (
    <BrowseS.Navigator initialRouteName="Browse">
      <BrowseS.Screen name="Browse" component={Browse} />
    </BrowseS.Navigator>
  );
};
const Tab = createBottomTabNavigator();
export default function App() {
  const renderListCourse = () => {
    return <ListCourses title="Software Development" />;
  };
  const renderCourseDetail = () => {
    return <CourseDetail />;
  };

  return (
    <NavigationContainer theme={{colors: {background: "#1f242a", text: 'white'}}}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Download") {
              iconName = "arrow-alt-circle-down";
            } else if (route.name === "Browse") {
              iconName = "keyboard";
            } else if (route.name === "Search") {
              iconName = "search";
            }
            return (
              <FontAwesome5Icon
                name={iconName}
                size={size}
                color={color}
                solid={focused}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#2384ae",
          inactiveTintColor: "gray",
          activeBackgroundColor: "#1f242a",
          inactiveBackgroundColor: "#1f242a",
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Download" component={DownloadStack} />
        <Tab.Screen name="Browse" component={BrowseStack} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
      {/*<Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Download" component={renderDownload}/>
        <Stack.Screen name="List" component={renderListCourse}  />
        <Stack.Screen name="Course Path" component={CoursePath}/>
        <Stack.Screen name="Course" component={renderCourseDetail}/>
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sign Up" component={Register} />
        <Stack.Screen name="Sign In" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Setting} />
      </Stack.Navigator>*/}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
