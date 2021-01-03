import React, { useContext, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../../../../Contexts/AuthContextProvider";
import ApiServices from "../../../../../services/api-services";
const { width, height } = Dimensions.get("window");

const RatingSubsection = (props) => {
  const { token } = useContext(AuthContext);
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
              backgroundColor: "#1f242a",
              borderBottomWidth: 3,
              borderColor: "#394249",
              width: width * 0.2,
              height: height * 0.08,
              maxWidth: 100,
              maxHeight: 90,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 20, alignSelf: "center" }}>
              {props.item.averagePoint.toFixed(1)}
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              width: width * 0.7,
              paddingLeft: 20,
              alignSelf: "center",
            }}
          >
            {props.item.user.name + " (" + props.item.user.type + ")"}
          </Text>
        </View>
      </View>
      <View style={{ width: width * 0.9 }}>
        <View
          key={props.item.userId + props.item.id + "_1"}
          style={styles.item}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "gray",
                borderRadius: 10,
                height: 10,
                width: 10,
                marginRight: 10,
              }}
            ></View>
            <Text style={{ color: "white" }}>Presentation Point</Text>
          </View>
          <Text style={{ color: "white" }}>{props.item.presentationPoint}</Text>
        </View>
        <View
          key={props.item.userId + props.item.id + "_2"}
          style={styles.item}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "gray",
                borderRadius: 10,
                height: 10,
                width: 10,
                marginRight: 10,
              }}
            ></View>
            <Text style={{ color: "white" }}>Content Point</Text>
          </View>
          <Text style={{ color: "white" }}>{props.item.contentPoint}</Text>
        </View>
        <View
          key={props.item.userId + props.item.id + "_3"}
          style={styles.item}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "gray",
                borderRadius: 10,
                height: 10,
                width: 10,
                marginRight: 10,
              }}
            ></View>
            <Text style={{ color: "white" }}>Formality Point</Text>
          </View>
          <Text style={{ color: "white" }}>{props.item.formalityPoint}</Text>
        </View>
        <View
          key={props.item.userId + props.item.id + "_0"}
          style={styles.item}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "white" }}>{props.item.content}</Text>
          </View>
        </View>
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

export default RatingSubsection;
