import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const ProfileContentSecion = (props) => {
   return (
      <View style={styles.container}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.flexRowContainer}>
            <Text style={styles.contentValue}>{props.value}</Text>
            <Text style={styles.subContentValue}>{props.subValue}</Text>
          </View>
      </View>
      );
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: "#0E0F13",
      marginTop: 10,
      marginBottom: 10
    },
    title: {
       textTransform: 'uppercase',
       color: 'gray',
       fontSize:12,
    },
    flexRowContainer: {
      flexDirection: 'row',
    },
    contentValue: {
       fontSize: 15,
       color: 'white',
       marginTop: 3
    },
    subContentValue: {
      fontSize: 10,
      color: 'gray',
      marginLeft: 10,
      alignSelf: 'flex-end'
    }
});
export default ProfileContentSecion;
