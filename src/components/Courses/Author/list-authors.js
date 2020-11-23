import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Button,
  SafeAreaView,
  Text,
  Dimensions,
  StatusBar,
} from "react-native";
import ListAuthorItem from "../../Main/Search/components/list-author-item";
const { width, height } = Dimensions.get("window");
const ListAuthors = ({ navigation, route }) => {
  const [authors, setAuthors] = useState(route.params.authors);
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);
  const onPressAuthor = (author) => {
    navigation.navigate("Author", { author: author });
  };
  const renderItems = (coursesList) => {
    return coursesList.map((item) => (
      <ListAuthorItem
        key={item.id.toString()}
        item={item}
        onPress={onPressAuthor}
      />
    ));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0F13" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0E0F13" />
      <ScrollView>{renderItems(authors)}</ScrollView>
    </SafeAreaView>
  );
};

export default ListAuthors;
