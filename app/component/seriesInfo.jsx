import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import CusText from "./CusText";
import { seriesList } from "../api";

import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
const SeriesInfo = () => {
  const [seriesData, setSeriesData] = useState();
  const getSeriesList = async () => {
    const seriesData = await seriesList();
    setSeriesData(seriesData?.slice(0, 3));
  };
  useEffect(() => {
    getSeriesList();
  }, []);

  return (
    <View style={{ justifyContent: "center", gap: 10 }}>
      <View style={styles.subTopHeading}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }} >Series</Text>

        <TouchableOpacity activeOpacity={0.75} onPress={() => { router.push("/series") }} >

          <Text style={{ fontSize: 15, fontWeight: "700", color: "#fff" }} >View More </Text>

        </TouchableOpacity>
      </View>
      <FlatList
        data={seriesData}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item, index }) => <SeriesComp key={index} item={item} />}
      />
    </View>
  );
};

const SeriesComp = ({ item }) => (

  <TouchableOpacity
    activeOpacity={0.7}
    style={[
      styles.subTopHeading,
      styles.titles,
      { justifyContent: "space-between", },
    ]}
    onPress={() => { router.push("/series/" + item.series_id) }}
  >
    <Image
      source={{
        uri: item?.image || "",
      }}
      style={{ width: 50, height: 50, borderRadius: 18, backgroundColor: "#fff" }}
    />
    <View style={{ gap: 5, width: "58%" }}>
      <CusText>{item.series}  </CusText>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <CusText>{String(item?.total_matches) ?? "-"} Matches </CusText>
        <CusText>{"*" + item.series_date + ""} </CusText>
      </View>
    </View>

    <AntDesign name="right" size={24} color="black" />

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
    gap: 10,
    paddingVertical: 5,
  },
  titles: {
    paddingHorizontal: 5,
    backgroundColor: "#ffffff",
    color: "#FFFFFF",
    minHeight: 50,
    width: "100%",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 1,
    alignContent: "center",
    marginHorizontal: 8,
    justifyContent: "center",
    // width: Dimensions.get("screen").width - 20,
  },
});
