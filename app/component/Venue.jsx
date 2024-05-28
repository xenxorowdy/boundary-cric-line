import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import CusText from "./CusText";

const Ven = ({ item }) => {
  return (
    <View

      style={[
        styles.subTopHeading,
        styles.titles,
        {

          marginVertical: 10,
          gap: 5,
          padding: 5,
          justifyContent: "center"
        },
      ]}
    >
      <View>
        <Image
          source={{
            uri: item?.image || "",
          }}
          style={{
            width: Dimensions.get("window").width - 40,
            height: 200,
            borderRadius: 4,
          }}
        />
      </View>

      <View style={{
        gap: 10, paddingVertical: 10, width: Dimensions.get("window").width - 40,
      }}>
        <CusText
          style={{

            fontWeight: 500,
            fontSize: 14,
          }}
        >
          {item?.name}
        </CusText>
        <CusText style={{ fontSize: 10 }}>{item?.place}</CusText>
      </View>
    </View>
  );
};
const Venue = ({ item }) => {

  return (
    <FlatList
      data={item}
      keyExtractor={(item, index) => `${item}_${index}`}
      renderItem={({ item, index }) => <Ven item={item} key={index} />}
    />
  );
};

export default Venue;

const styles = StyleSheet.create({
  subTopHeading: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  titles: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    color: "#FFFFFF",
    minHeight: 30,
    justifyContent: "center",
    borderRadius: 6,

    alignContent: "center",
    marginHorizontal: 8,

    justifyContent: "center",
    // width: Dimensions.get("screen").width - 20,
  },
});
