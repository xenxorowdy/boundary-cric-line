import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { newsList } from "../api";
import CusText from "./CusText";
import { Link } from "expo-router";

const HomeNew = ({ id }) => {
  const [newList, setNewList] = useState(id);
  const getSeriesList = async () => {
    const res = await newsList();
    setNewList(res);
  };
  useEffect(() => {
    if (id !== undefined) return;
    getSeriesList();
  }, []);
  useEffect(() => {
    setNewList(id);
  }, [id]);
  return (
    <View style={{ justifyContent: "center", marginTop: 30, gap: 8 }}>
      <View style={styles.subTopHeading}>
        <Text style={{ fontWeight: 500, fontSize: 20, color: "#fff" }}>Top News</Text>
        {/* <TouchableOpacity>
          <CusText>View More </CusText>
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={newList}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item, index }) => <NewsComp key={index} item={item} />}
        style={{ gap: 10 }}
      />
    </View>
  );
};
function removeHtmlTags(text = "") {
  try {
    return text.replace(/(<([^>]+)>)/gi, "");
  } catch (error) {
    return "";
  }
}

const { height, width } = Dimensions.get('window');
const isTablet = height / width > 1.6;
const width1 = Dimensions.get("window").width - 40;
const componentHeight = isTablet ? 200 : 350;

const NewsComp = ({ item }) => (
  <Link
    href={"/news/" + item.news_id}
    style={[
      styles.subTopHeading,
      styles.titles,
      {
        justifyContent: "space-between",
        marginVertical: 10,
        rowGap: 5,
        gap: 5,
        alignItems: "center"
      },
    ]}
  >
    <View>
      <Image
        source={{
          uri: item?.image || "",
        }}
        style={{
          width: width1,
          minHeight: componentHeight,
          objectFit: "fill"
        }}
      />
    </View>

    <View style={{ paddingVertical: 0, gap: 10, paddingVertical: 10, borderRadius: 8, borderColor: 10 }}>
      <CusText
        style={{
          fontWeight: 500,
          fontSize: 14,
          width: width1,
        }}
      >
        {item.title}
      </CusText>
      <CusText style={{ fontSize: 9 }}>{item?.pub_date}</CusText>
    </View>
  </Link>
);

export default HomeNew;

const styles = StyleSheet.create({
  subTopHeading: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",


  },
  titles: {
    backgroundColor: "#c3c3c3",
    marginVertical: 5,
    color: "#FFFFFF",
    minHeight: 30,
    width: width1,
    justifyContent: "center",
    borderRadius: 10,
    alignContent: "center",
    marginHorizontal: 8,

    justifyContent: "center",
    // width: Dimensions.get("screen").width - 20,
  },
});
