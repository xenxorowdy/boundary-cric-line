import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityComponent,
  View,
} from "react-native";
import React from "react";
import Table from "./Table";
import CollapseCustom from "./CollapeCustom";
import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";
import DialogScreen from "./DialogScreen";
import MatchTopHeading from "./matchTopHeading";
import { Link } from "expo-router";
import CusText from "./CusText";
const red = "#d32f2f";
const green = "#21DA8C";
const Info = ({ matchInfo, matchId }) => {
  const {
    match_date = "",
    match_time,
    place,
    venue,
    venue_weather,
    toss,
    man_of_match_player,
    match_type,
    result,
    team_a,
    team_b,
    head_to_head,
    umpire,
    team_a_short,
    team_b_short,
    third_umpire,
    referee,
    forms,
    team_comparison,
  } = matchInfo;
  return (
    <View style={styles.container}>
      <MatchTopHeading
        team_b_img={matchInfo.team_b_img}
        team_a_img={matchInfo.team_a_img}
        team_a={matchInfo.team_a_short}
        team_b={matchInfo.team_b_short}
      />

      {/* <Table />
      <CollapseCustom /> */}

      <View style={styles.box}>
        <Text style={styles.TextColor}>
          {" "}
          {match_date} {match_time}
        </Text>
        <Text style={styles.TextColor}> {toss}</Text>
        <Text style={styles.TextColor}> {venue}</Text>
      </View>
      <Text style={styles.TextHeading}> Umpire </Text>
      <View style={[styles.box]}>
        <View style={{ margin: 5, flexDirection: "row" }}>
          <Text style={[{ width: "35%", color: "#171717" }]}>umpires</Text>
          <Text style={[styles.TextColor, { width: "65%", fontWeight: 700 }]}>
            {umpire ?? "-"}
          </Text>
        </View>
        <View style={{ margin: 5, flexDirection: "row" }}>
          <Text style={[{ width: "35%", color: "#171717" }]}>Third Umpire</Text>
          <Text style={[styles.TextColor, { width: "65%", fontWeight: 700 }]}>
            {third_umpire ?? "-"}
          </Text>
        </View>
        <View style={{ margin: 5, flexDirection: "row" }}>
          <Text style={[{ width: "35%", color: "#171717" }]}>Referee</Text>
          <Text style={[styles.TextColor, { width: "65%", fontWeight: 700 }]}>
            {referee ?? "-"}
          </Text>
        </View>
      </View>
      <Text style={styles.TextHeading}> Team Squads </Text>
      <View style={styles.box}>
        <Link
          href={"/modal/" + matchId}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
          }}
        // onPress={() => navig÷ation.navigate("/setting")}
        >
          <Text style={styles.TextColor}> {team_a} </Text>
          <Entypo color="black" name="chevron-right" />
        </Link>
        <Link
          href={"/modal/" + matchId}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
          }}
        >
          <Text style={styles.TextColor}> {team_b} </Text>
          <Entypo color="black" name="chevron-right" />
        </Link>
      </View>
      <Text style={styles.TextHeading}>
        {" "}
        Recent Performance (Last 5 Matches){" "}
      </Text>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
            alignItems: "center",
          }}
        >
          <CusText> {team_a} </CusText>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {forms?.team_a?.map((text) => (
              <View
                style={{
                  borderWidth: 1,
                  margin: 3,
                  padding: 2,
                  backgroundColor: text === "W" ? green : red,
                  opacity: 0.8,
                  width: 25,
                  height: 25,
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <CusText
                  style={{ fontWeight: 800, color: "#171717", fontSize: 15 }}
                >
                  {" "}
                  {text}{" "}
                </CusText>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
            alignItems: "center",
          }}
        >
          <CusText> {team_b} </CusText>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {forms?.team_b?.map((text) => (
              <View
                style={{
                  borderWidth: 1,
                  margin: 3,
                  padding: 2,
                  backgroundColor: text === "W" ? green : red,
                  opacity: 0.8,
                  width: 25,
                  height: 25,
                  alignContent: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <CusText
                  style={{ fontWeight: 800, color: "#171717", fontSize: 15 }}
                >
                  {" "}
                  {text}{" "}
                </CusText>
              </View>
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.TextHeading}> Head to Head (H2H) </Text>
      <View
        style={[
          styles.box,
          { flexDirection: "row", justifyContent: "space-around" },
        ]}
      >
        <View style={styles.aligCenter}>
          <Text style={styles.TextColor}>
            {head_to_head?.matches?.length || 0}
          </Text>
          <Text style={styles.TextColor}>Last Match</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.aligCenter}>
          <Text style={styles.TextColor}>{head_to_head?.team_a_win_count}</Text>
          <Text style={styles.TextColor}>{team_a_short}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.aligCenter}>
          <Text style={styles.TextColor}>{head_to_head?.team_b_win_count}</Text>
          <Text style={styles.TextColor}>{team_b_short}</Text>
        </View>
      </View>
      <Text style={styles.TextHeading}> Venue Guide </Text>
      <View style={[styles.box]}>
        <View style={{ margin: 5, flexDirection: "row" }}>
          <Text style={[{ width: "35%", color: "#171717" }]}>Stadium</Text>
          <Text style={[styles.TextColor, { width: "65%", fontWeight: 700 }]}>
            {venue}
          </Text>
        </View>
        <View style={{ margin: 5, flexDirection: "row" }}>
          <Text style={[{ width: "35%", color: "#171717" }]}>City</Text>
          <Text style={[styles.TextColor, { width: "65%", fontWeight: 700 }]}>
            {place}
          </Text>
        </View>
        {/* <View style={{ margin: 5, flexDirection: "row" }}>
          <Text style={[{ width: "35%", color: "#171717" }]}>Capacity</Text>
          <Text style={[styles.TextColor, { width: "65%", fontWeight: 700 }]}>
            SL
          </Text>
        </View> */}
      </View>
      <Text style={styles.TextHeading}> Venue Weather </Text>
      <View style={styles.box}>
        {!venue_weather ? (
          <Text style={styles.TextHeading}>No Data Available</Text>
        ) : (
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: venue_weather?.weather_icon }}
              />
              <Text style={{ fontSize: 33, color: "#171717" }}>
                {venue_weather?.temp_c || ""}°C
              </Text>
            </View>

            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingVertical: 20,
                },
              ]}
            >
              <View style={styles.aligCenter}>
                <Fontisto name="rain" size={25} color={"#a6c8f5"} />
                <Text> Rain</Text>
                <Text style={styles.TextColor}> {venue_weather?.cloud}% </Text>
              </View>
              <View style={styles.aligCenter}>
                <Fontisto name="blood-drop" size={25} color={"#a6c8f5"} />
                <Text> Humidity</Text>
                <Text style={styles.TextColor}>
                  {" "}
                  {venue_weather?.humidity}%{" "}
                </Text>
              </View>
              <View style={styles.aligCenter}>
                <Fontisto name="wind" size={25} color={"#a6c8f5"} />

                <Text> Wind</Text>
                <Text style={styles.TextColor}>
                  {" "}
                  {venue_weather?.wind_kph}Km/h{" "}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <Text style={styles.TextHeading}> Team Comparison </Text>
      <View style={[styles.box, {}]}>
        <View
          style={{
            flexDirection: "row",
            gap: 40,
            alignItems: "center",
            margin: 10,
          }}
        >
          <CusText>{team_a_short}</CusText>
          <View
            style={[
              { flexDirection: "row", justifyContent: "space-around", gap: 15 },
            ]}
          >
            <View style={styles.aligCenter}>
              <Text style={styles.TextColor}>
                {team_comparison?.team_a_high_score}
              </Text>
              <Text style={styles.TextColor}> High Score </Text>
            </View>
            <View style={styles.aligCenter}>
              <Text style={styles.TextColor}>
                {team_comparison?.team_a_avg_score}
              </Text>
              <Text style={styles.TextColor}>AVG Score</Text>
            </View>
            <View style={styles.aligCenter}>
              <Text style={styles.TextColor}>
                {team_comparison?.team_a_win}
              </Text>
              <Text style={styles.TextColor}>Total Wins</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 40,
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <CusText>{team_b_short}</CusText>
          <View
            style={[
              { flexDirection: "row", justifyContent: "space-around", gap: 15 },
            ]}
          >
            <View style={styles.aligCenter}>
              <Text style={styles.TextColor}>
                {team_comparison?.team_b_high_score}
              </Text>
              <Text style={styles.TextColor}> High Score </Text>
            </View>
            <View style={styles.aligCenter}>
              <Text style={styles.TextColor}>
                {team_comparison?.team_b_avg_score}
              </Text>
              <Text style={styles.TextColor}>AVG Score</Text>
            </View>
            <View style={styles.aligCenter}>
              <Text style={styles.TextColor}>
                {team_comparison?.team_b_win}
              </Text>
              <Text style={styles.TextColor}>Total Wins</Text>
            </View>
          </View>
        </View>
      </View>
      <DialogScreen />
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  infoTeam: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 10,
  },
  TextColor: {
    color: "#171717",
    fontSize: 13,
    flexWrap: "wrap",
  },
  TextHeading: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  matchDetailsStyle: {},
  container: {

    flex: 1,
    minHeight: Dimensions.get("window").height,
    flexDirection: "column",
    gap: 15,
    margin: 5,
  },
  aligCenter: {
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  box: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: "column",
    gap: 10,
    borderWidth: 1,
  },
  divider: {
    borderWidth: 0.4,
    borderColor: "darkgrey",
    width: "100",
  },
});
