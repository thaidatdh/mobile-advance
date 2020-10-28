import React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
const {width, height} = Dimensions.get("window");

const ImageButton = (props) => {
  const texts = [];

  if (Array.isArray(props.title)) {
    for (const [index, value] of props.title.entries()) {
      texts.push(<Text key={value} style={styles.text}>{value}</Text>);
    }
  } else {
    texts.push(<Text key={value} style={styles.text}>{props.title}</Text>);
  }

  return (
    <ImageBackground
      style={styles.button}
      source={{
        uri:
          "https://th.bing.com/th/id/OIP.rv8UTbHAigbkqrZB1rKoHAHaEK?w=311&h=180&c=7&o=5&pid=1.7",
      }}
    >
      <TouchableOpacity style={styles.touch} onPress={props.onPress}>
        {texts}
      </TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  button: {
    height: height * 0.12,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
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
  },
});
export default ImageButton;
