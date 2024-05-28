import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import ShowAnimation from "./ShowAnimation";
import SvgComponent from "./cricket";
import { checkColor } from "./styleSheet";
import CusText from "./CusText";
import { checkBGColor, inningsuffix, ratefetch } from "../utils";
import { Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const tobat = ["rohit sharma", "jos butler", "sam ", "sanju samson"];
const option =
{
  "ball": "Ball Start",
  "wicket": "Wicket",
};
// import { BannerAd, BannerAdSize, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import App from "./table123";
import LinearGradient from "expo-linear-gradient";

// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1715488426615455/4262888413';

// const rewarded = RewardedAd.createForAdRequest(adUnitId, {
//   keywords: ['fashion', 'clothing', 'shoes', 'casual', 'outfit', 'style', 'betting', 'cricket', 'football', 'sports', 'app', 'shoping', 'food', 'fantasy'],
// });

// const adUnit = __DEV__
//   ? TestIds.ADAPTIVE_BANNER
//   : "ca-app-pub-2940991674659781/5869704858";

//new one
// const adUnit = __DEV__
//   ? TestIds.ADAPTIVE_BANNER :
//   Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/2834653457'
//     : "ca-app-pub-2940991674659781/5869704858";


const Live = ({ matchDetail = [] }) => {
  const getValue = async (keyToRetrieve) => {
    try {
      const value = await AsyncStorage.getItem(keyToRetrieve);
      return SetMute(value ?? 'false');
    } catch (error) {
      return SetMute('false');
    }
  };
  const [mute, SetMute] = useState("false");
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setLoaded(true);
  //     // rewarded.show();
  //   });
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       console.log('User earned reward of ', reward);
  //     },
  //   );

  //   // Start loading the rewarded ad straight away
  //   rewarded.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, [loaded]);


  const handleMute = () => {
    const value = mute == "true" ? "false" : "true";
    storeValue("mute", `${value}`);
    SetMute(value);
  };
  let str = '';
  const scrollViewRef = useRef(null);

  useEffect(() => {
    getValue("mute");
  }, [])

  // if (scrollViewRef.current) {
  //   scrollViewRef.current.scrollToEnd({ animated: false });
  // }

  useEffect(() => {
    if (scrollViewRef.current) {
      const time = setTimeout(() => {

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: false });
        }
      }, 500);
    }

  }, []);
  const storeValue = async (key, value) => {
    await AsyncStorage.setItem(key, value)
      .then(() => {
        console.log("Value saved successfully!");
      })
      .catch((error) => {
        console.log("Error saving value:", error);
      });
  };

  function parseSessionData(sessionString) {
    try {

      const sessionPattern = /(\d+) Over \((\d+-\d+)\) (\d+) Runs\/(\d+)wk \((\d+-\d+) ([A-Z]+)\)/g;
      const sessions = [];
      let match;
      while ((match = sessionPattern.exec(sessionString)) !== null) {
        const sessionData = {
          over: parseInt(match[1], 10),
          session: match[2],
          current: `${match[3]}/${match[4]}`,
          other: `${match[5]} ${match[6]}`
        };
        sessions.push(sessionData);
      }
      return sessions;

    } catch (error) {
      console.log("Error parsing session data:", error);
    }
  }
  // useEffect(() => {
  //   if (matchDetail.length) {
  //     getScore();
  //   }
  // }, [matchDetail])
  return (
      <View style={styles.container}>
        <View style={[{ alignContent: "center", alignItems: "center", width: "100%" }]} >
          <View style={{ flexDirection: "column", width: "100%", alignItems: "center", backgroundColor: "#fff", borderRadius: 10, padding: 10 }} >
            <View style={styles.tvStyle}>
              {mute == 'false' ? (
                <Ionicons
                  onPress={handleMute}
                  name="volume-mute-outline"
                  size={24}
                  color="black"
                  style={{ position: "absolute", top: 5, left: 5 }}
                />
              ) : (
                <Ionicons
                  onPress={handleMute}
                  name="volume-high-outline"
                  size={24}
                  color="black"
                  style={{ position: "absolute", top: 5, left: 5 }}
                />
              )}

              <ShowAnimation mute={mute} style={styles.tvStyle} value={matchDetail?.first_circle ?? ''} />
              <Text
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  fontWeight: "600",
                  fontSize: 15,
                  color: checkColor('Live'),
                }}
              >
                LIVE
              </Text>
            </View>
            <View style={[styles.boxtv]} >
              <View style={{ flexDirection: "row", gap: 4, alignItems: "center", padding: 5, width: "45%" }}>
                <CusText>{matchDetail?.battingTeam}:</CusText>
                <CusText style={{ fontWeight: "600" }} >{matchDetail?.battingScore}
                  {/* {matchDetail?.team_a} */}
                  {/* {team_a_score} */}
                </CusText>
                {matchDetail?.powerplay == 1 &&
                  <View style={styles.powerplay}>

                    <Text style={{ fontWeight: "600", color: "#FFC700", fontSize: 15 }} > P </Text>
                  </View>
                }
              </View>
              <View style={{ flexDirection: "row", gap: 2, alignItems: "center", padding: 5 }}>
                <CusText>{matchDetail?.secbattingTeam}:</CusText>
                <CusText style={{ fontWeight: "600", flexWrap: "wrap" }} >{matchDetail?.secbattingScore}
                  {/* {matchDetail?.team_a} */}
                  {/* {team_a_score} */}
                </CusText>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.box,
            { borderBottomWidth: 0.5 },
            { borderColor: "#fff", flexDirection: "column", gap: 10, borderRadius: 10 },
          ]}
        >
          <Text style={[styles.TextColor, { fontSize: 16, fontWeight: "600" }]}>Last 4 Overs</Text>
          <View style={{ flexDirection: "row", gap: 10, marginHorizontal: 10 }}>
            <ScrollView
              horizontal
              ref={scrollViewRef}
              contentContainerStyle={{ alignItems: 'flex-end' }}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: "row", gap: 10, marginHorizontal: 10 }}>
                {(matchDetail?.last4overs)?.map((item, index) => (
                  <View key={index} style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <CusText style={{ fontWeight: "700", fontSize: 16, color: "#2D2B2A" }} >Over {item.over}</CusText>
                    {
                      item?.balls?.map((ele, idx) =>
                        <View
                          key={idx}
                          style={{
                            height: 25,
                            backgroundColor: checkBGColor(ele?.toLowerCase()),
                            width: 25,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text key={idx} style={{ color: (ele == 0 || ele > 3) ? "white" : "white", fontWeight: "bold", fontSize: 13, textAlign: "center", width: 28 }}  >
                            {ele}
                          </Text>
                        </View>
                      )
                    }
                    < CusText style={{ fontWeight: "600", fontSize: 16, color: "#2D2B2A" }} >= {" "} {item.runs}</CusText>
                    <Divider style={{ width: 1, height: '100%' }} />
                    <View style={styles} />
                  </View>
                ))}
              </View>
            </ScrollView >
          </View>
        </View>
        <View style={[styles.box, { flexDirection: "column", gap: 20, borderRadius: 2, width: "100%", paddingVertical: 10, borderRadius: 10, elevation: 10 }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.TextColor}>Run Rate: {`${matchDetail?.curr_rate?.toString() ?? '-'}`}</Text>
            <Text style={styles.TextColor}>Target: {matchDetail?.target?.toString() || '-'}</Text>

            {matchDetail?.rr_rate?.toString() &&
              <Text style={styles.TextColor}>RRR: {matchDetail?.rr_rate?.toString()}</Text>}

          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.TextColor}>Run Needed: {matchDetail?.run_need?.toString() || '-'}</Text>

            <Text style={styles.TextColor}>Ball Remaning: {matchDetail?.ball_rem?.toString()}</Text>



          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 10, borderRadius: 1, width: "100%", paddingVertical: 10, borderRadius: 10, elevation: 10 }} >
          <View style={[styles.box, { borderRadius: 10 }]}>
            <Text style={[styles.TextColor, { fontWeight: "600", fontSize: 16 }]}>Winning Chances:</Text>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Text style={styles.TextColor}> {matchDetail?.fav_team}</Text>
              <Text style={[styles.TextColor, styles.minStyle]}>{ratefetch(matchDetail?.min_rate)} </Text>
              <Text style={[styles.TextColor, styles.maxStyle]}>{ratefetch(matchDetail?.max_rate)}</Text>
            </View>
          </View>

          {matchDetail.s_ovr && matchDetail.s_ovr !== '0' &&
            <View style={[styles.box, { borderRadius: 10 }]}>
              <View style={{ flexDirection: "row", gap: 3, textAlign: "center", alignItems: "center" }}>
                <Text style={styles.TextColor}>
                  {matchDetail?.s_ovr} Over Runs:
                </Text>
                <Text style={[styles.TextColor, styles.minStyle]}>{matchDetail?.s_min} </Text>
                <Text style={styles.maxStyle}>{matchDetail?.s_max}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text style={styles.TextColor}> R X B:</Text>
                <Text style={styles.minStyle}> {matchDetail?.s_run} </Text>
                <Text style={styles.maxStyle}> {matchDetail?.s_ball} </Text>
              </View>
            </View>
          }
          {matchDetail?.lambi_min &&
            <View style={[styles.box, { flexDirection: "row", gap: 10, justifyContent: "space-between" }]}>
              <View style={{ flexDirection: "row", gap: 3, textAlign: "center", alignItems: "center", width: "60%" }}>

                <Text style={styles.TextColor}>
                  {matchDetail?.current_inning}{inningsuffix(matchDetail?.current_inning)}  Inning's Total Runs:
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 3, textAlign: "center", alignItems: "center", width: "35%", justifyContent: "flex-end" }} >
                <Text style={styles.minStyle}> {matchDetail?.lambi_min} </Text>
                <Text style={styles.maxStyle}> {matchDetail?.lambi_max} </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "60%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text style={styles.minStyle}> {matchDetail?.s_run} </Text>
                <Text style={styles.maxStyle}> {matchDetail?.s_ball} </Text>
              </View>
            </View>
          }
          <View style={styles.divider} />
        </View>
        {/* <BannerAd
        unitId={adUnit}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      /> */}
        <View style={{ flexDirection: "column", padding: 10, flex: 1, borderRadius: 10, backgroundColor: "#fff", width: "100%", }}>
          <View
            style={[
              styles.boxback,
            ]}
          >
            <Text style={styles.TextColor}>Batter</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 11,
              }}
            >
              <Text style={styles.TextColor}>R</Text>
              <Text style={styles.TextColor}>B</Text>
              <Text style={styles.TextColor}>4s</Text>
              <Text style={styles.TextColor}>6s</Text>
              <Text style={[styles.TextColor, { width: 35 }]}>SR</Text>
            </View>
          </View>

          <FlatList
            data={matchDetail?.batsman}
            keyExtractor={(item, index) => `${item}_${index}`}
            renderItem={({ item }) => (
              <View style={[styles.rowBoxback]}>
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
                    gap: 10,
                  }}
                >
                  <Text style={styles.TextColor}>{item.run}</Text>
                  <Text style={styles.TextColor}>{item.ball}</Text>
                  <Text style={styles.TextColor}>{item.fours}</Text>
                  <Text style={styles.TextColor}>{item.sixes}</Text>
                  <Text style={[[styles.TextColor, { width: 35 }]]}>{Math.round(item.strike_rate)}</Text>
                </View>
              </View>
            )}
          />
          <View style={styles.rowBoxback} >

            <CusText>Partnership: {matchDetail?.partnership?.run?.toString() ?? '-'} ({matchDetail?.partnership?.ball?.toString() ?? '-'})</CusText>

            {matchDetail?.lastwicket?.player &&
              <CusText>Last Wkt: {matchDetail?.lastwicket?.player?.toString() + " " + matchDetail?.lastwicket?.run?.toString() + "(" + matchDetail?.lastwicket?.ball?.toString() + ")"}   </CusText>
            }
          </View>

        </View>
        <View style={{ flexDirection: "column", padding: 10, flex: 1, borderRadius: 10, backgroundColor: "#fff", width: "100%", }}>
          <View
            style={[
              styles.boxback,
            ]}
          >
            <Text style={styles.TextColor}>Bowler</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 15,

              }}
            >
              <Text style={styles.TextColor}>O</Text>
              <Text style={styles.TextColor}>R</Text>
              <Text style={styles.TextColor}>Wkt</Text>
              <Text style={[styles.TextColor, { width: 32 }]}>Eco</Text>
            </View>

          </View>

          <FlatList
            data={[matchDetail?.bolwer]}
            keyExtractor={(item, index) => `${item}_${index}`}
            renderItem={({ item }) => (
              <View style={[styles.rowBoxback]}>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <Text style={[styles.TextColor]}>{item?.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 14,
                  }}
                >
                  <Text style={styles.TextColor}>{item?.over}</Text>
                  <Text style={styles.TextColor}>{item?.run}</Text>
                  <Text style={styles.TextColor}>{item?.wicket}</Text>
                  <Text style={styles.TextColor}>{item?.economy}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{ flexDirection: "column", padding: 0, flex: 1 }}>
        </View>
        <View style={{ flexDirection: "column", padding: 10, flex: 1, borderRadius: 10, backgroundColor: "#fff", width: "100%", }}>
          <View
            style={[
              styles.boxback
            ]}
          >
            <Text style={styles.TextColor}>Yet to bat</Text>
          </View>

          <Text style={[{ fontSize: 18 }]}>
            {matchDetail?.yet_to_bet?.join(", ")}
          </Text>
        </View>

        <App cricketData={parseSessionData((matchDetail?.session?.split("Sessions<br />")?.[1]))} cur="1st Inning" />
        <App cricketData={parseSessionData((matchDetail?.session?.split("Sessions<br />")?.[2]))} cur="2nd Inning" />
      </View >

  );
};

export default Live;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    color: "#EAEAEA",
    gap: 8,
  },
  powerplay: { backgroundColor: "#000", textAlign: "center", paddingVertical: 1, paddingHorizontal: 2, color: "#FFC700", border: 1, borderColor: "#FFC700", fontSize: 16, fontWeight: "700", alignItems: "center" },
  minStyle: { backgroundColor: "red", textAlign: "center", paddingVertical: 3, paddingHorizontal: 5, color: "#fff", fontSize: 16, fontWeight: "700", borderRadius: 6, elevation: 10 },
  maxStyle: { backgroundColor: "green", textAlign: "center", paddingVertical: 3, paddingHorizontal: 5, color: "#fff", fontSize: 16, fontWeight: "700", borderRadius: 6, elevation: 10 },
  box: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    elevation: 10,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    borderRadiusTopLeft: 10,
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  boxback: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  boxtv: {
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowBox: {
    alignContent: "center",
    alignItems: "center",
    borderWidth: 0.1,
    elevation: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,

  },
  rowBoxback: {
    alignContent: "center",
    alignItems: "center",
    elevation: 10,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  tvStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: '98%',
    height: 120,
    flexDirection: "row",
    // Border color

  },
  TextColor: {
    color: "#000",
    minWidth: 25,
  },
  divider: {
    borderWidth: 0.4,
    borderColor: "darkgrey",
    width: "100",
  },
  ballShape: {
    borderRadius: 18,
  },
});
