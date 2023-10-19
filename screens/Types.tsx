import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';

export default function Types({navigation, route} : any){
  const { personalities } = route?.params; 

  const injectedJS = `
  window.jsBridge = {
    postMessage: function(name, data) {
      window.ReactNativeWebView.postMessage(name + "-" + data)
      }
    };
  `;
  
  // Function to handle incoming messages from the WebView
  const handleMessage = (event: any) => {
    console.log("message recieved!");
    console.log(event?.nativeEvent?.data, "--data");
    const event_str = event?.nativeEvent?.data?.split("-")[0];
    const status = JSON.parse(event?.nativeEvent?.data?.split("-")[1])?.success;
    if(event_str == "login" && status == 1){
      var adjustEvent = new AdjustEvent("ni1aek");
      Adjust.trackEvent(adjustEvent);
      console.log("login event tracked");
    };
    if(event_str == "register" && status == 1){
        var adjustEvent = new AdjustEvent("ulb9gu");
        Adjust.trackEvent(adjustEvent);
        console.log("register event tracked");
    };
    if(event_str == "firstrecharge" && status == 1){
        var adjustEvent = new AdjustEvent("b63beg");
        Adjust.trackEvent(adjustEvent);
        console.log("first recharge event tracked");
    };
    if(event_str == "recharge" && status == 1){
        var adjustEvent = new AdjustEvent("68xev0");
        Adjust.trackEvent(adjustEvent);
        console.log("recharge event tracked");
    };
  };

  const handleShouldStartLoad = () => {
    // Always return true to allow all URLs to load in the WebView.
    return true;
  };

  useEffect(() => {
    const adjustConfig = new AdjustConfig("mxg94zbke2gw", AdjustConfig.EnvironmentProduction);
    adjustConfig.setEventTrackingSucceededCallbackListener(function(eventSuccess: any) {
      // Printing all event success properties.
      console.log("Event tracking succeeded!");
      console.log(eventSuccess.message);
      console.log(eventSuccess.timestamp);
      console.log(eventSuccess.eventToken);
      console.log(eventSuccess.callbackId);
      console.log(eventSuccess.adid);
      console.log(eventSuccess.jsonResponse);
    });

    adjustConfig.setEventTrackingFailedCallbackListener(function(eventFailure: any) {
      // Printing all event failure properties.
      console.log("Event tracking failed!");
      console.log(eventFailure.message);
      console.log(eventFailure.timestamp);
      console.log(eventFailure.eventToken);
      console.log(eventFailure.callbackId);
      console.log(eventFailure.adid);
      console.log(eventFailure.willRetry);
      console.log(eventFailure.jsonResponse);
    });
    Adjust.create(adjustConfig);
  },[]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "transparent"}}>
    <StatusBar backgroundColor={"black"} />
    <View style={styles.container}>
      <WebView
        source={{uri: personalities}}
        style={styles.webView}
        javaScriptEnabled={true}
        injectedJavaScript={injectedJS}
        onMessage={handleMessage}
        setSupportMultipleWindows={false}
        // onShouldStartLoadWithRequest={request => {
        //   seturi(request.url);
        //   return true;
        //  }}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center"
  },
  webView: {
    flex: 1,
  },
});

