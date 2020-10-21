import React from 'react'
import {Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'

const SmallImageButton = (props) => {
    return <ImageBackground style={styles.button} source={{uri: 'https://th.bing.com/th/id/OIP.rv8UTbHAigbkqrZB1rKoHAHaEK?w=311&h=180&c=7&o=5&pid=1.7'}}>
        <TouchableOpacity
            style={styles.touch}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    </ImageBackground>
};
const styles = StyleSheet.create({
    button: {
        height: 50,
        margin: 5,
        width: 100
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
        textAlign: 'center',
        textTransform: "uppercase",
        width: "80%"
    }
});
export default SmallImageButton;