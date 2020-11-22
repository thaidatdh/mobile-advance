import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const {width, height} = Dimensions.get("window");

const SectionAuthorItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.onPress(props.author)}
    >
      <Image
        source={require("../../../../../../assets/bg.png")}
        style={styles.image}
      />
      <View style={styles.titleView}>
        <Text style={styles.title}>{props.author.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    width: width * 0.2,
    height: width * 0.3,
    maxWidth: 100,
    maxHeight: 150,
    color: 'white',
    alignItems: "center",
  },
  image: {
    height: width * 0.2,
    width: width * 0.2,
    maxHeight: 100,
    maxWidth: 100,
    borderRadius: width * 0.15 > 100 ? 50 : width * 0.2 * 0.5,
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
