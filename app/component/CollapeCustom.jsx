import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Collapsible from "react-native-collapsible";
import CusText from "./CusText";

export default function CollapseCustom({ team, children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View >
      <TouchableOpacity
        activeOpacity={0.96}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <View style={styles.collapseContainer}>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Image style={{ width: 20, height: 20, borderRadius: 50 }} source={{ uri: team?.flag }} />
            <CusText style={{ fontWeight: 600 }}>{team?.name}</CusText>
          </View>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <CusText style={{ fontWeight: 600 }}> {team?.score}-{team?.wicket} </CusText>
            <CusText style={{ fontWeight: 600 }}>({team?.over})</CusText>
            {isCollapsed ? (
              <AntDesign name="down" size={16} color="black" />
            ) : (
              <AntDesign name="up" size={16} color="black" />
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={{}}>
          {/* Your expandable content here */}
          {children}
        </View>
      </Collapsible>
    </View>
  );
}
const styles = StyleSheet.create({
  collapseContainer: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
  },
});
