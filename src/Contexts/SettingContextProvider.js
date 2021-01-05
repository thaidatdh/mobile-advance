import React, { useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import {
  usersData,
  searchHistoryData,
  coursesData,
  authorsData,
  defaultSetting,
} from "../data/dataMockup";
import ApiServices from "../services/api-services";
import PhoneStorage from "../services/phone-storage";
import FileSystemApi from "../services/file-system-api";
import { Alert } from "react-native";

const dark = {
  c_0E0F13: "#0E0F13",
  c_1f242a: "#1f242a",
  c_b4b5ba: "#b4b5ba",
  c_2384ae: "#2384ae",
  c_818286: "#818286",
  c_2b2c30: "#2b2c30",
  c_394249: "#394249",
  c_black: "black",
  c_gray: "gray",
  c_lightgray: "lightgray",
  c_darkgray: "darkgray",
  c_white: "white",
  c_f1c40f: "#f1c40f",
  tinBottomBar: "gray",
};
const light = {
  c_0E0F13: "#a3b0e6",
  c_1f242a: "#a8cfff",
  c_b4b5ba: "#b4b5ba",
  c_2384ae: "#2384ae",
  c_818286: "#818286",
  c_2b2c30: "#b8c3f5",
  c_394249: "#4e95ed",
  c_black: "white",
  c_gray: "#5c5b5b",
  c_lightgray: "#575252",
  c_darkgray: "#424040",
  c_white: "black",
  c_f1c40f: "#c7a210",
  tinBottomBar: "white",
};
export const AppTheme = {
  dark,
  light,
};
export const SettingContext = React.createContext(null);
export default ({ children }) => {
  const [theme, setTheme] = useState(AppTheme.dark);
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState({});
  const [isEnglish, setIsEnglish] = useState(true);
  const switchTheme = () => {
    if (isDark) {
      setTheme(AppTheme.light);
      setIsDark(false);
      PhoneStorage.save("@theme", false);
    } else {
      setTheme(AppTheme.dark);
      setIsDark(true);
      PhoneStorage.save("@theme", true);
    }
  };
  const switchLanguage = () => {
    if (isEnglish) {
      setLanguage({});
      setIsEnglish(false);
      PhoneStorage.save("@language", false);
    } else {
      setLanguage({});
      setIsEnglish(true);
      PhoneStorage.save("@language", true);
    }
  };
  const loadPersistTheme = () => {
    PhoneStorage.load("@theme", 'json').then((value) => {
      if (value == null || value == undefined) {
        //setIsDark(true);
        //setTheme(AppTheme.dark);
      } else {
        if (value) {
          setIsDark(true);
          setTheme(AppTheme.dark);
        } else {
          setIsDark(false);
          setTheme(AppTheme.light);
        }
      }
    });
    PhoneStorage.load("@language", "json").then((value) => {
      if (value == null || value == undefined) {
        //
      } else {
        if (value) {
          setIsEnglish(true);
          setLanguage({});
        } else {
          setIsEnglish(false);
          setLanguage({});
        }
      }
    });
  };
  const store = {
    theme,
    isDark,
    switchTheme,
    loadPersistTheme,
    language,
    isEnglish,
    switchLanguage,
  };

  return (
    <SettingContext.Provider value={store}>{children}</SettingContext.Provider>
  );
};
