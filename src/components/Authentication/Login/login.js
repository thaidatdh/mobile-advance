import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button,TextInput } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const themeTextInput = {
    colors: {
      placeholder: "#b4b5ba",
      text: "white",
      primary: "#2384ae",
      underlineColor: "#2384ae",
      background: "#1f242a",
    },
  };
  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }} />
      <View>
        <TextInput
          name="username"
          style={styles.input}
          label="Username (or Email)"
          theme={themeTextInput}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          name="password"
          style={styles.input}
          label="Password"
          theme={themeTextInput}
          secureTextEntry={secureTextEntry ? true : false}
          value={password}
          onChangeText={(text) => setPassword(text)}
          right={
            secureTextEntry ? (
              <TextInput.Icon
                style={{ alignSelf: "center", flexDirection: "column" }}
                onPress={updateSecureTextEntry}
                name="eye-off"
                color="grey"
                centered={true}
                size={20}
                solid
              />
            ) : (
              <TextInput.Icon
                style={{ flexDirection: "column", alignSelf: "center" }}
                onPress={updateSecureTextEntry}
                name="eye"
                color="grey"
                size={20}
                solid
              />
            )
          }
        />
      </View>
      <Button style={styles.signInBtn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </Button>
      <TouchableOpacity style={styles.linkBtn}>
        <Text style={styles.buttonTextBlue}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button style={styles.signOnSSOBtn}>
        <Text style={styles.buttonTextBlue}>Use Single Sign-On (SSO)</Text>
      </Button>
      <TouchableOpacity style={styles.linkBtn}>
        <Text style={styles.buttonTextBlue}>Sign up FREE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    alignItems: "center",
  },
  input: {
    flex: 1,
    width: width * 0.8,
    color: "white",
    backgroundColor: "#1f242a",
    margin: width * 0.01,
  },
  buttonText: {
    color: "white",
    fontSize: 11,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  buttonTextBlue: {
    color: "white",
    fontSize: 11,
    textTransform: "uppercase",
    color: "#2384ae",
    fontWeight: "bold",
  },
  signInBtn: {
    borderRadius: 5,
    width: width * 0.8,

    backgroundColor: "#2b2c30",
    color: "#818286",
    alignItems: "center",
    justifyContent: "center",
    marginTop: width * 0.025,
    marginBottom: width * 0.05,
  },
  signOnSSOBtn: {
    width: width * 0.8,
    backgroundColor: "#0E0F13",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2384ae",
    borderWidth: 2,
    marginBottom: width * 0.025,
  },
  linkBtn: {
    width: width * 0.8,
    borderRadius: 5,
    height: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: width * 0.025,
  },
});

export default Login;
