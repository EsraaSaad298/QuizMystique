import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, Dimensions } from 'react-native';
import { Appbar, Button, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library
import axios from 'axios';

export default function Quiz({ navigation, route }: any) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(50).fill(null));
  const [loading, setLoading] = useState(false);
  const questions = [
    "I feel like I am the life of the party.",
    "I always feel little concern for others.",
    "I am always prepared.",
    "I get stressed out easily.",
    "I have a rich vocabulary and I can talk to people easily.",
    "I don't talk a lot.",
    "I am interested in people and learning more about them.",
    "I like leaving my belongings around.",
    "I am relaxed most of the time.",
    "I have difficulty understanding abstract ideas.",
    "I feel comfortable around people.",
    "I insult people sometimes intentionally and sometimes unintentionally.",
    "I pay attention to details.",
    "I worry about things and they consume my thoughts.",
    "I have a vivid imagination.",
    "I usually blend in crowds and keep in the background.",
    "I sympathize with others' feelings.",
    "I make a mess of things.",
    "I seldom feel blue.",
    "I am not interested in abstract ideas.",
    "I love to initiate conversations.",
    "I am not interested in other people's problems.",
    "I don't procrasinate and get chores done right away.",
    "I am easily disturbed.",
    "I always have excellent ideas.",
    "I always have little to say.",
    "I feel like i have a soft heart.",
    "I often forget to put things back in their proper place.",
    "I get upset or offended easily.",
    "I do not have a good imagination.",
    "I love to socialize and talk to a lot of different people at parties.",
    "I am not really interested in others.",
    "I like order and systems.",
    "I am moody and can change my mood a lot.",
    "I am quick to understand things.",
    "I don't like to draw attention to myself.",
    "Take time out for others.",
    "I shirk my duties.",
    "I have frequent mood swings.",
    "I like to use difficult words in conversations or work.",
    "I don't mind being the center of attention.",
    "I am empathetic and feel others' emotions.",
    "I love to follow a schedule.",
    "I get irritated easily.",
    "I like to spend time reflecting on things.",
    "I am quiet around strangers but not so quiet around friends or family.",
    "I love to make people feel at ease.",
    "I am exacting in my work.",
    "I often feel blue.",
    "I am almost always full of ideas."
];

  const answers = [
    {
      id: 1,
      text: "Disagree",
    },
    {
      id: 2,
      text: "Slightly disagree",
    },
    {
      id: 3,
      text: "Neutral",
    },
    {
      id: 4,
      text: "Slightly agree",
    },
    {
      id: 5,
      text: "Agree",
    },
  ];

  const handleAnswerSelection = (questionIndex: any, answerId: any) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[questionIndex] = answerId;
      return newSelectedAnswers;
    });
  };

  const handleGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderAnswers = (questionIndex: any) => {
    return answers.map((answer) => (
      <View key={answer.id} style={styles.answerOption}>
        <Checkbox.Item
          status={selectedAnswers[questionIndex] === answer.id ? 'checked' : 'unchecked'}
          label={answer.text}
          labelStyle={{ color: "#e7e7e6" }}
          onPress={() => handleAnswerSelection(questionIndex, answer.id)}
        />
      </View>
    ));
  };

  const answerData = selectedAnswers.reduce((acc, answer, index) => {
    acc[index + 1] = answer; // The "+1" ensures that answer IDs start from 1
    return acc;
  }, {})

  async function getResult(){
    setLoading(true);
    const answers = answerData;
    const options = {
    method: 'POST',
    url: 'https://big-five-personality-test.p.rapidapi.com/submit',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '6d849a234emsh377f8ce1838a70bp1fabe7jsn53ce6014ce53',
        'X-RapidAPI-Host': 'big-five-personality-test.p.rapidapi.com'
    },
    data: {
        answers: answers
    }
    };

    try {
        await axios.request(options).then((response) => {
            setLoading(false);
            navigation.navigate("Result", {result: response.data});
        })
    } catch (error) {
        console.error(error);
    }
  }

  const renderQuizContent = () => {
    return (
      <View>
        <Image source={require("../assets/question_marks.png")} style={{ width: 250, height: 200, alignSelf: "center", marginTop: 20 }} resizeMode='contain' />
        <Text style={styles.questionText}>Statement {currentQuestion + 1}:</Text>
        <Text style={styles.questionText}>{questions[currentQuestion]}</Text>
        {renderAnswers(currentQuestion)}
        <Button
          mode="contained"
          style={{ alignSelf: "center", padding: 8, marginTop: 10 }}
          disabled={selectedAnswers[currentQuestion] === null}
          onPress={() => {
            if (currentQuestion <= 49) {
              setCurrentQuestion(currentQuestion + 1);
            }
          }}
        >
          Next Question
        </Button>
        {currentQuestion > 0 && (
          <Button
            icon={() => <Icon name="chevron-left" size={20} color="white" />} // Use your preferred icon
            style={{ alignSelf: "center", padding: 8, marginTop: 10 }}
            onPress={handleGoBack}
          >
            Back
          </Button>
        )}
      </View>
    );
  };

  const renderResultButton = () => {
    return (
      <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <Text style={styles.title}>Your results are ready!</Text>
        <Button
            mode="contained"
            loading={loading}
            style={{padding: 5, marginTop: 30}}
            onPress={() => {
                getResult()
            }}
        >
            View Result!
        </Button>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {currentQuestion <= 49
          ? renderQuizContent()
          : renderResultButton()}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    color: "white",
    fontWeight: "600",
    width: Dimensions.get("screen").width * 0.90,
    alignSelf: "center"
  },
  answerOption: {
    marginVertical: 5
  },
  title:{
    fontWeight: "600", 
    fontSize: 22, 
    color: "white",
    textAlign: "center",
  },
});
