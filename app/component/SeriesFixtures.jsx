import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Boxes } from "./Carousel";

const SeriesFixtures = ({ data }) => {
  return (
    <FlatList
      style={{ marginBottom: 140, gap: 10, marginTop: 10 }}
      data={data}
      // renderItem={renderItem}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            gap: 10,
            marginVertical: 7,
          }}
        >
          <Boxes match={item} key={index} />
        </View>
      )}
      keyExtractor={(item, index) => `${item}_${index}`}
    />
  );
};

export default SeriesFixtures;

const styles = StyleSheet.create({});
