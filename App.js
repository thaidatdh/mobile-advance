import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Login from './src/components/Authentication/Login/login';
import ListCourses from './src/components/Courses/ListCourses/list-courses';
import Home from './src/components/Main/Home/home';

export default function App() {
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1
  },
});
