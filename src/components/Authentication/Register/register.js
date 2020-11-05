import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryRepeat, setSecureTextEntryRepeat] = useState(true);

  const [errorCode, setErrorCode] = useState(-1);
  const errorValue = [
    "Please enter required fields (*)",
    "Email is not valid",
    "Password should include atleast 8 characters",
    "Repeat Password is incorrect",
  ];
  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const updateSecureTextEntryRepeat = () => {
    setSecureTextEntryRepeat(!secureTextEntryRepeat);
  };
  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const onRegister = () => {
    if (email.length == 0 || firstName.length == 0 || lastName.length == 0) {
      setErrorCode(0);
      return;
    } else if (!validateEmail(email)) {
      setErrorCode(1);
      return;
    } else if (password.length < 8) {
      setErrorCode(2);
      return;
    } else if (password !== repeatPassword) {
      setErrorCode(3);
      return;
    }
    setErrorCode(-1);
    console.log("Sign Up");
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
      <ScrollView horizontal={false}>
        <View style={{ margin: 20 }} />
        <TextInput
          style={styles.input}
          label="Email *"
          theme={themeTextInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          label="First Name *"
          theme={themeTextInput}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          label="Last Name *"
          theme={themeTextInput}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          label="Phone"
          theme={themeTextInput}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={styles.input}
          label="Username"
          theme={themeTextInput}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          label="Password"
          theme={themeTextInput}
          secureTextEntry={secureTextEntry}
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
        <TextInput
          style={styles.input}
          label="Repeat Password"
          theme={themeTextInput}
          secureTextEntry={secureTextEntryRepeat}
          value={repeatPassword}
          onChangeText={(text) => setRepeatPassword(text)}
          right={
            secureTextEntryRepeat ? (
              <TextInput.Icon
                style={{ alignSelf: "center", flexDirection: "column" }}
                onPress={updateSecureTextEntryRepeat}
                name="eye-off"
                color="grey"
                centered={true}
                size={20}
                solid
              />
            ) : (
              <TextInput.Icon
                style={{ flexDirection: "column", alignSelf: "center" }}
                onPress={updateSecureTextEntryRepeat}
                name="eye"
                color="grey"
                size={20}
                solid
              />
            )
          }
        />
        {errorCode != -1 ? (
          <Text style={{ color: "red" }}>{errorValue[errorCode]}</Text>
        ) : null}
        <TouchableOpacity style={styles.signInBtn} onPress={onRegister}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBtn}>
          <Text style={styles.buttonTextBlue}>Sign In</Text>
        </TouchableOpacity>
        <Button style={styles.signOnSSOBtn}>
          <Text style={styles.buttonTextBlue}>Use Single Sign-On (SSO)</Text>
        </Button>
        <View style={{ margin: 20 }} />
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
    marginTop: 20,
    marginBottom: 20,
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
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default Register;
