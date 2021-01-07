import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Menu, Divider, Provider, Appbar } from "react-native-paper";
import { AuthContext } from "../../Contexts/AuthContextProvider";
const { width, height } = Dimensions.get("window");
import { SettingContext } from "../../Contexts/SettingContextProvider";
const MAppBar = (props) => {
  const { user, logout } = React.useContext(AuthContext);
  const { theme, language } = React.useContext(SettingContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const onClick = () => {
    if (user) {
      props.navigation.navigate("Profile");
    } else {
      props.navigation.navigate("Sign In");
    }
  };
  const onMenuOpen = () => {
    setIsMenuVisible(true);
  };
  const onMenuDismiss = () => {
    setIsMenuVisible(false);
  };
  const onSetting = () => {
    props.navigation.navigate("Settings");
    setIsMenuVisible(false);
  };
  const onProfile = () => {
    props.navigation.navigate("Profile");
    setIsMenuVisible(false);
  };
  const onSignOut = () => {
    logout();
    setIsMenuVisible(false);
    props.navigation.navigate("Main");
  };
  return (
    <Appbar.Header
      style={{ backgroundColor: theme.c_1f242a }}
      statusBarHeight={5}
    >
      <Appbar.Content title={props.title} />
      <Appbar.Action
        icon="account-circle"
        onPress={onClick}
        color={theme.c_white}
      />

      <Menu
        visible={isMenuVisible}
        onDismiss={onMenuDismiss}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            color={theme.c_white}
            onPress={onMenuOpen}
          />
        }
      >
        <Menu.Item onPress={onSetting} title={language.Settings} />
        {user ? (
          <Menu.Item onPress={onProfile} title={language.Profile} />
        ) : null}
        {user ? <Divider /> : null}
        {user ? (
          <Menu.Item onPress={onSignOut} title={language.SignOut} />
        ) : null}
      </Menu>
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({});
export default MAppBar;
