import { StyleSheet } from "react-native";
export const checkColor = (status = "") => {
  switch (status.toLowerCase()) {
    case "live":
      return "#DD0525";
    case "upcoming":
      return "#EC8F5E";
    case "finished":
      return "#74E291";
    default:
      return "#F8FAE5";
  }
};
export const commonStyle = ({ status }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    liveIcon: {
      minWidth: 30,
      paddingHorizontal: 4,
      paddingVertical: 2,
      marginRight: 2,
      textAlign: "center",
      height: "auto",
      backgroundColor: checkColor(status),
      justifyContent: "flex-end",
      borderRadius: 3,
      alignItems: "center",
      alignContent: "center",
    },
  });
