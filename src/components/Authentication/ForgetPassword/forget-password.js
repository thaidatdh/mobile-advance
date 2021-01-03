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
import ApiServices from "../../../services/api-services";
const { width, height } = Dimensions.get("window");

const ForgetPassword = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [isReadyToLogin, setIsReadyToLogin] = useState(false);
  const [error, setError] = useState("");
  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const onUsernameChange = (text) => {
    setUsername(text);
    if (username.length > 0 && validateEmail(username)) {
      setIsReadyToLogin(true);
    } else {
      setIsReadyToLogin(false);
    }
  };
  
  const onForget = async () => {
    if (!isReadyToLogin) {
      return;
    }
    try {
      let result = await ApiServices.forgetPassword(username);
      setError(result.message);
    }
    catch(err) {
       setError(err.message);
    }
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <View style={{ margin: 20 }} />
      <ScrollView horizontal={false}>
        <TextInput
          name="username"
          style={styles.input}
          label="Email"
          theme={themeTextInput}
          value={username}
          onChangeText={(text) => onUsernameChange(text)}
        />
        {!error ? null : (
          <Text style={{ color: "red", alignSelf: "center" }}>{error}</Text>
        )}
        <TouchableOpacity
          style={isReadyToLogin ? styles.signInBtn : styles.signInBtnDisabled}
          disabled={!isReadyToLogin}
          onPress={onForget}
        >
          <Text style={styles.buttonText}>Forget Password</Text>
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

export default ForgetPassword;
