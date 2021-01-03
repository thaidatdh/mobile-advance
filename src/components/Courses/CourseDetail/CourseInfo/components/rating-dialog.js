import * as React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  RadioButton,
  TextInput,
} from "react-native-paper";

const RatingDialog = (props) => {
  const [checkedFormality, setCheckedFormality] = React.useState(1);
  const [checkedPresentation, setCheckedPresentation] = React.useState(1);
  const [checkedContent, setCheckedContent] = React.useState(1);
  const [content, setContent] = React.useState("");
  const RatingPart = [
    {
      title: "Formality",
      action: setCheckedFormality,
      value: () => {
        return checkedFormality;
      },
    },
    {
      title: "Presentation",
      action: setCheckedPresentation,
      value: () => {
        return checkedPresentation;
      },
    },
    {
      title: "Content",
      action: setCheckedContent,
      value: () => {
        return checkedContent;
      },
    },
  ];
  const themeTextInput = {
    colors: {
      placeholder: "#b4b5ba",
      text: "white",
      primary: "#2384ae",
      underlineColor: "#2384ae",
      background: "#1f242a",
    },
  };
  const resetValue = () => {
    setCheckedContent(1);
    setCheckedFormality(1);
    setCheckedPresentation(1);
    setContent("");
  }
  const onSave = () => {
    props.onSave(checkedFormality, checkedPresentation, checkedContent, content);
    resetValue();
    props.hideDialog();
  }
  const onHide = () => {
    props.hideDialog();
    resetValue();
  }
  return (
    <Portal>
      <Dialog
        visible={props.visible}
        onDismiss={onHide}
        style={styles.container}
      >
        <Dialog.Title style={styles.text}>Rating</Dialog.Title>
        <Dialog.Content>
          <ScrollView>
            {RatingPart.map((part) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
                key={part.title}
              >
                <Text style={styles.textTitle}>{part.title}</Text>
                {[1, 2, 3, 4, 5].map((n) => (
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                    key={part.title + n.toString()}
                  >
                    <RadioButton
                      value={n}
                      status={part.value() === n ? "checked" : "unchecked"}
                      onPress={() => part.action(n)}
                    />
                    <Text style={styles.text}>{n}</Text>
                  </View>
                ))}
              </View>
            ))}
            <ScrollView
              key="commentView"
              contentContainerStyle={styles.inputView}
            >
              <TextInput
                key="comment"
                name="content"
                style={styles.input}
                label="Comment"
                theme={themeTextInput}
                multiline
                mode="outlined"
                numberOfLines={9}
                onChangeText={(text) => setContent(text)}
                value={content}
                editable
                maxLength={100}
              />
            </ScrollView>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onSave} style={styles.saveButton}>
            Rate
          </Button>
          <Button onPress={onHide}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1f242a",
  },
  text: {
    color: "white",
  },
  textTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    width: 120,
  },
  saveButton: {
    marginRight: 20,
  },
  input: {
    color: "white",
  },
  inputView: {
    height: 200
  },

});
export default RatingDialog;
