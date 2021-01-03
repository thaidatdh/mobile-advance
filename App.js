import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
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
import AuthProvider from "./src/Contexts/AuthContextProvider";
import DataProvider from "./src/Contexts/DataContextProvider";
import { Provider } from "react-native-paper";
import Author from "./src/components/Courses/Author/author";
import ListAuthors from "./src/components/Courses/Author/list-authors";
import { AuthContext } from "./src/Contexts/AuthContextProvider";
import { DataContext } from "./src/Contexts/DataContextProvider";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "My Courses") {
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Courses" component={Download} />
      <Tab.Screen name="Browse" component={Browse} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};
const MainNavigator = () => {
  const { loadPersistUserData } = React.useContext(AuthContext);
  const { getAllNewData, setIsInternetReachable } = React.useContext(
    DataContext
  );
  useEffect(() => {
    const loadData = () => {
      loadPersistUserData();
      getAllNewData();
    };
    const addNetListener = () => {
      NetInfo.addEventListener((state) => {});
    };
    loadData();
    addNetListener();
  }, []);
  useEffect(() => {
    const CheckConnectivity = () => {
      NetInfo.fetch().then((state) => {
        if (!state.isInternetReachable) {
          Alert.alert(
            "Internet",
            "This application require internet connection.\nYou may not use all feature with offline mode.",
            [
              {
                text: "OK",
                onPress: () => {},
              },
            ],
            { cancelable: false }
          );
        }
      });
    };
    CheckConnectivity();
  }, []);
  useEffect(() => {
    const CheckConnectivity2 = async () => {
      const state = await NetInfo.fetch();
      await setIsInternetReachable(state.isInternetReachable);
    };
    CheckConnectivity2();
  });
  return (
    <NavigationContainer
      theme={{ colors: { background: "#1f242a", text: "white" } }}
    >
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="List Courses" component={ListCourses} />
        <Stack.Screen name="Author" component={Author} />
        <Stack.Screen name="List Authors" component={ListAuthors} />
        <Stack.Screen name="Course" component={CourseDetail} />
        <Stack.Screen name="Sign In" component={Login} />
        <Stack.Screen name="Sign Up" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  return (
    <Provider>
      <AuthProvider>
        <DataProvider>
          <MainNavigator />
        </DataProvider>
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
