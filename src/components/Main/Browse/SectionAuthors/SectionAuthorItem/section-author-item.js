import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const SectionAuthorItem = (props) => {
  return (
    <View style={styles.item}>
      <Image
        source={require("../../../../../../assets/bg.png")}
        style={styles.image}
      />
      <View style={styles.titleView}>
        <Text style={styles.title}>{props.author.title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    width: 100,
    height: 200,
    color: 'white',
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  titleView: {
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
  },
});
export default SectionAuthorItem;
