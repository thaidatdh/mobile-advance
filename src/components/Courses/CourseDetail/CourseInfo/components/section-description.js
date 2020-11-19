import React, { useState } from "react";
import {View, Dimensions, StyleSheet, Text, ScrollView } from 'react-native'

const {width, height} = Dimensions.get("window");

const SectionDescription = (props) => {
  return (
      <ScrollView style={styles.container}  nestedScrollEnabled = {true}>
        <View style={{height: "100%", width: width * 0.9}}>
          <Text style={{color: 'white', textAlign: 'justify'}}>{props.description}</Text>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0E0F13",
    padding: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default SectionDescription;