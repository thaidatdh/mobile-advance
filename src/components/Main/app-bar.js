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
  const { user } = React.useContext(AuthContext);
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
  return (
    <Appbar.Header style={{ backgroundColor: "#1f242a" }}>
      <Appbar.Content title={props.title} />
      <Appbar.Action icon="account-circle" onPress={onClick} color="white" />
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
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
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
