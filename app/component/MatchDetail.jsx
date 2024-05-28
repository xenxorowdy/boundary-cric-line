import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TopTab from "./TopTab";
import Live from "./Live";
import Info from "./Info";
import Commentary from "./Commentary";
import HistoryComponet from "./History";
import ScoreBoard from "./ScoreBoard";
import PointsTable from "./PointsTable";
import {
  commentaryMatchById,
  fetchmatchInfo,
  liveMatchById,
  pointsTable,
  pointsTableBySeriesId,
  scorecardByMatchId,
} from "../api";
import _ from "lodash";
import Loading from "../Loading";

const matchDetail = [
  "Live",
  "Info",
  "Commentary",
  "ScoreBoard",
  "Points Table",
];
import { useKeepAwake } from 'expo-keep-awake';

// import { InterstitialAd, AdEventType, TestIds, BannerAd, BannerAdSize, RewardedAd, RewardedAdEventType, } from 'react-native-google-mobile-ads';
// console.log("hello", Platform.OS)
// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL :
//   Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/4311386656' :
//     'ca-app-pub-1715488426615455/4262888413';
// const adUnit = __DEV__
//   ? TestIds.ADAPTIVE_BANNER :
//   Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/2834653457'
//     : "ca-app-pub-2940991674659781/5869704858";

// const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//   keywords: ['fashion', 'clothing', 'shoes', 'casual', 'outfit', 'style', 'betting', 'cricket', 'football', 'sports', 'app', 'shoping']
// });
const MatchDetail = ({ matchId }) => {
  useKeepAwake();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleChangeTab = (data, index) => {
    setCurrentIndex(index);
    setClick(true)
  };

  const [matchResult, setMatchResult] = useState([]);
  const [matchCommentry, setMatchCommentry] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [matchScoreBoard, setMatchScoreBoard] = useState([]);
  const [matchPointsTable, setMatchPointsTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [click, setClick] = useState(false);
  const [increm, setIncrem] = useState(0);

  let incre = 0;
  const fetchResult = async () => {
    try {


      const data = await liveMatchById(matchId);
      if (!data) return;
      const { batting_team, team_b_scores, team_a_scores, team_b_over, team_a_over, team_b_id, team_a_id, team_b_short, team_a_short, date_time } = data;
      // console.log("match details123", data?.curr_rate);

      if (batting_team == team_b_id) {
        data.battingTeam = team_b_short;
        data.battingScore = team_b_scores && `${team_b_scores || '-'} (${team_b_over || '-'})`;
      }
      if (batting_team == team_a_id) {
        data.battingTeam = team_a_short;
        data.battingScore = team_a_scores && `${team_a_scores || '-'} (${team_a_over || '-'})`;
      }
      if (batting_team != team_b_id) {
        data.secbattingTeam = team_b_short;
        data.secbattingScore = team_b_scores && `${team_b_scores || '-'} (${team_b_over || '-'})`;
      }
      if (batting_team != team_a_id) {
        data.secbattingTeam = team_a_short;
        data.secbattingScore = team_a_scores && `${team_a_scores || '-'} (${team_a_over || '-'})`;
      }
      if (!click) {
        const matchTime = new Date(date_time);
        const now = new Date();
        if (matchTime - now > 0) {
          handleChangeTab(null, 1)

        }
      }
      setMatchResult(data);
      setLoading(false);

    } catch (error) {
      console.log("err match details", error);
      setLoading(false);
    }

  };
  const fetchCommentary = async () => {
    const data = await commentaryMatchById(matchId);

    setMatchCommentry(data ?? {});
  };
  const fetchInfo = async () => {
    const data = await fetchmatchInfo(matchId);
    setLoading(false);

    setMatchInfo(data ?? {});
  };
  const fetchScoreBoard = async () => {
    const data = await scorecardByMatchId(matchId);

    setMatchScoreBoard(data ?? {});
  };

  const fetchHistory = async () => {
    const data = await liveMatchById(matchId);

    setMatchHistory(data ?? {});
  };
  const fetchPointsTable = async (id) => {
    setLoading(true);
    const data = await pointsTableBySeriesId(id);
    setMatchPointsTable(data ?? {});
    setLoaded(false);
  };

  const debouncedRender = _.debounce(async () => {
    await fetchResult()
  }, 200);
  // Simulate an event triggering the render
  useEffect(() => {
    const timerId = setInterval(debouncedRender, 300);
    return () => clearInterval(timerId);
  }, []);
  const debounced = _.debounce(async () => {
    await fetchCommentary();
    await fetchScoreBoard();
    await fetchHistory();
    await fetchHistory();
  }, 2000);
  // Simulate an event triggering the render
  useEffect(() => {
    const timerId = setInterval(debounced, 3000);
    return () => clearInterval(timerId);
  }, []);
  // if (!loaded) {
  //   return null;
  // }
  // const adUnit = __DEV__
  //   ? TestIds.ADAPTIVE_BANNER
  //   : "ca-app-pub-2940991674659781/5869704858";

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
  //     setTimeout(() => {

  //       setIncrem(pre => pre++);
  //       interstitial.show()
  //     }, 10000);
  //   });

  //  Start loading the interstitial straight away
  //   interstitial.load();

  //   //  Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);
  useEffect(() => {
    setLoading(true)
    fetchResult();
    fetchCommentary();
    fetchInfo();
    fetchScoreBoard();
    fetchHistory();
    if (currentIndex == 4) fetchPointsTable(matchInfo?.series_id);
  }, [currentIndex]);
  if (loading || matchResult?.length) return <Loading />;
  return (
    <View style={{}}>
      <TopTab
        option={matchDetail}
        currentIndex={currentIndex}
        handleChangeTab={handleChangeTab}
      />
      {currentIndex === 0 && <Live matchDetail={matchResult} />}
      {currentIndex === 1 && <Info matchId={matchId} matchInfo={matchInfo} />}
      {currentIndex === 2 && <Commentary matchCommentry={matchCommentry} matchInfo={matchInfo} />}
      {currentIndex === 3 && <ScoreBoard matchScoreBoard={matchScoreBoard} matchInfo={matchInfo} />}
      {/* {currentIndex === 4 && <HistoryComponet matchHistory={matchHistory} />} */}
      {currentIndex === 4 && (
        <PointsTable matchPointsTable={matchPointsTable} />
      )}

      {/* 
      <BannerAd
        unitId={adUnit}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      /> */}

    </View>
  );
};

export default MatchDetail;

const styles = StyleSheet.create({
  stickyBanner: {
    bottom: 0,
    width: '100%',
    backgroundColor: 'blue',
    zIndex: 1,

  },
});
