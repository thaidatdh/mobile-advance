import React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
const {width, height} = Dimensions.get("window");
const maxWidth = width * 0.4 > 300 ? 300 : width * 0.4;
const SmallImageButton = (props) => {
  const texts = [];
  let textValue = '';
  if (Array.isArray(props.title)) {
    for (const [index, value] of props.title.entries()) {
      if (props.style.length > index) {
        texts.push(<Text key={value} style={props.style[index]}>{value}</Text>);
        textValue += value + " ";
      } else {
        texts.push(<Text key={value} >{value}</Text>);
        textValue += value + ' ';
      }
    }
  } else {
    texts.push(<Text key={value}  style={props.style}>{props.title}</Text>);
    textValue = props.title;
  }
  return (
    <ImageBackground
      style={styles.button}
      source={{
        uri:
          "https://th.bing.com/th/id/OIP.rv8UTbHAigbkqrZB1rKoHAHaEK?w=311&h=180&c=7&o=5&pid=1.7",
      }}
    >
      <TouchableOpacity style={styles.touch} onPress={() => props.onPress(textValue)}>{texts}</TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  button: {
    height: height*0.075,
    marginTop: 5,
    marginBottom: 5,
    width: maxWidth
  },
  touch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
export default SmallImageButton;
