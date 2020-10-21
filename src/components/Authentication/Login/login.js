import React, { useState } from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import SectionCourseItem from '../../Main/Home/SectionCourseItem/section-course-item';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  
  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  }

    return (
    <View style={styles.container}>
    <View style={{margin: 20}}/>
      <View style={usernameFocus ? styles.inputViewFocus : styles.inputView}>
        <TextInput name="username" style={styles.input}
            placeholder="Username (or Email)"
            placeholderTextColor="#b4b5ba"
            value={username}
            onChangeText={text => setUsername(text)}
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
          />
      </View>
      <View style={passwordFocus ? styles.inputViewFocus : styles.inputView}>
        <TextInput name="password" style={styles.input}
          placeholder="Password"
          placeholderTextColor="#b4b5ba"
          secureTextEntry={secureTextEntry ? true : false}
          value={password}
          onChangeText={text => setPassword(text)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <TouchableOpacity style={{justifyContent: 'center', margin: 10}}
                    onPress={updateSecureTextEntry}
                >
                    {secureTextEntry ? 
                    <FontAwesome5
                        name="eye-slash"
                        color="grey"
                        size={20}
                        solid
                    />
                    :
                    <FontAwesome5
                        name="eye"
                        color="grey"
                        size={20}
                        solid
                    />
                    }
                </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signInBtn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkBtn}>
          <Text style={styles.buttonTextBlue}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOnSSOBtn}>
        <Text style={styles.buttonTextBlue}>Use Single Sign-On (SSO)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkBtn}>
        <Text style={styles.buttonTextBlue}>Sign up FREE</Text>
      </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: '#0E0F13',
    alignItems: 'center',
    /*justifyContent: 'center',*/
  },
  inputView: {
    width:"80%",
    backgroundColor:"#1f242a",
    borderRadius:5,
    height:60,
    marginBottom:20,
    justifyContent:"center",
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  inputViewFocus: {
    width:"80%",
    backgroundColor:"#1f242a",
    borderRadius:5,
    height:60,
    marginBottom:20,
    justifyContent:"center",
    borderBottomColor: "#2384ae",
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    width: "100%",
    height:"100%",
    color:"white",
    padding: 10
  },
  buttonText:{
    color:"white",
    fontSize:11,
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  buttonTextBlue:{
    color:"white",
    fontSize:11,
    textTransform: "uppercase",
    color: "#2384ae",
    fontWeight: "bold"
  },
  signInBtn:{
    width:"80%",
    backgroundColor:"#2b2c30",
    color: "#818286",
    borderRadius:5,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:20,
  },
  signOnSSOBtn:{
    width:"80%",
    backgroundColor:"#0E0F13",
    borderRadius:5,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderColor: "#2384ae",
    borderWidth: 2,
    marginBottom:10,
  },
  linkBtn:{
    width:"80%",
    borderRadius:5,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
  },
});

export default Login;