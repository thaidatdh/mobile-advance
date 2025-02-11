import React, { useState } from "react";
import { useEffect } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../../../Contexts/AuthContextProvider";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
import ApiServices from "../../../services/api-services";
import ProfileContentSecion from "./profile-content-section";
import ImagePickerService from "../../../services/image-picker-service";
import ImgurApiService from "../../../services/imgur-api-service";
import PhoneStorage from "../../../services/phone-storage";
const { width, height } = Dimensions.get("window");

const Profile = ({ navigation }) => {
  /*const sections = [
    {
      title: "total active days",
      value: "0",
      subValue: "0 day streak",
    },
    {
      title: "most active time of day",
      value: "7:00 AM",
      subValue: "",
    },
    {
      title: "most viewed subject",
      value: "N/A",
      subValue: "",
    },
  ];*/
  const { theme, language } = React.useContext(SettingContext);
  const errorValue = language.errorValuesUserInfo;
  const { user, token, setUser } = React.useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [type, setType] = useState(user.type);
  const [avatar, setAvatar] = useState(user.avatar);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [errorCode, setErrorCode] = useState("");
  const [errorCodeEmail, setErrorCodeEmail] = useState("");
  const [errorCodePwd, setErrorCodePwd] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPwd, setIsEditPwd] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryNew, setSecureTextEntryNew] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const onUpdate = () => {
    setIsUpdated(!isUpdated);
  };
  useEffect(() => {
    onUpdate();
    navigation.setOptions({
      title: language.Profile,
    });
  }, []);
  useEffect(() => {
    ApiServices.getUserInfo(token)
      .then((res) => res.json())
      .then((response) => {
        if (response.payload) {
          setUser(response.payload);
          setAvatar(response.payload.avatar);
          setEmail(response.payload.email);
          setName(response.payload.name);
          setPhone(response.payload.phone);
          setType(response.payload.type);
          PhoneStorage.save("@user", JSON.stringify(response.payload));
        }
      });
  }, [isUpdated]);
  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const updateSecureTextEntryRepeat = () => {
    setSecureTextEntryNew(!secureTextEntryNew);
  };
  const onUpdateProfile = async () => {
    if (phone.length == 0) {
      setErrorCode(errorValue[0]);
      return;
    }
    let data = {
      avatar: avatar,
      phone: phone,
      name: name,
    };
    ApiServices.updateProfile(token, data)
      .then((res) => res.json())
      .then((response) => {
        if (response.payload) {
          setUser(response.payload);
          setErrorCode("");
          onUpdate();
          setSuccessMessage(language.Updateduserinfosuccessfully);
        } else {
          setErrorCode(language.Updatefailed);
          setSuccessMessage("");
        }
      })
      .catch((err) => {
        setErrorCode(err.message);
        setSuccessMessage("");
      });
  };
  const onEmailChange = async () => {
    if (email.length == 0) {
      setErrorCodeEmail(errorValue[0]);
      setSuccessMessage("");
      return;
    } else if (!validateEmail(email)) {
      setErrorCodeEmail(errorValue[1]);
      setSuccessMessage("");
      return;
    } else if (email == user.email) {
      setErrorCodeEmail(language.Pleaseenterdifferentemailtochangeemail);
      setSuccessMessage("");
      return;
    }
    let data = {
      newEmail: email,
    };
    ApiServices.updateEmail(token, data)
      .then((res) => {
        if (res.ok) {
          const newUser = Object.assign(user, { email: email });
          setUser(newUser);
          setErrorCodeEmail("");
          onUpdate();
          setSuccessMessage(language.Updatedemailsuccessfully);
        } else {
          setErrorCodeEmail(language.EmailAlreadyExisted);
          setSuccessMessage("");
        }
      })
      .catch((err) => {
        setErrorCodeEmail(err.message);
        setSuccessMessage("");
      });
  };
  const onPasswordChange = async () => {
    if (password.length == 0 || password.length == 0) {
      setErrorCodePwd(errorValue[0]);
      setSuccessMessage("");
      return;
    } else if (password == newPassword) {
      setErrorCodePwd(language.Pleaseenterdifferentpassword);
      setSuccessMessage("");
      return;
    }
    let data = {
      id: user ? user.id : "",
      oldPass: password,
      newPass: newPassword,
    };
    ApiServices.changePassword(token, data)
      .then((res) => {
        if (!res.ok) {
          setErrorCodePwd(language.PwdNotcorrect);
          setSuccessMessage("");
        } else {
          setErrorCodePwd("");
          onUpdate();
          setSuccessMessage(language.Updatedpasswordsuccessfully);
        }
      })
      .catch((err) => {
        setErrorCodePwd(err.message);
        setSuccessMessage("");
      });
  };
  const onSelectImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePickerService.requestPermission();
        if (status !== "granted") {
          alert(language.Sorryweneedpermissionstomakethiswork);
          return;
        }
      }
      const result = await ImagePickerService.loadImage();
      if (!result.cancelled) {
        //selected
        const base64Image = result.base64;
        const uploadRes = await ImgurApiService.uploadImage(base64Image);
        const uploadResult = await uploadRes.json();
        if (
          uploadResult.success &&
          uploadResult.data &&
          uploadResult.data.link
        ) {
          setAvatar(uploadResult.data.link);
          setErrorCode("");
        } else {
          setErrorCode(language.UploadImagefailed);
          setSuccessMessage("");
        }
      }
    } catch (err) {
      setErrorCode(err.message);
      setSuccessMessage("");
      console.log(err);
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
  /*const createSections = () => {
    return sections.map((item) => (
      <ProfileContentSecion
        key={item.title}
        title={item.title}
        value={item.value}
        subValue={item.subValue}
      />
    ));
  };*/
  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.c_0E0F13 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.c_0E0F13} />
      <View style={styles.headerContainer}>
        <Image source={{ uri: avatar }} style={styles.image} />
        <View style={styles.nameView}>
          <Text style={{ ...styles.name, color: theme.c_white }}>
            {user.name}
          </Text>
          <Text style={{ ...styles.userType, color: theme.c_gray }}>
            {user.type}
          </Text>
          <Text style={{ ...styles.email, color: theme.c_gray }}>
            {user.email}
          </Text>
        </View>
      </View>
      {/*<View style={{ margin: 20 }}>
        <Text style={styles.recentActivity}>
          Activity insights (last 30 days)
        </Text>
        {createSections()}
  </View>*/}
      <ScrollView
        horizontal={false}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <View style={{ margin: 20 }} />
        {successMessage != "" ? (
          <Text
            style={{ color: "green", textAlign: "center", marginBottom: 10 }}
          >
            {successMessage}
          </Text>
        ) : null}
        <TouchableOpacity
          style={{
            ...styles.signOnSSOBtn,
            flexDirection: "row",
            padding: 5,
            backgroundColor: theme.c_0E0F13,
          }}
          onPress={onSelectImage}
        >
          <FontAwesome5Icon name="upload" color={theme.c_white} />
          <Text
            style={{
              ...styles.buttonText,
              marginLeft: 10,
              color: theme.c_white,
            }}
          >
            {language.SelectAvatar}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={{ ...styles.input, backgroundColor: theme.c_1f242a }}
          label={language.FullName}
          theme={themeTextInput}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={{ ...styles.input, backgroundColor: theme.c_1f242a }}
          label={language.Phone + " *"}
          theme={themeTextInput}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        {errorCode != "" ? (
          <Text style={{ color: "red", textAlign: "center" }}>{errorCode}</Text>
        ) : null}
        <TouchableOpacity style={styles.signInBtn} onPress={onUpdateProfile}>
          <Text style={styles.buttonText}>{language.Update}</Text>
        </TouchableOpacity>
        {!isEditEmail ? (
          <Button
            style={{ ...styles.signOnSSOBtn, backgroundColor: theme.c_0E0F13 }}
            onPress={() => setIsEditEmail(true)}
          >
            <Text style={styles.buttonTextBlue}>{language.UpdateEmail}</Text>
          </Button>
        ) : (
          <View>
            <TextInput
              style={{ ...styles.input, backgroundColor: theme.c_1f242a }}
              label="Email *"
              theme={themeTextInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {errorCodeEmail != "" ? (
              <Text style={{ color: "red", textAlign: "center" }}>
                {errorCodeEmail}
              </Text>
            ) : null}
            <TouchableOpacity style={styles.signInBtn} onPress={onEmailChange}>
              <Text style={styles.buttonText}>{language.UpdateEmail}</Text>
            </TouchableOpacity>
          </View>
        )}
        {!isEditPwd ? (
          <Button
            style={{ ...styles.signOnSSOBtn, backgroundColor: theme.c_0E0F13 }}
            onPress={() => setIsEditPwd(true)}
          >
            <Text style={styles.buttonTextBlue}>{language.UpdatePassword}</Text>
          </Button>
        ) : (
          <View>
            <TextInput
              style={{ ...styles.input, backgroundColor: theme.c_1f242a }}
              label={language.CurrentPassword}
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
              style={{ ...styles.input, backgroundColor: theme.c_1f242a }}
              label={language.NewPassword}
              theme={themeTextInput}
              secureTextEntry={secureTextEntryNew}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              right={
                secureTextEntryNew ? (
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
            {errorCodePwd != "" ? (
              <Text style={{ color: "red", textAlign: "center" }}>
                {errorCodePwd}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={onPasswordChange}
            >
              <Text style={styles.buttonText}>{language.UpdatePassword}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ margin: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: width * 0.8,
  },
  nameView: {
    flexDirection: "column",
    justifyContent: "center",
    height: width * 0.15,
    alignSelf: "center",
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
  input: {
    flex: 1,
    width: width * 0.8,
    color: "white",
    backgroundColor: "#1f242a",
    margin: width * 0.01,
  },
  name: { color: "white", fontSize: width * 0.05 },
  email: { color: "gray", fontSize: width * 0.03 },
  userType: { color: "gray", fontSize: width * 0.03 },
  image: {
    height: width * 0.15,
    width: width * 0.15,
    maxHeight: 200,
    maxWidth: 200,
    borderRadius: width * 0.15 > 200 ? 100 : width * 0.15 * 0.5,
    margin: 20,
    alignSelf: "center",
  },
  recentActivity: {
    fontSize: 15,
    color: "white",
    marginBottom: 20,
    marginTop: 20,
  },
});
export default Profile;
