import React from "react";
import { View } from "react-native";
import TopTab from "./TopTab";
import { SafeAreaView } from "react-native-safe-area-context";

const ScoreBoardLive = (props) => {
  const option = [
    "Live",
    "Info",
    "Commentary",
    "scorecard",
    "History",
    "Points",
  ];
  const [selectTab, setSelectTab] = useState("Live");
  const handleChangeTab = (event) => {
    setSelectTab(event.target.value);
  };
  return (
    <SafeAreaView>
      <View>
        <TopTab
          option={option}
          handleChangeTab={handleChangeTab}
          selectedTab={selectTab}
        />
      </View>
    </SafeAreaView>
  );
};


export default ScoreBoardLive;
