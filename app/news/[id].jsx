import { useLocalSearchParams } from "expo-router/build";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import RenderHtml from "react-native-render-html";
import { fetchNewsDetailsById } from "../api";
import CusText from "../component/CusText";
import { LinearGradient } from "expo-linear-gradient";
import StickyFooter from "../component/StickyFooter";

const NewsComponent = ({ }) => {
  const [news, setNews] = useState({});
  const { id } = useLocalSearchParams();
  // "news_id": 79,
  //        "title": "Virat Kohli in the last 22 innings in ODIs\"",
  //        "description": "Virat Kohli",
  //        "image": "http://172.105.48.215/webroot/img/news/1205660522_news.jpg",
  //        "pub_date": "06 Nov, 2023 | 12:28 PM",
  //        "content": [
  //            "<p>Virat Kohli&#39;s recent performance in ODIs has been nothing short of extraordinary. In his last 22 innings, he has consistently showcased his remarkable batting skills with some incredible scores, including several centuries and an impressive unbeaten innings. This level of consistency and excellence is truly remarkable and a testament to his immense talent and dedication to the game.</p>\r\n\r\n<p>113(91), 113(87), 4(9), 166*(110), 8(10), 11(9), 36(27), 4(9), 31(35), 54(72), 4(7), 122*(94), 3(12), 56(61), 85(116), 55*(56), 16(18), 103*(97), 95(104), 0(9), 88*(94) &amp; 101*(121)</p>\r\n"
  //        ]
  const getNewsDetails = async () => {
    const resp = await fetchNewsDetailsById(id);
    setNews(resp);
  };
  useEffect(() => {
    getNewsDetails();
  }, []);

  // return <CusText>Loading</CusText>;
  return (
    <ScrollView style={{ backgroundColor: "#24AEFA" }} >
      <LinearGradient colors={['#24AEFA', '#FFA26B', '#333433']} style={styles.scrollView} >
        {/* <StickyFooter /> */}
        <Image
          source={{ uri: news?.image || "" }}
          style={{ width: "100%", height: 300 }}
        />
        <CusText
          style={{ color: "#fff", fontSize: 19, fontWeight: 700, marginTop: 10 }}
        >
          {news?.title || ""}
        </CusText>
        <CusText style={{ color: "gray", fontSize: 11 }}>
          {" "}
          {news?.pub_date ?? ""}{" "}
        </CusText>
        <RenderHtml
          style={{ color: "black" }}
          contentWidth={Dimensions.get("window").width}
          source={{
            html: news?.content?.[0] || "",
          }}
          tagsStyles={{
            h1: {
              color: "blue",
              fontSize: 24,
            },
            p: {
              color: "#fff",
              fontSize: 16,
            },
          }}
        />
      </LinearGradient>
    </ScrollView>
  );
};

export default NewsComponent;

const styles = StyleSheet.create({
  scrollView: {
    minHeight: '100%',
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
