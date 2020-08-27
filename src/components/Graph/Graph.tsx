import React, { useEffect } from "react";
import "./Graph.css";
import { Line } from "react-chartjs-2";

interface props {
  currentCountry: string;
}

interface dailyCases {
  data: Date;
  value: number;
}

const fetchAll = (url: string) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(Object.keys(data?.cases));

      for (let [key, value] of Object.entries(data?.cases)) {
        console.log(key + " " + value);
      }
      // console.log("graph data ass >>>>> ", data);
      // console.log(data?.cases);
    });
};

const fetchCountry = (url: string) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("graph data  country >>>>> ", data);
      console.log(data?.timeline.cases);
    });
};

const Table: React.FC<props> = ({ currentCountry }) => {
  useEffect(() => {
    const getInfoData = async () => {
      currentCountry === "Worldwide"
        ? fetchAll("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        : fetchCountry(
            `https://disease.sh/v3/covid-19/historical/${currentCountry}`
          );
    };
    getInfoData();
  }, [currentCountry]);

  return <div>Graph</div>;
};

export default Table;
