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
import SettingProvider, { Languages } from "./src/Contexts/SettingContextProvider";
import { Provider } from "react-native-paper";
import Author from "./src/components/Courses/Author/author";
import ListAuthors from "./src/components/Courses/Author/list-authors";
import { AuthContext } from "./src/Contexts/AuthContextProvider";
import { DataContext } from "./src/Contexts/DataContextProvider";
import { SettingContext } from "./src/Contexts/SettingContextProvider";
import ForgetPassword from "./src/components/Authentication/ForgetPassword/forget-password";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme } = React.useContext(SettingContext);
  return (
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
        activeTintColor: theme.c_2384ae,
        inactiveTintColor: theme.tinBottomBar,
        activeBackgroundColor: theme.c_1f242a,
        inactiveBackgroundColor: theme.c_1f242a,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Download" component={Download} />
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
  const { theme, loadPersistTheme, language } = React.useContext(SettingContext);
  useEffect(() => {
    const loadData = () => {
      loadPersistTheme();
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
      NetInfo.addEventListener((state) => {});
      NetInfo.fetch().then((state) => {
        if (!state.isInternetReachable) {
          Alert.alert(
            "Internet",
            "This application require internet connection.\nYou may not use all feature with offline mode."
          );
        }
      });
    };
    CheckConnectivity();
  }, []);
  useEffect(() => {
    NetInfo.addEventListener((state) => {});
    NetInfo.fetch().then((state) => {
      setIsInternetReachable(state.isInternetReachable);
    });
  });
  return (
    <NavigationContainer
      theme={{ colors: { background: theme.c_1f242a, text: theme.c_white } }}
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
        <Stack.Screen
          name="Sign In"
          component={Login}
          options={{ title: language.SignIn }}
        />
        <Stack.Screen
          name="Sign Up"
          component={Register}
          options={{ title: language.SignUp }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="Forget Password"
          component={ForgetPassword}
          options={{ title: language.ForgetPassword }}
        />
        <Stack.Screen
          name="Settings"
          component={Setting}
          options={{ title: language.Settings }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  return (
    <Provider>
      <SettingProvider>
        <AuthProvider>
          <DataProvider>
            <MainNavigator />
          </DataProvider>
        </AuthProvider>
      </SettingProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
