import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const { theme } = React.useContext(SettingContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isReadyToLogin, setIsReadyToLogin] = useState(false);
  const [error, setError] = useState("");
  const { login } = React.useContext(AuthContext);
  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const onUsernameChange = (text) => {
    setUsername(text);
    if (username.length > 0 && password.length > 0 && validateEmail(username)) {
      setIsReadyToLogin(true);
    } else {
      setIsReadyToLogin(false);
    }
  };
  const onPasswordChange = (text) => {
    setPassword(text);
    if (username.length > 0 && password.length > 0 && validateEmail(username)) {
      setIsReadyToLogin(true);
    } else {
      setIsReadyToLogin(false);
    }
  };
  const onLogin = async () => {
    if (!isReadyToLogin) {
      return;
    }
    let result = await login(username, password);
    if (result === "") {
      navigation.navigate("Main");
    } else {
      setError(result);
    }
  };
  const onSignUp = () => {
    navigation.navigate("Sign Up");
  };
  const onForgetPassword = () => {
    navigation.navigate("Forget Password");
  };
  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const themeTextInput = {
    colors: {
      placeholder: theme.c_b4b5ba,
      text: theme.c_white,
      primary: theme.c_2384ae,
      underlineColor: theme.c_2384ae,
      background: theme.c_1f242a,
    },
  };
  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.c_0E0F13} />
      <View style={{ margin: 20 }} />
      <ScrollView horizontal={false}>
        <TextInput
          name="username"
          style={{
            ...styles.input,
            backgroundColor: theme.c_1f242a,
            color: theme.c_white,
          }}
          label="Email"
          theme={themeTextInput}
          value={username}
          onChangeText={(text) => onUsernameChange(text)}
        />
        <TextInput
          name="password"
          style={{
            ...styles.input,
            backgroundColor: theme.c_1f242a,
            color: theme.c_white,
          }}
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
                color={theme.c_gray}
                centered={true}
                size={20}
                solid
              />
            ) : (
              <TextInput.Icon
                style={{ flexDirection: "column", alignSelf: "center" }}
                onPress={updateSecureTextEntry}
                name="eye"
                color={theme.c_gray}
                size={20}
                solid
              />
            )
          }
        />
        {error === "" ? null : (
          <Text style={{ color: "red", alignSelf: "center" }}>{error}</Text>
        )}
        <TouchableOpacity
          style={
            isReadyToLogin
              ? styles.signInBtn
              : { ...styles.signInBtnDisabled, backgroundColor: theme.c_2b2c30 }
          }
          disabled={!isReadyToLogin}
          onPress={onLogin}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBtn} onPress={onForgetPassword}>
          <Text style={styles.buttonTextBlue}>Forgot Password?</Text>
        </TouchableOpacity>
        {/*<Button style={styles.signOnSSOBtn}>
          <Text style={styles.buttonTextBlue}>Use Single Sign-On (SSO)</Text>
        </Button>*/}
        <TouchableOpacity style={styles.linkBtn} onPress={onSignUp}>
          <Text style={styles.buttonTextBlue}>Sign up FREE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 10,
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
