import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { seriesList } from "../api";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import CusText from "../component/CusText";
import { LinearGradient } from "expo-linear-gradient";
const SeriesInfo = () => {
  const [seriesData, setSeriesData] = useState();
  const getSeriesList = async () => {
    const seriesData = await seriesList();
    setSeriesData(seriesData);
  };
  useEffect(() => {
    getSeriesList();
  }, []);

  return (
    <LinearGradient colors={['#24AEFA', '#FFA26B', '#333433']}  >

      <ScrollView style={styles.scrollView}>
        <View style={{ justifyContent: "center" }}>
          <FlatList
            data={seriesData}
            keyExtractor={(item, index) => `${item}_${index}`}
            renderItem={({ item, index }) => (
              <SeriesComp key={index} item={item} />
            )}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const SeriesComp = ({ item }) => (
  <TouchableOpacity
    style={[
      styles.subTopHeading,
      styles.titles,
      { justifyContent: "space-between", paddingHorizontal: 1 },
    ]}
    onPress={() => {
      router.push("/series/" + item.series_id);
    }}
  >
    {/* <Image
      source={{ uri: item.image }}
      style={{ width: 30, height: 30, tintColor: "white" }}
    /> */}

    <View>
      <Image
        source={{ uri: item?.image || "" }}
        style={{ width: 50, height: 50, borderRadius: 50, objectFit: "contain" }}
      />
    </View>
    <View style={{ gap: 5, width: "80%" }}>
      <CusText style={{ fontSize: 13, fontWeight: 600 }}   >{item.series}</CusText>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <CusText >{String(item?.total_matches) ?? "-"} Matches </CusText>
        <CusText style={{ fontSize: 12 }} >{"*" + item.series_date + ""} </CusText>
      </View>
    </View>

    <AntDesign name="right" size={25} color="black" />

  </TouchableOpacity>
);

export default SeriesInfo;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "grey",
  },
  subTopHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  titles: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    marginVertical: 5,
    color: "#FFFFFF",
    minHeight: 45,
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 1,
    alignContent: "center",
    marginHorizontal: 1,
    justifyContent: "center",
    // width: Dimensions.get("screen").width - 20,
  },
  scrollView: {

    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    gap: 20,
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 5,
    // marginHorizontal: 20,
  },
  divider: {
    borderWidth: 1,
    borderColor: "#cccc",
  },
});
