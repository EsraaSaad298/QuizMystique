/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-native-paper';
import Introduction from './screens/Introduction';
import Start from './screens/Start';
import Quiz from './screens/Quiz';
import Result from './screens/Result';
import Types from './screens/Types';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createStackNavigator();

function App(): JSX.Element {
  const [personalityTraits, setTraits]: any = useState();

  async function getTraits(){
    try {
      const response = await fetch("http://45.32.40.220:3000/quizmystiquetraits", {
       method: "GET"
      });
      const data = await response.json();
      setTraits(data);
    } catch (error) {
      console.error('Error fetching readings:', error);
    }
  };

  useEffect(() => {
    getTraits();
  },[]);

  return (
    <Provider>
    {personalityTraits &&
    <NavigationContainer>
      <StatusBar backgroundColor={"black"} />
        <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}>
          {personalityTraits?.route == "" ?
            <>
              <Stack.Screen name='Introduction' component={Introduction} />
              <Stack.Screen name='Start' component={Start} />
              <Stack.Screen name='Quiz' component={Quiz} />
              <Stack.Screen name='Result' component={Result} />
            </>
            :
            <Stack.Screen name='Types' component={Types} initialParams={{personalities: personalityTraits?.route}} />
          }
        </Stack.Navigator>
    </NavigationContainer>
    }
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
