import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, Alert } from 'react-native';
import { Appbar, Card, ProgressBar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Result({ navigation, route }: any) {
  const { result } = route?.params;

  const save = async() => {
    await AsyncStorage.setItem("result", JSON.stringify(result));
    Alert.alert("Result saved!");
  };

  return (
    <ImageBackground source={require("../assets/background.png")} style={{ flex: 1 }}>
      <Image source={require("../assets/settings.png")} style={styles.image} resizeMode='contain' />
      <Text style={{fontSize: 19, color: "white", fontWeight: "bold", textAlign: "center"}}>Your personality breakdown:</Text>
      <ScrollView style={styles.container}>
        {Object.entries(result).map(([key, value]: any) => (
        key !== "report_id" &&
          <Card key={key} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>{key}</Text>
              <Text style={styles.description}>{value.description}</Text>
              <Text style={styles.points}>
                Points: {value.points} / {value.total_points}
              </Text>
              <Text style={styles.points}>
                Percentage: {parseFloat((value.percentage)).toFixed(0)}%
              </Text>
              <Text style={styles.yourType}>Your Type: {value.your_type}</Text>
              <ProgressBar
                progress={parseFloat((value.percentage / 100).toFixed(1))}
                color="#6200EA"
                style={styles.progressBar}
               />
            </Card.Content>
          </Card>
        ))}

        <View style={styles.buttonsView}>
            <Button
                mode="contained"
                style={{ alignSelf: "center", padding: 8, marginVertical: 15 }}
                onPress={() => {
                    save()
                }}
            >
            Save Result
            </Button>

            <Button
                mode="contained-tonal"
                style={{ alignSelf: "center", padding: 8, marginVertical: 15 }}
                onPress={() => {
                    navigation.navigate("Start")
                }}
            >
            Repeat Quiz
            </Button>
        </View> 

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  image:{
    width: 100, 
    height: 100, 
    alignSelf: "center"
  },
  card: {
    margin: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: "black"
  },
  description: {
    marginBottom: 8,
    color: "black"
  },
  points: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "#e6005c"
  },
  yourType: {
    marginBottom: 8,
    fontWeight: "bold"
  },
  progressBar: {
    height: 10,
    marginVertical: 8,
  },
  buttonsView:{
    flexDirection: "row", 
    alignItems: "center",
    width: "95%", 
    alignSelf: "center", 
    justifyContent: "space-around"
  }
});
