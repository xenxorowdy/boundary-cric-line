import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Boxes } from "./Carousel";

export default function BlockBox({ liveMatch }) {
  return (
    <View style={styles.blockLiveContainer}>
      {liveMatch?.map((e, index) => (
        <Boxes match={e} key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  blockLiveContainer: {
    gap: 20,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
});
