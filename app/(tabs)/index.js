import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import Home from "../component/Home.js";
import TopTab from "../component/TopTab.jsx";
import BackgroundFetchScreen from "../component/prevantScreen.jsx";
// import { InterstitialAd, AdEventType, TestIds, BannerAd, BannerAdSize, RewardedAd, RewardedAdEventType, } from 'react-native-google-mobile-ads';


import "expo-dev-client";
import { LinearGradient } from "expo-linear-gradient";
import StickyFooter from "../component/StickyFooter.jsx";
const HomePage = () => {
  const [refresh, setRefresh] = useState(true)
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("hello", apiUrl);
  // const adUnitId = __DEV__
  //   ? TestIds.ADAPTIVE_BANNER :
  //   Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/2834653457'
  //     : "ca-app-pub-2940991674659781/5869704858";

  const pullme = () => {
    setRefresh(true)
  }

  return (
    <LinearGradient colors={['#24AEFA', '#02C5A3', '#FFA26B']} style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        // scrollEventThrottle={16} // Adjust the throttle as needed

        refreshControl={<RefreshControl
          refreshing={refresh}
          onRefresh={pullme}
        />
        }
        style={styles.scrollView}>
        <Home refresh={refresh} setRefresh={setRefresh} />
        {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        /> */}
      </ScrollView>

      {/* <StickyFooter /> */}

      {/* <StickyFooter /> */}
    </LinearGradient>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,

  },
  scrollView: {
    // backgroundColor: "#fff",
    // height: Dimensions.get("window").height,

    // marginHorizontal: 20,
  },
});
