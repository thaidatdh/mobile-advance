import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import SmallImageButton from "../../../Common/small-image-button";

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

  const renderListItems = (category) => {
    return (
      <View key={category[0].id + "+"} style={{ margin: 5 }}>
        <SmallImageButton
          key={category[0].id}
          title={category[0].title}
          style={category[0].style}
        />
        {category.length > 1 ? (
          <SmallImageButton
            key={category[1].id}
            title={category[1].title}
            style={category[1].style}
          />
        ) : null}
      </View>
    );
  };
  var arrays = [];
  var size = 2;
  while (categoryList.length > 0) arrays.push(categoryList.splice(0, size));
  return (
    <View>
      <FlatList style={{paddingLeft: 10}}
        data={arrays}
        horizontal={true}
        renderItem={({ item, index }) => renderListItems(item)}
      />
    </View>
  );
};

export default SectionCategories;
