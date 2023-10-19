import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

export default function Introduction({navigation, route}: any){
    return(
        <ImageBackground
        source={require("../assets/background.png")}
        style={{flex: 1}}>
             <View style={styles.container}>
                <Image source={require("../assets/faces.png")} style={styles.image} resizeMode='contain' />
                <Text style={styles.title}>Welcome to your personality quiz.</Text>
                <Text style={styles.subtitle}>Ready to Uncover Your True Self?</Text>
                <Button mode='contained-tonal' style={styles.button} 
                    onPress={() => {
                        navigation.navigate("Start")
                    }}
                >
                    Let's Go
                </Button>
            </View>
        </ImageBackground>
    )
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image:{
        width: Dimensions.get("screen").width * 0.90, 
        height: Dimensions.get("screen").width * 0.50, 
        alignSelf: "center"
    },
    title:{
        fontWeight: "600", 
        fontSize: 20, 
        color: "white",
        textAlign: "center",
        marginTop: 30
    },
    subtitle:{
        fontSize: 17, 
        color: "white",
        textAlign: "center",
        marginTop: 10
    },
    button:{
        backgroundColor: "#2596be", 
        alignSelf: "center", 
        padding: 5,
        marginTop: 50
    }
});