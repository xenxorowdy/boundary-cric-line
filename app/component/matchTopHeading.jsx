import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const MatchTopHeading = ({ team_a_img, team_b_img, team_a, team_b }) => {
  console.log(team_a_img, team_b_img, team_a, team_b);
  return (

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
        backgroundColor: "#fff", paddingVertical: 14,
      }}
    >
      <View style={styles.infoTeam}>
        <Image
          source={{
            uri: team_a_img || "",
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 18,
            backgroundColor: "white",
            objectFit: "cover",
          }}
        />
        <Text style={styles.TextColor}>{team_a}</Text>
      </View>

      <AntDesign color="black" name="swap" size={20} />
      <View style={styles.infoTeam}>
        <Text style={styles.TextColor}>{team_b}</Text>
        <Image
          source={{
            uri: team_b_img,
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 18,
            backgroundColor: "white",
            objectFit: "cover",
          }}
        />
      </View>
    </View>
  );
};

export default MatchTopHeading;

const styles = StyleSheet.create({
  infoTeam: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 10,
  },
  TextColor: {
    color: "#000",
    fontSize: 13,
    flexWrap: "wrap",
  },
  TextHeading: {
    color: "#000",
    fontSize: 15,
  },
});
