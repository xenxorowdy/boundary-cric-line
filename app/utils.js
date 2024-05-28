import { Text } from "react-native";
import styled from "styled-components/native";

export const CusText = styled.Text`
  color: "white";
  font-weight: 400;
`;
export const CusLargeText = styled.Text`
  color: "white";
  font-size: "20px";
  font-weight: 500;
`;

export const formatDateAndTime = (inputDate) => {
  const currentDate = new Date();
  const inputDateTime = new Date(inputDate);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (isToday(inputDateTime, currentDate)) {
    return formatTime(inputDateTime, userTimeZone);
  } else if (isTomorrow(inputDateTime, currentDate)) {
    return "Tomorrow " + formatTime(inputDateTime, userTimeZone);
  } else if (isYesterday(inputDateTime, currentDate)) {
    return "Yesterday " + formatTime(inputDateTime, userTimeZone);
  } else {
    return formatDateTime(inputDateTime, userTimeZone);
  }
};

const isToday = (inputDate, currentDate) => {
  return (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  );
};

const isTomorrow = (inputDate, currentDate) => {
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  return (
    inputDate.getDate() === tomorrow.getDate() &&
    inputDate.getMonth() === tomorrow.getMonth() &&
    inputDate.getFullYear() === tomorrow.getFullYear()
  );
};

const isYesterday = (inputDate, currentDate) => {
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  return (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear()
  );
};

const formatTime = (inputDate, timeZone) => {
  const timeString = inputDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: timeZone,
  });
  return `Today ${timeString}`;
};

const formatDateTime = (inputDate, timeZone) => {
  const dateTimeString = inputDate.toLocaleString("en-US", {
    timeZone: timeZone,
  });
  return dateTimeString;
};


export const ratefetch = (number) => {
try {
  
  const integerPart = Math.floor(number * 100);
  const desiredValue = integerPart % 100;
    return desiredValue?.toString()||0;
} catch (error) {
  return ""
}
}

export const getScore = (data) => {

  const { batting_team, team_b_scores, team_a_scores, team_b_over, team_a_over } = data;
  console.log(batting_team, team_b_scores, team_a_scores, team_b_over, team_a_over,data);
  if (batting_team === data.team_b_id) {
    console.log(`${data?.team_b_scores} (${data?.team_b_over})`, "123data");
    return `${data?.team_b_scores} (${data?.team_b_over})`;
  }
  if (batting_team === data.team_a_id) {
    return `${data?.team_a_scores} (${data?.team_a_over})`;
  }
}

export const inningsuffix = (inning) => {
  switch (inning) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export const checkBGColor = (text) => {
  if (text == "w") {
    return "red";
  } else if (text >= 4) {
    return "lightblue"
  } else if (text >= 2) {
    return "lightgreen"
  }
  else if (text > 0) {
    return "green"
  }
  else {
    return "lightgrey"
  }
}