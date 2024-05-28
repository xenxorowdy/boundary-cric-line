import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import TopTab from "../../component/TopTab";
import CusText from "../../component/CusText";
import { Boxes } from "../../component/Carousel";
import { RecentMatches } from "../../api";
import { LinearGradient } from "expo-linear-gradient";
import StickyFooter from "../../component/StickyFooter";
// import { RewardedAd, RewardedAdEventType, TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-1715488426615455/4262888413';

// const rewarded = RewardedAd.createForAdRequest(adUnitId, {
//   keywords: ['fashion', 'clothing', 'shoes', 'casual', 'outfit', 'style', 'betting', 'cricket', 'football', 'sports', 'app', 'shoping','food','fantasy'],
// });
//   const adUnit = __DEV__
//     ? TestIds.ADAPTIVE_BANNER
//     : "ca-app-pub-2940991674659781/5869704858";

// const adUnit = __DEV__
//   ? TestIds.ADAPTIVE_BANNER :
//   Platform.OS === 'ios' ? 'ca-app-pub-2940991674659781/2834653457'
//     : "ca-app-pub-2940991674659781/5869704858";


const getCurrentDate = () => {
  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return date.toLocaleString("en-IN", options);
};
const UserPage = () => {
  const edata = [0, 1, 2, 3, 4, 5, 6];

  const { id } = useLocalSearchParams();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const option = ["All", "T20", "ODI", "Test", "Hundred", "T10"];
  const handleChange = (data, index) => {
    setIndex(index);
    filteredData(option[index]);
  };
  const loadMoreData = async () => {
    setLoading(true);
    // Simulate fetching more data (replace with your API call)
    const newData = [23, 43];
    setData([...data, ...newData]);
    setPage(page + 1);
    setLoading(false);
  };
  const renderItem = async () => {
    const res = await RecentMatches();
    setData(res);
    setFiltered(res);
  };

  useEffect(() => {
    renderItem();
  }, []);

  const filteredData = (value) => {
    if (value === "All") {
      renderItem();
    } else {
      const tempValue = [...data];
      const filteredData = tempValue.filter(
        (item) => item.match_type === value
      );
      setFiltered(filteredData);
    }
  };

  // const renderItem = ({ item }) => (
  //   <View style={{ padding: 20 }}>
  //     <Text>{item}</Text>
  //   </View>
  // );

  // const onEndReached = () => {
  //   if (!loading) {
  //     loadMoreData();
  //   }
  // };

  // <ScrollView >
  return (
    <LinearGradient colors={['#24AEFA', '#FFA26B', '#333433']} style={styles.scrollView} >

      <View style={styles.scrollView}>
        <SafeAreaView style={{}} />
        <View style={{ paddingTop: 50, width: "100%" }}>

          {/* <BannerAd

            unitId={adUnit}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          /> */}
        </View>
        <TopTab
          option={option}
          handleChangeTab={handleChange}
          currentIndex={index}
        />


        {/* {[0, 1, 2, 3, 4, 5, 6].map((ele, index) => (
        <List key={index} />
      ))} */}
        <View>
          {/* <CusText>hello</CusText> */}
        </View>
        <FlatList
          style={styles.scrollView}
          data={filtered}
          // renderItem={renderItem}
          renderItem={({ item, index }) => <List key={index} item={item} />}
          keyExtractor={(item, index) => `${item}_${index}`}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.5} // Load data when 50% near the bottom
        // ListFooterComponent={() => loading && <CusText>Loading...</CusText>}
        />

      </View>
    </LinearGradient>
  );
  // </ScrollView>
};


const List = ({ item }) => {
  const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setLoaded(true);
  //     rewarded.show();
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
  return (
    <View>
      <View style={{ marginVertical: 7, marginHorizontal: 5 }}>
        <Text style={{ fontWeight: "700", fontSize: 16, color: "white" }}>{item?.date_wise}</Text>
      </View>
      <View style={styles.blockLiveContainer}>
        <Boxes match={item} />
      </View>
    </View>
  );
};

export default UserPage;

const styles = StyleSheet.create({
  scrollView: {

    gap: 5,
    marginBottom: 100,
    paddingBottom: 50,
    // marginHorizontal: 20,
  },
  blockLiveContainer: {
    gap: 20,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
});
