import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MatchTopHeading from "./matchTopHeading";
import CusText from "./CusText";
import { checkBGColor } from "../utils";
import { checkColor } from "./styleSheet";
const width = Dimensions.get("window").width;
const MatchComGuide = ({ data }) => (<View
  style={[
    styles.rowBox,
    { paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 },
  ]}
>
  <CusText style={{ paddingHorizontal: 8 }}>
    {" "}
    <CusText style={{ fontWeight: 600, padding: 4 }}>
      {data?.title}:
    </CusText>
    {" "}{data?.runs} Runs{" "}
  </CusText>
  <View style={{ flexDirection: "row", gap: 8 }}>
    <View
      style={{
        backgroundColor: "#FF3939",
        width: 90,
        height: 80,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
      }}
    >
      <CusText style={{ fontSize: 20, fontWeight: 700, color: "white" }}>
        {data?.team_score}-{data?.team_wicket}
      </CusText>
      <CusText style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{data?.team}</CusText>
    </View>
    <View style={{ gap: 10 }}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: width - 150,
        }}
      >
        <CusText>{data?.batsman_1_name}</CusText>
        <CusText>{data?.batsman_1_runs} ({data?.batsman_1_balls}) </CusText>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: width - 150,
        }}
      >
        <CusText>{data?.batsman_2_name}</CusText>
        <CusText>{data?.batsman_2_runs} ({data?.batsman_2_balls}) </CusText>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: width - 150,
        }}
      >
        <CusText>{data?.bolwer_name}</CusText>
        <CusText>{data?.bolwer_overs}-{data?.bolwer_maidens}-{data?.bolwer_runs}-{data?.bolwer_wickets}</CusText>
      </View>
    </View>
  </View>
</View>);
const Commentary = (props) => {
  const { matchCommentry, matchInfo } = props;
  const overyByInning = Object.keys(matchCommentry ?? []) ?? [];
  return (

    <View style={styles.container}>

      <MatchTopHeading team_b_img={matchInfo.team_b_img}
        team_a_img={matchInfo.team_a_img}
        team_a={matchInfo.team_a_short}
        team_b={matchInfo.team_b_short} />
      {/* box of each over */}
      {/* <View style={styles.box}>
          <CusText style={{ paddingHorizontal: 8 }}>
            Day 3: Stump IND 445 & 122/3 lead by 332 runs
          </CusText>
        </View> */}
      {/* <View
          style={[
            styles.rowBox,
            { paddingVertical: 10, paddingHorizontal: 10 },
          ]}
        >
          <CusText style={{ paddingHorizontal: 8 }}>
            {" "}
            <CusText style={{ fontWeight: 600, padding: 4 }}>
              End of 51st over:
            </CusText>c
            0 10 1 13 3 4 (x Runs){" "}
          </CusText>

        </View> */}
      {/* //Commentary */}
      {!overyByInning?.length &&
        <View style={{ alignItems: "center", height: 600, justifyContent: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: 700, textAlign: "center", color: "#c3c3c3" }} >Commentary Not Available</Text>
        </View>
      }
      <View style={{ gap: 15, width: "100%" }}>

        <FlatList
          data={overyByInning}
          renderItem={({ item }) => (
            <ListCommentry key={item} data={matchCommentry[item]} />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>

  );
};

const ListCommentry = ({ data }) => {
  return Object.values(data).map((values) =>
    values.map((value) =>
      value?.data?.title?.includes("END OF OVER :") ?
        <MatchComGuide data={value.data} />
        :

        <View style={{ marginVertical: 20, gap: 10 }}>
          <CusText style={{ fontSize: 16, fontWeight: 600, color: "#fff" }} >
            {value?.data?.overs} {value?.data?.title}{" "}
          </CusText>
          <View style={{ flexDirection: "row", gap: 10, width: "91%" }}>
            <View
              style={{
                backgroundColor: checkBGColor(value?.data?.runs),
                width: 22,
                height: 22,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <CusText style={{ color: "#171717" }} >{value?.data?.runs}</CusText>
            </View>
            <CusText style={{ fontSize: 14, fontWeight: "500", color: "#fff" }} >{value?.data?.description}</CusText>
          </View>
        </View >


    )
  );
};

export default Commentary;
const styles = StyleSheet.create({
  scrollView: {


    // marginHorizontal: 20,
  },
  box: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginVertical: 3,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 4,
    width: width,
    gap: 14,
    borderRadius: 10,

    flexDirection: "column",
  },
  container: {

    color: "#EAEAEA",
    width: "100%",

    gap: 8,
  },
});
