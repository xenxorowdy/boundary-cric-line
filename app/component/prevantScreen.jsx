import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CusText from "./CusText";

const BackgroundFetchScreen = () => {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetch(
  //       "https://www.iana.org/assignments/media-types/application/vnd.api+json"
  //     )
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .catch((error) => console.log(error));
  //   }, 5000); // Fetches data every 5 seconds

  //   return () => clearInterval(interval); // Clears the interval on component unmount
  // }, []);
  // console.log(JSON.stringify(data));

  return <View></View>;
};

export default BackgroundFetchScreen;
