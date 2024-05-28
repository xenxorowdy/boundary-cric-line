import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CollapseCustom from "./CollapeCustom";
import { ScoreBoradTable, styles } from "./ScoreBoard";
import { Image } from "react-native-svg";

const PointsTable = ({ matchPointsTable = [] }) => {
  return (
    <View>
      <View>
        <View
          style={[
            styles.box,
            { borderBottomWidth: 0.5, marginBottom: 0, paddingHorizontal: 10 },
            { borderColor: "#fff" },
          ]}
        >
          <Text style={styles.TextColor}>Team</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 15,
            }}
          >
            <Text style={styles.TextColor}>P</Text>
            <Text style={styles.TextColor}>W</Text>
            <Text style={styles.TextColor}>L</Text>
            <Text style={styles.TextColor}>T</Text>
            <Text style={[styles.TextColor, { width: 45, justifyContent: "center", textAlign: "center" }]}>PTS</Text>
            <Text
              style={[
                styles.TextColor,
                { width: 50, justifyContent: "center", textAlign: "center" },
              ]}
            >
              NRR
            </Text>
          </View>
        </View>
        <FlatList
          data={matchPointsTable}
          keyExtractor={(item, index) => `${item}_${index}`}
          renderItem={({ item }) => (
            <View
              style={[
                styles.rowBox,
                { paddingVertical: 18, paddingHorizontal: 8 },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: item.flag,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 18,
                    backgroundColor: "white",
                    objectFit: "cover",
                  }}
                />
                <Text
                  style={[
                    styles.TextColor,
                    {
                      textAlign: "center",
                    },
                  ]}
                >
                  {item.teams}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,

                }}
              >
                <Text style={styles.TextColor}>{item.P}</Text>
                <Text style={styles.TextColor}>{item.W}</Text>
                <Text style={styles.TextColor}>{item.L}</Text>
                <Text style={styles.TextColor}>{item.NR}</Text>
                <Text style={[styles.TextColor, { width: 45, justifyContent: "center", textAlign: "center" }]}>{item.Pts}</Text>
                <Text style={[styles.TextColor, { width: 48, justifyContent: "center", textAlign: "center" }]}>{item.NRR}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PointsTable;
