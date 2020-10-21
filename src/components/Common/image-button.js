import React from 'react'
import {Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'

const ImageButton = (props) => {
    return <ImageBackground style={styles.button} source={{uri: 'https://th.bing.com/th/id/OIP.rv8UTbHAigbkqrZB1rKoHAHaEK?w=311&h=180&c=7&o=5&pid=1.7'}}>
        <TouchableOpacity
            style={styles.touch}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    </ImageBackground>
};
const styles = StyleSheet.create({
    button: {
        height: 100,
        margin: 5
    },
    touch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"
    },
    text: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
export default ImageButton;