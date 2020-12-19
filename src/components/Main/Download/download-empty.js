import React from "react";
import {
  View,
  Text,
  Dimensions
} from "react-native";
import {Button} from 'react-native-paper'
const {width, height} = Dimensions.get("window");
const DownloadEmpty = (props) => {
  return (
    <View style={{flex:1, backgroundColor: "#0E0F13", justifyContent: 'center', alignItems:'center'}}>
      <Button style={{width: width * 0.8, backgroundColor:'#2384ae'}} onPress={props.onCheckNotEmpty}>
        <Text style={{color: 'white', textTransform: 'uppercase'}}>Find a course to learn</Text>
      </Button>
    </View>
  );
};

export default DownloadEmpty;
