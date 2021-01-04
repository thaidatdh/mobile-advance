import React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
const maxWidth = width * 0.4 > 300 ? 300 : width * 0.4;
const SmallImageButton = (props) => {
  const texts = [];
  let textValue = "";
  let titleArray = props.title.split(" ");
  let titleArrayString = [];
  if (titleArray.length > 2) {
    let chunk_size = 2;
    let index = 0;
    for (index = 0; index < titleArray.length; index += chunk_size) {
      let myChunk = titleArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      titleArrayString.push(myChunk.join(" "));
    }
  }
  if (Array.isArray(titleArrayString) && titleArrayString.length > 0) {
    for (const [index, value] of titleArrayString.entries()) {
      texts.push(
        <Text key={value} style={styles.style}>
          {value}
        </Text>
      );
      textValue += value + " ";
    }
  } else {
    texts.push(
      <Text key={props.title} style={styles.style}>
        {props.title}
      </Text>
    );
    textValue = props.title;
  }
  return (
    <ImageBackground
      style={styles.button}
      source={require("../../../assets/buttonImage.png")}
    >
      <TouchableOpacity style={styles.touch} onPress={props.onPress}>
        {texts}
      </TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  button: {
    height: height * 0.075,
    marginTop: 5,
    marginBottom: 5,
    width: maxWidth,
  },
  touch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  style: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});
export default SmallImageButton;
