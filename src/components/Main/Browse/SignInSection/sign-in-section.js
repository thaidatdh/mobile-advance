import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'
import { Button } from 'react-native-paper';
import { SettingContext } from "../../../../Contexts/SettingContextProvider";
const {width, height} = Dimensions.get("window");

const SignInSection = (props) => {
  const { theme } = React.useContext(SettingContext);
   if (props.isSignedIn) {
      return <View/>
   }

   return (
     <View
       style={{
         ...styles.container,
         backgroundColor: theme.c_0E0F13,
         color: theme.c_white,
       }}
     >
       <View style={{ width: width * 0.7 }}>
         <Text style={{ ...styles.textBold, color: theme.c_white }}>
           Sign in to skill up today
         </Text>
         <Text style={{ ...styles.text, color: theme.c_white }}>
           Keep your skill up-to-date with access to thousands of courses by
           industry experts.
         </Text>
       </View>

       <Button style={styles.signInBtn} onPress={() => props.onPress()}>
         <Text style={styles.buttonText}>sign in to start watching</Text>
       </Button>
     </View>
   );
}
const styles = StyleSheet.create({
    container: {
      flex:1, 
      backgroundColor: '#0E0F13',
      color: 'white',
      width: width* 0.8,
      margin: 20,
      alignSelf: "center",
      marginBottom: 10,
      marginTop: 30
    },
    text: {
       color: 'white',
    },
    textBold: {
      color: 'white',
      //fontWeight: 'bold',
      fontSize: 20
   },
   
    signInBtn:{
      width:width*0.8,
      backgroundColor:"#2384ae",
      borderRadius:5,
      /*height: height * 0.01,*/
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      marginBottom:30,
    },
    buttonText:{
      color:"white",
      fontSize:12,
      textTransform: "uppercase",
      fontWeight: "bold"
    },
  });
export default SignInSection;