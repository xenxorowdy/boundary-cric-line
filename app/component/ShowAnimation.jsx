import { View, Text, Image, Platform } from "react-native";
import React, { useEffect } from "react";
import * as Speech from "expo-speech";
import { Audio } from 'expo-av';

const ShowAnimation = ({ style, value, runs = 0, mute }) => {
  // async function requestPermission() {
  //   if (Platform.OS === 'ios') {
  //     const { status } = await Audio.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('Sorry, we need permission to access your microphone.');
  //     }
  //   }
  // }
  // useEffect(() => {
  //   requestPermission();
  // }, [])

  switch (value?.toLowerCase()) {
    case "wicket":
      return <ShowAnimationValue display="Wicket" mute={mute} />;
    case "wides":
      return <ShowAnimationValue mute={mute} display="Wide" />;
    case "byes":
      return <ShowAnimationValue mute={mute} display="Bye" />;
    case "no ball":
      return <ShowAnimationValue mute={mute} display="No Ball" />;
    case "over":
      return <ShowAnimationValue mute={mute} display="Over Complete" />;
    case "ball":
      return <ShowAnimationValue mute={mute} display="Ball Start" />;
    case "run":
      return <ShowAnimationValue mute={mute} display={runs + " Run"} />;
    case "lbw":
      return <ShowAnimationValue mute={mute} display="LBW" />;
    case "out":
      return <ShowAnimationValue mute={mute} display="Out" />;
    case "four":
      return <ShowAnimationValue mute={mute} display="4" fontSize={80} />;
    case "six":
      return <ShowAnimationValue mute={mute} display="6" fontSize={80} />;
    default:
      return <ShowAnimationValue mute={mute} display={value > 0 ? value + " Run" : value} />;
  }
};



const ShowAnimationValue = ({ display = "", mute = false, fontSize = 24 }) => {

  const speak = async () => {

    Speech.speak(display, {
      language: "en-IN",
      pitch: 0.95,
      rate: 1.05,
    });
  };
  useEffect(() => {
    if (mute != 'false') speak();
  }, [display]);
  if (display === "undefined") return <view>
    <Text> _ </Text>
  </view>;
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {display.toLowerCase().includes('out') && !display.toLowerCase().includes('time') && !display.toLowerCase().includes('not') && !display.toLowerCase().includes('player') &&
        <Image
          source={require("../../assets/out.png")}
          style={{ width: 60, height: 60 }}
        />}
      {display.toLowerCase().includes("wide") &&
        <Image
          source={require("../../assets/wide.webp")}
          style={{ width: 60, height: 60 }}
        />}
      {display.toLowerCase().includes('wicket') &&
        <Image
          source={require("../../assets/Wicket.png")}
          style={{ width: 60, height: 60 }}
        />}
      {display.toLowerCase().includes('review') &&
        (
          <Image
            source={require("../../assets/umpire.svg")}
            style={{ width: 60, height: 60 }}
          />
        )

      }
      {display === "Ball Start" &&
        <Image
          source={require("../../assets/spinning_ball.gif")}
          style={{ width: 60, height: 60 }}
        />}
      <Text style={{ color: "#000", fontSize: fontSize, fontWeight: 700 }}>
        {display}
      </Text>
    </View>
  );
};

export default ShowAnimation;
