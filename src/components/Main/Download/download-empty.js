import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { SettingContext } from "../../../Contexts/SettingContextProvider";
const { width, height } = Dimensions.get("window");
const DownloadEmpty = (props) => {
  const { theme, language } = React.useContext(SettingContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.c_0E0F13,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        style={{ width: width * 0.8, backgroundColor: theme.c_2384ae }}
        onPress={props.onCheckNotEmpty}
      >
        <Text style={{ color: theme.c_white, textTransform: "uppercase" }}>
          {language.FindACourseToDownload}
        </Text>
      </Button>
    </View>
  );
};

export default DownloadEmpty;
