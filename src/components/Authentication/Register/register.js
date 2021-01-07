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
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");

const Register = ({navigation}) => {
  const { theme, language } = React.useContext(SettingContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  //const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryRepeat, setSecureTextEntryRepeat] = useState(true);

  const [errorCode, setErrorCode] = useState('');

  const { register } = React.useContext(AuthContext);

  const errorValue = language.errorValuesUserInfo;
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
  const onSignIn = () => {
    navigation.navigate('Sign In');
  }
  const onRegister = async () => {
    if (email.length == 0 || phone.length == 0 || username.length == 0) {
      setErrorCode(errorValue[0]);
      return;
    } else if (!validateEmail(email)) {
      setErrorCode(errorValue[1]);
      return;
    } else if (password.length < 8) {
      setErrorCode(errorValue[2]);
      return;
    } else if (password !== repeatPassword) {
      setErrorCode(errorValue[3]);
      return;
    }
    let user = {
      email: email,
      username: username,
      password: password,
      phone: phone,
      //name: name,
    }
    let result = await register(user);
    setErrorCode(result);
    if (result === "") {
      onSignIn();
    }
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
      <ScrollView horizontal={false}>
        <View style={{ margin: 20 }} />
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: theme.c_1f242a,
            color: theme.c_white,
          }}
          label="Email *"
          theme={themeTextInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/*<TextInput
          style={{
            ...styles.input,
            backgroundColor: theme.c_1f242a,
            color: theme.c_white,
          }}
          label="Full Name *"
          theme={themeTextInput}
          value={name}
          onChangeText={(text) => setName(text)}
        />*/}
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: theme.c_1f242a,
            color: theme.c_white,
          }}
          label={language.Phone + " *"}
          theme={themeTextInput}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: theme.c_1f242a,
            color: theme.c_white,
          }}
          label={language.Username + " *"}
          theme={themeTextInput}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: theme.c_1f242a,
            color: theme.c_white,
          }}
          label={language.Password}
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
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: theme.c_1f242a,
            color: theme.c_white,
          }}
          label={language.RepeatPassword}
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
                color={theme.c_gray}
                centered={true}
                size={20}
                solid
              />
            ) : (
              <TextInput.Icon
                style={{ flexDirection: "column", alignSelf: "center" }}
                onPress={updateSecureTextEntryRepeat}
                name="eye"
                color={theme.c_gray}
                size={20}
                solid
              />
            )
          }
        />
        {errorCode != "" ? (
          <Text style={{ color: "red" }}>{errorCode}</Text>
        ) : null}
        <TouchableOpacity style={styles.signInBtn} onPress={onRegister}>
          <Text style={styles.buttonText}>{language.SignUp}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBtn} onPress={onSignIn}>
          <Text style={styles.buttonTextBlue}>{language.SignIn}</Text>
        </TouchableOpacity>
        {/*<Button style={styles.signOnSSOBtn}>
          <Text style={styles.buttonTextBlue}>Use Single Sign-On (SSO)</Text>
        </Button>*/}
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
