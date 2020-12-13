import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SmallImageButton from "../../../Common/small-image-button";
import { DataContext} from "../../../../Contexts/DataContextProvider"
const SectionCategories = (props) => {
  const categoryList = [
    {
      id: 1,
      title: ["Conferences"],
      style: [
        {
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
        },
      ],
    },
    {
      id: 2,
      title: ["Certification"],
      style: [
        {
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
        },
      ],
    },
    {
      id: 3,
      title: ["<Software>", "Development"],
      style: [
        {
          textAlign: "center",
          fontSize: 24,
          color: "white",
          fontWeight: "bold",
        },
        {
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 13,
          color: "white",
        },
      ],
    },
    {
      id: 4,
      title: ["IT", "ops"],
      style: [
        {
          textAlign: "center",
          fontSize: 28,
          color: "white",
          textTransform: "uppercase",
          fontWeight: "bold",
        },
        {
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 16,
          color: "white",
        },
      ],
    },
    {
      id: 5,
      title: ["Information", "and", "Cyber security"],
      style: [
        {
          textAlign: "center",
          fontSize: 16,
          color: "white",
          fontWeight: "bold",
        },
        {
          textAlign: "center",
          fontSize: 13,
          color: "white",
          textTransform: "uppercase",
        },
        {
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 16,
          color: "white",
          fontWeight: "bold",
        },
      ],
    },
    {
      id: 6,
      title: ["Data", "Professional"],
      style: [
        {
          textAlign: "center",
          fontSize: 24,
          color: "white",
          textTransform: "uppercase",
          fontWeight: "bold",
        },
        {
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 16,
          color: "white",
        },
      ],
    },
    {
      id: 7,
      title: ["Business", "Professional"],
      style: [
        {
          textAlign: "center",
          fontSize: 24,
          color: "white",
          textTransform: "uppercase",
          fontWeight: "bold",
        },
        {
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 16,
          color: "white",
        },
      ],
    },
    {
      id: 8,
      title: ["Creative", "Professional"],
      style: [
        {
          textAlign: "center",
          fontSize: 24,
          color: "white",
          textTransform: "uppercase",
          fontWeight: "bold",
        },
        {
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 16,
          color: "white",
        },
      ],
    },
    {
      id: 9,
      title: ["Manufacturing", "and", "Design"],
      style: [
        {
          textAlign: "center",
          fontSize: 12,
          color: "white",
          textTransform: "uppercase",
          fontWeight: "bold",
        },
        {
          textAlign: "center",
          fontSize: 10,
          color: "white",
          textTransform: "uppercase",
        },
        {
          textAlign: "center",
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
        },
      ],
    },
    {
      id: 10,
      title: ["Architechture", "and", "Construction"],
      style: [
        {
          textAlign: "center",
          fontSize: 15,
          color: "white",
          textTransform: "uppercase",
          fontWeight: "bold",
        },
        {
          textAlign: "center",
          fontSize: 10,
          color: "white",
          textTransform: "uppercase",
        },
        {
          textAlign: "center",
          fontSize: 12,
          color: "white",
          fontWeight: "bold",
          textTransform: "uppercase",
        },
      ],
    },
  ];
  const { categories, loadCategories } = React.useContext(DataContext);
  useEffect(() => {
    const loadData = async () => {
      await loadCategories();
    };
    loadData();
  },[]);
  const renderItem = (category) => {
    const keyValue = category[0].id + "key";
    return (
      <View key={keyValue} style={{ margin: 10 }}>
        <SmallImageButton
          key={category[0].id}
          title={category[0].name}
          onPress={() => props.onPress(category[0].name, category[0].id)}
        />
        {category.length > 1 ? (
          <SmallImageButton
            key={category[1].id}
            title={category[1].name}
            onPress={() => props.onPress(category[1].name, category[1].id)}
          />
        ) : null}
      </View>
    );
  };
  const renderListItems = (list) => {
    return list.map(item => renderItem(item));
  }
  let arrays = [];
  let size = 2;
  let temp = categories.slice();
  while (temp.length > 0) arrays.push(temp.splice(0, size));
  return (
    <View>
      <ScrollView horizontal={true}>
        {renderListItems(arrays)}
      </ScrollView>
    </View>
  );
};

export default SectionCategories;
