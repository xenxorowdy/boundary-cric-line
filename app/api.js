import axios from "axios";
import FormData from "form-data";

const apiUrl = "http://apicricketchampion.in/apiv3/";
const apiToken = "36d9271738c6011f1ce9a56ec5453057";
export const LiveMatches = async () => {

  return await fetch(apiUrl + "liveMatchList/" + apiToken)
    .then((response) => response.json())
    .then((json) => json)
};

/**
 * Asynchronous function to fetch the list of upcoming matches from the API.
 *
 * @return {Promise} A Promise that resolves to the JSON response from the API.
 */
export const RecentMatches = async () => {
  return await fetch(apiUrl + "upcomingMatches/" + apiToken)
    .then((response) => response.json())
    .then((json) => json.data)
    .catch((error) => console.log(error));
};

export const matchPlayerSquadsInfo = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");
  const formdata = new FormData();
  formdata.append("match_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch(
    apiUrl + "squadsByMatchId/" + apiToken,
    requestOptions
  );

  return await response.json();
};
export const squadsBySeriesId = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");
  const formdata = new FormData();
  formdata.append("series_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch(
    apiUrl + "squadsBySeriesId/" + apiToken,
    requestOptions
  );
  const resp = await response.json();

  return resp.data;

}

export const HomeMatch = async () => {
  return await fetch(apiUrl + "homeList/" + apiToken)
    .then((response) => response.json())
    .then((json) => json)
};

// export const liveMatchById = async (id) => {
//   const myHeaders = new Headers();

//   myHeaders.append("Content-Type", "multipart/form-data");

//   const formdata = new FormData();
//   formdata.append("match_id", id);
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: formdata,
//     redirect: "follow",
//   };

//   return await fetch(apiUrl + "liveMatch/" + apiToken, requestOptions)
//     .then((response) => response.json())
//     .then((result) => result.data)
//     .catch((error) => console.log(error));
// };
export const liveMatchById = async (id) => {
  try {
    const data = new FormData();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    data.append("match_id", id);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };
    let url = `${apiUrl}liveMatch/${apiToken}`;
    return await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result.data)

  } catch (error) {
    console.log(error);
    throw error; // Optionally rethrow the error for handling further up the call stack
  }
};
export const commentaryMatchById = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("match_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "commentary/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const scorecardByMatchId = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("match_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "scorecardByMatchId/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const matchOddHistory = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("match_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "matchOddHistory/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const fetchmatchInfo = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("match_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "matchInfo/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const pointsTableBySeriesId = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("series_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "pointsTable/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};
export const groupPointsTable = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("series_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "pointsTable/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const seriesList = async () => {
  return await fetch(apiUrl + "seriesList/" + apiToken)
    .then((response) => response.json())
    .then((json) => json.data)
    .catch((error) => console.log(error));
};
export const newsList = async () => {
  return await fetch(apiUrl + "news/" + apiToken)
    .then((response) => response.json())
    .then((json) => json.data)
    .catch((error) => console.log(error));
};

export const fetchNewsDetailsById = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("news_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "newsDetail/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const getVenueResult = async (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("series_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "venuesBySeriesId/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const getseriesFixtures = async (id) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");

  const formdata = new FormData();
  formdata.append("series_id", id);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch(apiUrl + "upcomingMatchesBySeriesId/" + apiToken, requestOptions)
    .then((response) => response.json())
    .then((result) => { console.log("result", result); return result.data })
    .catch((error) => console.log(error));
}