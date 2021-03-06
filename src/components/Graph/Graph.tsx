import React, { useEffect, useState } from "react";
import "./Graph.css";
import { Line, ChartData } from "react-chartjs-2";

interface props {
  currentCountry: string;
  infoBarClicked: string;
  setInfoBarClicked: React.Dispatch<React.SetStateAction<string>>;
}

interface dailyCases {
  data: Date;
  value: number;
}

const options = { responsive: true, maintainAspectRatio: false };

const color = {
  Red: "rgba(235, 26, 26,0.2)",
  RedOutline: "rgba(235, 26, 26,1)",
  Green: "rgba(26, 255, 0,0.2)",
  GreenOutline: "rgba(26, 255, 0,1)",
  // Deaths: "rgba(235, 26, 26,0.2)"
};

const Table: React.FC<props> = ({
  currentCountry,
  infoBarClicked,
  setInfoBarClicked,
}) => {
  const [data, setData] = useState<ChartData<any>>();
  const [isData, setIsData] = useState(true);

  useEffect(() => {
    const formatData = (data: Number[], labels: String[], type: string) => {
      const retData = {
        labels: labels,
        datasets: [
          {
            label: `Daily ${type}`,
            data: data,
            fill: true,
            backgroundColor:
              infoBarClicked === "Recovered" ? color.Green : color.Red,
            borderColor:
              infoBarClicked === "Recovered"
                ? color.GreenOutline
                : color.RedOutline,
          },
        ],
      };
      return retData;
    };
    const fetchAll = (url: string) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // let chartdata = [];
          let lastValue;
          let chartData: Number[] = [];
          let chartLabels: String[] = [];
          // console.log(`info bar >>>> ${infoBarClicked}`);
          // console.log(data);
          let type: string = infoBarClicked.toLocaleLowerCase();
          for (let [key, value] of Object.entries(data[type])) {
            if (lastValue) {
              chartData.push(Number(value) - lastValue);
              chartLabels.push(key);
              // chartdata.push({ key: key, value: Number(value) - lastValue });
            }
            lastValue = Number(value);
          }
          setData(formatData(chartData, chartLabels, infoBarClicked));
          setIsData(true);
          // console.log("charData >>> ", chartdata);
          // return formatData(chartData, chartLabels);
        });
    };

    // check response code
    const fetchCountry = async (url: string) => {
      // console.log("use effect");
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        let chartData = [];
        let chartLabels = [];
        let lastValue;
        for (let [key, value] of Object.entries(
          data.timeline[infoBarClicked.toLocaleLowerCase()]
        )) {
          if (lastValue) {
            chartData.push(Number(value) - lastValue);
            chartLabels.push(key);
          }
          lastValue = Number(value);
        }
        setData(formatData(chartData, chartLabels, infoBarClicked));
        setIsData(true);
      } else {
        setData({});
        setIsData(false);
        return Promise.reject("404");
      }
    };

    const getInfoData = async () => {
      currentCountry === "Worldwide"
        ? fetchAll("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        : fetchCountry(
            `https://disease.sh/v3/covid-19/historical/${currentCountry}?lastdays=120`
          );
    };

    getInfoData();
  }, [currentCountry, infoBarClicked]);

  return (
    <div className="graph">
      {isData && <Line data={data} options={options} />}
      {!isData && (
        <div>Country not found or doesn't have any historical data</div>
      )}
    </div>
  );
};

export default Table;
