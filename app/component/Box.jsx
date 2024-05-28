import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Box = () => {
  return (
    <View className={styles.boxDiv}>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxDiv: {
    backgroundColor: "black",
    alignContent: "center",
    justifyContent: "center",
    width: "95%",
    height: "auto",
    minHeight: "10rem",
    color: "white",
    borderRadius: "18px",
  },
});
