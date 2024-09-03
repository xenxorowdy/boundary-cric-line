import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import MatchDetail from "../component/MatchDetail";

const Match = () => {

  const { id } = useLocalSearchParams();
  const idx = id.split("sep1s@-")[0];
  return (
    <LinearGradient colors={['#4682B4', '#444444']} style={styles.linearGradient}>
      {/* <StickyFooter /> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.scrollView} >
          <MatchDetail matchId={idx} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Match;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  scrollView: {

    height: "100%",

    // marginHorizontal: 20,
  },
  textScroll: {
    color: "#fff",
  },
});
