import React from "react";
import { View, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export default function Table({
  header = ["Batter", "R", "B", "4s", "6s", "SR"],
}) {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header  >
          <DataTable.Title style={{ width: 31000 }}> ele </DataTable.Title>
          {header.map((ele, index) => (
            <DataTable.Title key={index}> {ele} </DataTable.Title>
          ))}
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>john@kindacode.com</DataTable.Cell>
          <DataTable.Cell numeric>33</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Bob</DataTable.Cell>
          <DataTable.Cell>test@test.com</DataTable.Cell>
          <DataTable.Cell numeric>105</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Mei</DataTable.Cell>
          <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
          <DataTable.Cell numeric>23</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});
