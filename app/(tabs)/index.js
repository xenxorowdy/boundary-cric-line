import React, { useEffect, useState } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet
} from "react-native";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Home from "../component/Home.js";
import registerNNPushToken, { getPushDataObject } from 'native-notify';

import "expo-dev-client";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import Notification from "../component/Notification.jsx";
const HomePage = () => {
  const [refresh, setRefresh] = useState(true)
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER :
    Platform.OS === 'ios' ? 'ca-app-pub-2133075463586574/9258290062'
      : "ca-app-pub-2133075463586574/2691438757";

  const pullme = () => {
    setRefresh(true)
  }
  registerNNPushToken(22705, 'uOKeX1XohzMJV07bxWVIdF');


  const pushDataObject = getPushDataObject()
  useEffect(() => {
    console.log(pushDataObject);
    // let match1 = match?.match_id + `sep1s@-${match?.team_a_short + ' vs ' + match?.team_b_short}`;
    const navigat = pushDataObject.screen;
    // router.push('match/navigat');
    // let match1 = match?.match_id + `sep1s@-${match?.team_a_short + ' vs ' + match?.team_b_short}`;
    if (navigat)
      router.push(navigat);

  }, [pushDataObject])


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
        <Notification />
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
