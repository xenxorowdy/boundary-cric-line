import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CollapseCustom from "./CollapeCustom";
import { AntDesign } from "@expo/vector-icons";
import CusText from "./CusText";
import MatchTopHeading from "./matchTopHeading";

const ScoreBoard = ({ matchScoreBoard, matchInfo }) => {
  const [result, setResult] = useState();
  const [team1, setTem1] = useState([]);
  const [team2, setTem2] = useState([]);
  const [team1Score, setTeam1Score] = useState([]);
  const [team2Score, setTeam2Score] = useState([]);
  useEffect(() => {
    setTem1(matchScoreBoard?.scorecard?.[1]?.team);
    setTem2(matchScoreBoard?.scorecard?.[2]?.team);
    setTeam1Score(matchScoreBoard?.scorecard?.[1]);
    setTeam2Score(matchScoreBoard?.scorecard?.[2]);
    setResult(matchScoreBoard?.result)
  }, [matchScoreBoard]);
  return (
    <View style={{ flexDirection: "column", gap: 15, padding: 8 }}>
      <MatchTopHeading
        team_b_img={matchInfo.team_b_img}
        team_a_img={matchInfo.team_a_img}
        team_a={matchInfo.team_a_short}
        team_b={matchInfo.team_b_short}
      />
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignItems: "center",
          backgroundColor: "#800000", paddingVertical: 14,
        }}
      >
        <View style={styles.infoTeam}>
          <Image
            source={{
              uri: team1?.flag,
            }}
            style={{ width: 30, height: 30, borderRadius: 18 }}
          />
          <Text style={styles.TextColor}>{team1?.short_name}</Text>
        </View>

        <AntDesign color="white" name="swap" size={20} />
        <View style={styles.infoTeam}>
          <Text style={styles.TextColor}>{team2?.short_name}</Text>
          <Image
            source={{
              uri: team2?.flag,
            }}
            style={{ width: 30, height: 30, borderRadius: 18 }}
          />
        </View>
      </View> */}
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}> {result}</Text>
      {team1 &&
        <CollapseCustom team={team1} >
          <ScoreBoradTable
            team={team1}
            batsman={team1Score?.batsman}
            bowler={team1Score?.bolwer}
            fallwicket={team1Score?.fallwicket}
          />
        </CollapseCustom>
      }
      {team2 &&
        <CollapseCustom team={team2}>
          <ScoreBoradTable
            team={team2}
            batsman={team2Score?.batsman}
            bowler={team2Score?.bolwer}
            fallwicket={team2Score?.fallwicket}
          />
        </CollapseCustom>}
    </View>
  );
};

export const ScoreBoradTable = ({
  batsman = [],
  bowler = [],
  fallwicket = [],
  team,
}) => {
  return (
    <View>
      <View
        style={[
          styles.box,
          { borderBottomWidth: 0.5, marginBottom: 0 },
          { borderColor: "#fff" },
        ]}
      >
        <Text style={[styles.TextColor, styles.textHeader]}>Batter</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Text style={[styles.TextColor, styles.textHeader]}>R</Text>
          <Text style={[styles.TextColor, styles.textHeader]}>B</Text>
          <Text style={[styles.TextColor, styles.textHeader]}>4s</Text>
          <Text style={[styles.TextColor, styles.textHeader]}>6s</Text>
          <Text style={[styles.TextColor, styles.textHeader, { width: 40 }]}>
            SR
          </Text>
        </View>
      </View>
      <FlatList
        data={batsman}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item }) => (
          <View style={[styles.rowBox]}>
            <View
              style={{ textAlign: "left", alignItems: "flex-start", gap: 3, width: "33%" }}
            >
              <Text
                style={[
                  styles.TextColor,
                  {
                    textAlign: "center",
                  },
                ]}
              >
                {item?.name}
              </Text>
              <Text
                style={[
                  styles.TextColor,
                  { color: "orange", fontSize: 10 },
                ]}
              >
                {item?.out_by}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 14,
                textAlign: "center",
              }}
            >
              <Text style={styles.TextColor}>{item.run}</Text>
              <Text style={styles.TextColor}>{item.ball}</Text>
              <Text style={styles.TextColor}>{item.fours}</Text>

              <Text style={styles.TextColor}>{item.sixes}</Text>
              <Text
                umberOfLines={1}
                ellipsizeMode="tail"
                textAlign="center"
                style={[
                  styles.TextColor,
                  {
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  },
                ]}
              >
                {Math.round(item.strike_rate)}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={styles.rowBox}>
        <CusText>Extras:</CusText>
        <CusText>{team?.extras}</CusText>
      </View>
      <View
        style={[
          styles.box,
          { borderBottomWidth: 0.5, marginBottom: 0 },
          { borderColor: "#fff" },
        ]}
      >
        <Text style={[styles.TextColor, styles.textHeader]}>
          Bowler
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Text style={[styles.TextColor, styles.textHeader]}>
            O
          </Text>
          <Text style={[styles.TextColor, styles.textHeader]}>
            M
          </Text>
          <Text style={[styles.TextColor, styles.textHeader]}>
            R
          </Text>
          <Text style={[styles.TextColor, styles.textHeader]}>
            W
          </Text>
          <Text

            style={[
              styles.TextColor,
              styles.textHeader,
              {
                width: 45,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              },
            ]}
          >
            ER
          </Text>
        </View>
      </View>
      <FlatList
        data={bowler}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item }) => (
          <View style={[styles.rowBox]}>
            <Text
              style={[
                styles.TextColor,
                {
                  textAlign: "center",
                },
              ]}
            >
              {item?.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 14,
                textAlign: "center",
              }}
            >
              <Text style={styles.TextColor}>{item.over}</Text>
              <Text style={styles.TextColor}>{item.maiden}</Text>
              <Text style={styles.TextColor}>{item.run}</Text>

              <Text style={[styles.TextColor, { width: 20, marginLeft: 6 }]}>{item.wicket}</Text>
              <Text
                umberOfLines={1}
                ellipsizeMode="tail"
                textAlign="center"
                style={[
                  styles.TextColor,
                  {
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  },
                ]}
              >
                {Math.round(item.economy)}
              </Text>
            </View>
          </View>
        )
        }
      />
      < View
        style={
          [
            styles.box,
            { borderBottomWidth: 0.5, marginBottom: 0 },
            { borderColor: "#fff" },
          ]}
      >
        <Text style={[styles.TextColor, styles.textHeader]}>
          Fall of Wickets
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: 200,
          }}
        >
          <Text style={[styles.TextColor, styles.textHeader]}>Score</Text>
          <Text style={[styles.TextColor, styles.textHeader]}>Over</Text>
        </View>
      </View >

      <FlatList
        data={fallwicket}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item }) => (
          <View style={[styles.rowBox]}>
            <Text
              style={[
                styles.TextColor,
                {
                  textAlign: "center",
                },
              ]}
            >
              {item.player}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: 200,
              }}
            >
              <Text style={styles.TextColor}>
                {item.score}/{item.wicket}
              </Text>
              <Text style={styles.TextColor}>{item.over}</Text>
            </View>
          </View>
        )}
      />
    </View >
  );
};

export default ScoreBoard;
export const styles = StyleSheet.create({
  infoTeam: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 5,
  },
  box: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8
  },
  textHeader: {
    fontWeight: "800",
    paddingLeft: 2
  },
  rowBox: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#171717",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  tvStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 100,
    borderWidth: 3, // Border width
    borderColor: "black", // Border color
    borderRadius: 4, // Border radius (optional, for rounded corners)
    padding: 10,
    backgroundColor: "#EAEAEA",
  },
  TextColor: {
    color: "#171717",
    minWidth: 20,
  },
  divider: {
    borderWidth: 0.4,
    borderColor: "darkgrey",
    width: "100",
  },
});
