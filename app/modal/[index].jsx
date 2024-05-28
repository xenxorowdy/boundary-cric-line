import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MatchTopHeading from "../component/matchTopHeading";
import { CusLargeText } from "../utils";
import { Entypo } from "@expo/vector-icons";
import { matchPlayerSquadsInfo } from "../api";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
// import { BannerAd, BannerAdSize, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const Modal = () => {
  const [matchPlayerInfo, setmatchPlayerInfo] = useState([]);
  const { index } = useLocalSearchParams();

  const callMatchPlayerInfo = async () => {
    const res = await matchPlayerSquadsInfo(index);
    setmatchPlayerInfo(res.data);
  };
  console.log(matchPlayerInfo);
  useEffect(() => {
    callMatchPlayerInfo();
  }, []);
  const { team_a, team_b } = matchPlayerInfo;
  // const adUnit = __DEV__
  //   ? TestIds.ADAPTIVE_BANNER :
  //   Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/2834653457'
  //     : "ca-app-pub-2940991674659781/5869704858";

  return (

    <LinearGradient colors={['#24AEFA', '#FFA26B', '#333433']}  >

      <ScrollView style={styles.scrollView}>
        <SafeAreaProvider style={{ marginVertical: 10 }}>
          <MatchTopHeading
            team_a_img={team_a?.flag}
            team_b_img={team_b?.flag}
            team_a={team_a?.short_name}
            team_b={team_b?.short_name}
          />

          <Pressable
            style={{
              margin: 10,
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#21DA8C",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Players</Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingLeft: 10,
              width: "100%",
            }}
          >
            <View style={{ marginHorizontal: 10, gap: 10 }}>
              {team_a?.player.map((ele) => (
                <View
                  style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
                >
                  <Image
                    source={{
                      uri: ele?.image || "",
                    }}
                    style={{ width: 30, height: 30, borderRadius: 18 }}
                  />
                  {/* <Entypo name="user" size={24} color="grey" /> */}
                  <View>
                    <Text style={{ fontSize: 13, fontWeight: 600 }}>
                      {" "}
                      {ele.name}
                    </Text>
                    <Text>{ele.play_role}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.divider}></View>
            <View style={{ gap: 10 }}>
              {team_b?.player.map((ele) => (
                <View
                  style={{
                    flexDirection: "row-reverse",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  {/* <Entypo name="user" size={24} color="grey" /> */}
                  <Image
                    source={{
                      uri: ele?.image || "",
                    }}
                    style={{ width: 30, height: 30, borderRadius: 18 }}
                  />
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 13, fontWeight: 600 }}>
                      {" "}
                      {ele?.name}
                    </Text>
                    <Text>{ele?.play_role}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View>
              {/* <BannerAd
                unitId={adUnit}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              /> */}
              <Text></Text>
            </View>
          </View>
        </SafeAreaProvider>
      </ScrollView>
    </LinearGradient>
  );
};

export default Modal;

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,

    // marginHorizontal: 20,
  },
  divider: {
    borderWidth: 1,
    borderColor: "#cccc",
  },
});
