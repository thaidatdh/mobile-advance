import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SectionAuthorItem from "./SectionAuthorItem/section-author-item";
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
const SectionAuthor = (props) => {
  const { theme, language } = React.useContext(SettingContext);
  const [authors] = useState(props.authors);
  const onPressAuthor = (author) => {
    props.navigation.navigate("Author", { author: author });
  };
  const onPressSeeAll = () => {
    props.navigation.navigate("List Authors", { authors: authors, title: language.Instructors });
  };
  const renderListItems = (tags) => {
    if (Promise.resolve(tags) == tags) {
      return null;
    }
    return tags.map((item) => (
      <SectionAuthorItem
        key={item.id}
        author={item}
        onPress={onPressAuthor}
      />
    ));
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ ...styles.titleText, color: theme.c_white }}>
          {props.title}
        </Text>
        <TouchableOpacity onPress={onPressSeeAll}>
          <Text style={{ ...styles.titleTextAll, color: theme.c_lightgray }}>
            {language.SeeAll}{" "}
            <FontAwesome5
              name={"angle-right"}
              color={theme.c_lightgray}
              size={10}
            />
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ paddingLeft: 10 }} horizontal={true}>
        {renderListItems(authors)}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  titleText: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
    fontSize: 16,
    color: "white",
  },
  titleTextAll: {
    marginRight: 15,
    marginBottom: 5,
    marginTop: 10,
    fontSize: 10,
    color: "white",
  },
});
export default SectionAuthor;
