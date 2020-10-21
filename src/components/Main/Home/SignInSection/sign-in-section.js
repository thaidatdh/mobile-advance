import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

const SignInSection = (props) => {
   if (props.isSignedIn) {
      return <View/>
   }

   return <View style={styles.container}>
      <Text style={styles.textBold}>Sign in to skill up today</Text>
      <Text style={styles.text}>Keep your skill up-to-date with access to thousands of courses by industry experts.</Text>
      <TouchableOpacity style={styles.signInBtn}>
        <Text style={styles.buttonText}>sign in to start watching</Text>
      </TouchableOpacity>
   </View>
}
const styles = StyleSheet.create({
    container: {
      flex:1, 
      backgroundColor: '#0E0F13',
      color: 'white',
      height: 100,
      width: "80%",
      margin: 20,
      alignSelf: "center"
    },
    text: {
       color: 'white',
       width: "80%"
    },
    textBold: {
      color: 'white',
      //fontWeight: 'bold',
      fontSize: 18
   },
   
    signInBtn:{
      width:"100%",
      backgroundColor:"#2384ae",
      borderRadius:5,
      height:30,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginBottom:20,
    },
    buttonText:{
      color:"white",
      fontSize:11,
      textTransform: "uppercase",
      fontWeight: "bold"
    },
  });
export default SignInSection;