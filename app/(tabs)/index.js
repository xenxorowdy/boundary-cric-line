import React, { useState } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet
} from "react-native";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Home from "../component/Home.js";


import "expo-dev-client";
import { LinearGradient } from "expo-linear-gradient";
const HomePage = () => {
  const [refresh, setRefresh] = useState(true)
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER :
    Platform.OS === 'ios' ? 'ca-app-pub-9391344076734991/6927994446'
      : "ca-app-pub-9391344076734991/2103043178";

  const pullme = () => {
    setRefresh(true)
  }

  return (
    <LinearGradient colors={['#4682B4', '#444444']} style={styles.linearGradient}>
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
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
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
