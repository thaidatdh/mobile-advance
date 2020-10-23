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
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isReadyToLogin, setIsReadyToLogin] = useState(false);
  const onUsernameChange = (text) => {
    setUsername(text);
    if (username.length > 0 && password.length > 0) {
      setIsReadyToLogin(true);
    }
    else {
      setIsReadyToLogin(false);
    }
  }
  const onPasswordChange = (text) => {
    setPassword(text);
    if (username.length > 0 && password.length > 0) {
      setIsReadyToLogin(true);
    }
    else {
      setIsReadyToLogin(false);
    }
  }
  const onLogin = () => {
    if (!isReadyToLogin) {
      return;
    }
    console.log("Login");
  }
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
      <ScrollView horizontal={false}>
        <TextInput
          name="username"
          style={styles.input}
          label="Username (or Email)"
          theme={themeTextInput}
          value={username}
          onChangeText={(text) => onUsernameChange(text)}
        />
        <TextInput
          name="password"
          style={styles.input}
          label="Password"
          theme={themeTextInput}
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={(text) => onPasswordChange(text)}
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
        <TouchableOpacity 
        style={isReadyToLogin ? styles.signInBtn : styles.signInBtnDisabled} 
        disabled={!isReadyToLogin}
        onPress={onLogin}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBtn}>
          <Text style={styles.buttonTextBlue}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button style={styles.signOnSSOBtn}>
          <Text style={styles.buttonTextBlue}>Use Single Sign-On (SSO)</Text>
        </Button>
        <TouchableOpacity style={styles.linkBtn}>
          <Text style={styles.buttonTextBlue}>Sign up FREE</Text>
        </TouchableOpacity>
      </ScrollView>
      
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
    height: height * 0.05,
    backgroundColor: "#2384ae",
    color: "#818286",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  signInBtnDisabled: {
    borderRadius: 5,
    width: width * 0.8,
    height: height * 0.05,
    backgroundColor: "#2b2c30",
    color: "#818286",
    alignItems: "center",
    justifyContent: "center",
    marginTop:10,
    marginBottom: 10,
  },
  signOnSSOBtn: {
    width: width * 0.8,
    backgroundColor: "#0E0F13",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2384ae",
    borderWidth: 2,
    marginBottom: 10,
  },
  linkBtn: {
    width: width * 0.8,
    borderRadius: 5,
    height: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default Login;
