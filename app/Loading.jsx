import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Image } from "react-native-svg";

const Loading = () => (
  <View style={styles.container}>
    <LottieView
      style={{ width: 200, height: 200 }}
      source={require("../assets/loading.json")}
      autoPlay
      loop
    />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    height: Dimensions.get("screen").height,
  },
});
