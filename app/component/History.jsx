import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MatchTopHeading from "./matchTopHeading";
import CollapseCustom from "./CollapeCustom";
import CusText from "./CusText";

const inningOption = ["1st INNING", "2nd INNING"];

const HistoryComponet = ({}) => {
  const [inning, setInning] = useState(0);
  const handleInning = (key) => setInning(key);
  return (
    <View style={{ gap: 5 }}>
      <MatchTopHeading />
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}>
        {inningOption.map((item, key) => (
          <Button
            key={key}
            title={item}
            color={inning === key ? "#ADD8E6" : "#fcfffd"}
            onPress={() => handleInning(key)}
          />
        ))}
      </View>

      <CollapseCustom></CollapseCustom>
    </View>
  );
};

export default HistoryComponet;

const styles = StyleSheet.create({});
