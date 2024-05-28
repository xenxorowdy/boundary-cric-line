import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TopTab = ({
  option = ["Home", "Live"],
  currentIndex = 0,
  handleChangeTab,
}) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={option}
      gap={40}
      style={styles?.CategoryScrollViewStyle}
      renderItem={({ item, index }) => (
        <View
          styles={styles?.CategoryScrollViewContainer}
        >
          <TouchableOpacity
            style={styles.CategoryScrollViewItem}
            onPress={() => handleChangeTab(item, index)}
          >
            <Text
              style={[
                styles.CategoryText,
                currentIndex == index ? { color: "#21DA8C" } : {},
              ]}
            >
              {item}
            </Text>
            {currentIndex === index && (
              <View
                style={[styles.ActiveCategory, { width: 2 + item.length * 10 }]}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  CategoryScrollViewStyle: {
    flexDirection: "row",
    height: 50,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: 10,
  },
  ActiveCategory: {
    height: 2,
    bottom: 7,
    backgroundColor: "#21DA8C",
  },
  CategoryScrollViewItem: {
    alignItems: "center",
  },
  CategoryText: {
    fontSize: 18,
    minHeight: 25,
    fontWeight: "bold",
    margin: 10,

    color: "#ccc",
  },
});
export default TopTab;
