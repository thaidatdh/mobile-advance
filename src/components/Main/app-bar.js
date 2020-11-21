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
const MAppBar = (props) => {
  const { user, logout } = React.useContext(AuthContext);
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
    <Appbar.Header style={{ backgroundColor: "#1f242a" }}>
      <Appbar.Content title={props.title} />
      <Appbar.Action icon="account-circle" onPress={onClick} color="white" />
      {user ? (
        <Menu
          visible={isMenuVisible}
          onDismiss={onMenuDismiss}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="white"
              onPress={onMenuOpen}
            />
          }
        >
          <Menu.Item onPress={onSetting} title="Settings" />
          <Menu.Item onPress={onProfile} title="Profile" />
          <Divider />
          <Menu.Item onPress={onSignOut} title="Sign Out" />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
    marginRight: 20,
    alignItems: "center",
  },
  rounded: {
    backgroundColor: "gray",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MAppBar;
