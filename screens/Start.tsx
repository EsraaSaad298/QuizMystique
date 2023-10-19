import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Start({ navigation, route }: any) {
  const [result, setResult] = useState();

  const getResult = async () => {
    const res = await AsyncStorage.getItem("result");
    if (res !== null) {
      setResult(JSON.parse(res));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
        getResult();
    }, [])
  );

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Image source={require("../assets/face.png")} style={styles.image} resizeMode='contain' />
          <Text style={styles.title}>We will present you with a series of 50 statements.</Text>
          <Text style={styles.subtitle}>Choose the answer that you feel is more "you".</Text>
          <Text style={styles.text}>Once the test is completed, an analysis of your personality in different aspects will be ready!</Text>
          <Button mode='contained-tonal' style={styles.button}
            onPress={() => {
              navigation.navigate("Quiz")
            }}
          >
            Start!
          </Button>
          {result &&
            <>
              <Text style={[styles.text, { color: "white", marginTop: 60 }]}>This quiz was taken before and a result was saved!</Text>
              <Button mode='contained-tonal' style={styles.resultButton}
                onPress={() => {
                  navigation.navigate("Result", { result: result })
                }}
              >
                View Saved Result
              </Button>
            </>
          }
        </View>
      </ScrollView>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: Dimensions.get("screen").width * 0.9, // Adjust the width as needed
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 80,
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2596be",
    alignSelf: "center",
    padding: 5,
    marginTop: 50,
  },
  resultButton: {
    backgroundColor: "#2596be",
    alignSelf: "center",
    padding: 5,
    marginTop: 20,
  },
});
