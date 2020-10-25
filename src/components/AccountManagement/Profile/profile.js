import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import ProfileContentSecion from "./profile-content-section";
const {width, height} = Dimensions.get("window");
const Profile = (props) => {
  const sections = [{
    title: 'total active days',
    value: '0',
    subValue: '0 day streak'
  },{
    title: 'most active time of day',
    value: '7:00 AM',
    subValue: ''
  },{
    title: 'most viewed subject',
    value: 'N/A',
    subValue: ''
  },];
  const data = {
    firstName: "Dat",
    lastName: "Ho",
  }
  const createSections = () => {
    return sections.map((item) => <ProfileContentSecion key={item.title} title={item.title} value={item.value} subValue={item.subValue}/>);
  }

  return (
  <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../../../assets/bg.png")}
          style={styles.image}
        />
        <View style={styles.nameView}>
          <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
        </View>
      </View>
      <View style={{margin: 20}}>
        <Text style={styles.recentActivity}>Activity insights (last 30 days)</Text>
        {createSections()}
      </View>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
  },
  headerContainer: {
    flexDirection: 'row'
  },
  nameView: {flexDirection:'column', justifyContent: 'center', height: width * 0.15, marginTop: 20},
  name: {color:'white', fontSize: width * 0.05},
  image: {
    height: width * 0.15,
    width: width * 0.15,
    borderRadius: width * 0.075,
    margin: 20
  },
  recentActivity: {
    fontSize: 15,
    color: 'white',
    marginBottom: 20,
    marginTop: 20
  }
});
export default Profile;
