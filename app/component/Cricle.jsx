import React from "react";
import { StyleSheet, View } from "react-native";

const Circle = (props) => {
  return (
    <View style={props.data == props.selected ? styles.blue : styles.circle} />
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  blue: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "blue",
  },
});

export default Circle;
