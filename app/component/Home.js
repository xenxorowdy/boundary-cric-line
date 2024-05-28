import { View, Text, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import TopTab from "./TopTab";
import BlockBox from "./BlockBox";
import { HomeMatch, LiveMatches } from "../api";
import SeriesInfo from "./seriesInfo.jsx";
import HomeNew from "./HomeNew.jsx";
import _ from "lodash";
import StickyFooter from "./StickyFooter.jsx";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

export default function Home({ refresh, setRefresh }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [homeMatch, setHomeMatch] = useState([]);
  const [liveMatch, setLiveMatch] = useState([]);

  const handleChangeTab = (data, index) => {
    setCurrentIndex(index);
  };
  const fetchMatch = async () => {
    try {
      const data = await LiveMatches();
      setLiveMatch(data?.data);

      setRefresh(false);
    } catch (error) {
      console.log("err", error)
      setRefresh(false);
    }

  };

  const fetchHomeMatchList = async () => {
    try {

      const data = await HomeMatch();
      setHomeMatch(data?.data);
      setRefresh(false)
    } catch (error) {
      console.log(error)
      setRefresh(false)
    }
  };

  if (refresh) {
    fetchMatch();
    fetchHomeMatchList();
  }

  const debounce = async () => {
    await fetchMatch();
    await fetchHomeMatchList();
  };
  _.debounce(async () => {
    await fetchResult()
  }, 1000);
  // Simulate an event triggering the render
  useEffect(() => {
    const timerId = setInterval(debounce, 10000);
    return () => clearInterval(timerId);
  }, []);
  useState(() => {

    fetchMatch();
    fetchHomeMatchList();

  }, [refresh]);
  // const adUnitId = __DEV__
  //   ? TestIds.ADAPTIVE_BANNER :
  //   Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/2834653457'
  //     : "ca-app-pub-2940991674659781/5869704858";
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <TopTab currentIndex={currentIndex} handleChangeTab={handleChangeTab} />
      {currentIndex == 0 ? (
        <Carousel liveMatch={homeMatch} />
      ) : (
        <BlockBox liveMatch={liveMatch} />
      )}
      {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LEADERBOARD}
      /> */}
      {currentIndex == 0 && (
        <View>
          <SeriesInfo />
          <HomeNew />
        </View>
      )}

    </View>
  );
}
