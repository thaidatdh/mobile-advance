import React, { useState } from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const {width, height} = Dimensions.get("window");
const TextSettingButton = (props) => {
    
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{color: 'white'}}>{props.item.title}</Text>
        {props.item.desc ? <Text style={{color: 'gray', fontSize: 12}}>{props.item.desc}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
   container: {
    flex:1,
      backgroundColor: "#0E0F13",
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 2,
      minHeight: 50
    },
  textContainer: {
    flex: 1,
    maxWidth: width * 0.8,
      flexDirection: 'column',
      justifyContent: 'center',
  }
});
export default TextSettingButton;
