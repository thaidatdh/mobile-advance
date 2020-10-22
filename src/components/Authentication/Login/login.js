import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native-paper";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

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
      <View style={usernameFocus ? styles.inputViewFocus : styles.inputView}>
        <TextInput
          name="username"
          style={styles.input}
          label="Username (or Email)"
          theme={themeTextInput}
          value={username}
          onChangeText={(text) => setUsername(text)}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
      </View>
      <View style={passwordFocus ? styles.inputViewFocus : styles.inputView}>
        <TextInput
          name="password"
          style={styles.input}
          label="Password"
          theme={themeTextInput}
          secureTextEntry={secureTextEntry ? true : false}
          value={password}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
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
      <TouchableOpacity style={styles.signInBtn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkBtn}>
        <Text style={styles.buttonTextBlue}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOnSSOBtn}>
        <Text style={styles.buttonTextBlue}>Use Single Sign-On (SSO)</Text>
      </TouchableOpacity>
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
  inputView: {
    width: "80%",
    backgroundColor: "#1f242a",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  inputViewFocus: {
    width: "80%",
    backgroundColor: "#1f242a",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    borderBottomColor: "#2384ae",
    borderBottomWidth: 2,
  },
  input: {
    flex: 1,
    width: "100%",
    height: "100%",
    color: "white",
    backgroundColor: "#1f242a",
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
    width: "80%",
    backgroundColor: "#2b2c30",
    color: "#818286",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  signOnSSOBtn: {
    width: "80%",
    backgroundColor: "#0E0F13",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2384ae",
    borderWidth: 2,
    marginBottom: 10,
  },
  linkBtn: {
    width: "80%",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default Login;
