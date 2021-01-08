import React, { useContext, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../../../../Contexts/AuthContextProvider";
import { DataContext } from "../../../../../Contexts/DataContextProvider";
import ApiServices from "../../../../../services/api-services";
import { SettingContext } from "../../../../../Contexts/SettingContextProvider";
import PhoneStorage from "../../../../../services/phone-storage";
import FileSystemApi from "../../../../../services/file-system-api";
const { width, height } = Dimensions.get("window");

const ContentSubsection = (props) => {
  const { theme, language } = React.useContext(SettingContext);
  const { token, user, isChanneled } = useContext(AuthContext);
  const { isInternetReachable } = useContext(DataContext);
  const onClickLesson = async (item) => {
    NetInfo.addEventListener((state) => {});
    if (!token || !user || !isChanneled(item.courseId)) {
      Alert.alert(
        language.Alert,
        language.Youhavetoownedcoursetowatchthislesson
      );
      return;
    }
    if (!isInternetReachable && item.videoUrl.includes("youtube.com")) {
      Alert.alert(
        "Internet",
        language.Cannotseethisvideobecauseitsaonlinesection
      );
      return;
    }
    if (!item.videoUrl) {
      Alert.alert(language.Videonotfound, language.Videolinkisnull);
      return;
    }
    if (item.videoUrl) {
      NetInfo.fetch()
        .then((state) => {
          if (!state.isInternetReachable) {
            FileSystemApi.getLessonVideo(item.courseId, item.id, item.videoUrl)
              .then((promoVidUrl) => {
                if (promoVidUrl) {
                  props.onChangeVideo(promoVidUrl, item.id);
                }
              })
              .catch((err) => {});
          }
          else {
            props.onChangeVideo(item.videoUrl, item.id);
          }
        })
        .catch((err) => {});
    }
    let content = item.name;
    if (item.content) {
      content = content ? content + "\n" + item.captionName : item.captionName;
    }
    if (item.captionName) {
      content = content ? content + "\n" + item.captionName : item.captionName;
    }
    ApiServices.updateLessonStatus(token, item.id).catch(err => {});
    ApiServices.getLessonSubtitle(token, item.courseId, item.id).then(
      (subtitle) => {
        if (subtitle && subtitle.payload) {
          let contentSub = language.Subtitle + ":\n" + subtitle.payload;
          content = content ? content + "\n\n" + contentSub : contentSub;
          PhoneStorage.save(
            "@subtitle_" + item.courseId + item.id,
            JSON.stringify(subtitle.payload)
          );
        } else {
          if (!isInternetReachable) {
            PhoneStorage.load(
              "@subtitle_" + item.courseId + item.id,
              "json"
            ).then((persistData) => {
              if (persistData) {
                let contentSub = language.Subtitle + ":\n" + subtitle.payload;
                content = content ? content + "\n\n" + contentSub : contentSub;
              }
            });
          }
        }
      }
    );

    props.onChangeTranscript(content);
  };
  const renderListContent = (contents) => {
    return contents.map((item) => (
      <TouchableOpacity
        key={item.title + item.id}
        style={styles.item}
        onPress={() => onClickLesson(item)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: props.currentLesson == item.id ? "red" : theme.c_gray,
              borderRadius: 10,
              height: 10,
              width: 10,
              marginRight: 10,
            }}
          ></View>
          <Text style={{ color: theme.c_white }}>{item.name}</Text>
        </View>
        <Text style={{ color: theme.c_white }}>{item.hours.toFixed(3)}</Text>
      </TouchableOpacity>
    ));
  };
  return (
    <View style={{ width: width, marginBottom: 20, alignItems: "center" }}>
      <View
        style={{
          height: height * 0.1,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", width: width * 0.9 }}>
          <View
            style={{
              backgroundColor: theme.c_1f242a,
              borderBottomWidth: 3,
              borderColor: theme.c_394249,
              width: width * 0.2,
              height: height * 0.08,
              maxWidth: 100,
              maxHeight: 90,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.c_white,
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              {props.item.numberOrder}
            </Text>
          </View>
          <Text
            style={{
              color: theme.c_white,
              width: width * 0.7,
              paddingLeft: 20,
              alignSelf: "center",
            }}
          >
            {props.item.name}
          </Text>
        </View>
      </View>
      <View style={{ width: width * 0.9 }}>
        {renderListContent(props.item.lesson)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0E0F13",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default ContentSubsection;
