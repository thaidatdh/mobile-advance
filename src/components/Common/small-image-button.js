import React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const SmallImageButton = (props) => {
  const texts = [];

  if (Array.isArray(props.title)) {
    for (const [index, value] of props.title.entries()) {
      if (props.style.length > index) {
        texts.push(<Text style={props.style[index]}>{value}</Text>);
      } else {
        texts.push(<Text>{value}</Text>);
      }
    }
  } else {
    texts.push(<Text style={props.style}>{props.title}</Text>);
  }

  return (
    <ImageBackground
      style={styles.button}
      source={{
        uri:
          "https://th.bing.com/th/id/OIP.rv8UTbHAigbkqrZB1rKoHAHaEK?w=311&h=180&c=7&o=5&pid=1.7",
      }}
    >
      <TouchableOpacity style={styles.touch}>{texts}</TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 70,
    marginTop: 5,
    marginBottom: 5,
    width: 150,
  },
  touch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    width: "80%",
  },
});
export default SmallImageButton;
