// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import InfoBar from "./components/InfoBar/InfoBar";
import MapLeaflet from "./components/Map/MapLeaflet";
import Graph from "./components/Graph/Graph";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

interface InfoBoxCall {
  updated?: number;
  cases?: number;
  todayCases?: number;
  deaths?: number;
  todayDeaths?: number;
  recovered?: number;
  todayRecovered?: number;
  // "active": 6486882,
  // "critical": 61742,
  // "casesPerOneMillion": 2897,
  // "deathsPerOneMillion": 101.5,
  // "tests": 400448002,
  // "testsPerOneMillion": 51547.88,
  // "population": 7768466989,
  // "oneCasePerPeople": 0,
  // "oneDeathPerPeople": 0,
  // "oneTestPerPeople": 0,
  // "activePerOneMillion": 835.03,
  // "recoveredPerOneMillion": 1969.66,
  // "criticalPerOneMillion": 7.95,
  // "affectedCountries": 215
}

interface countryCall {
  updated?: number;
  country?: string;
  countryInfo?: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases?: number;
  todayCases?: number;
  deaths?: number;
  todayDeaths?: number;
  recovered?: number;
  todayRecovered?: number;
  active?: number;
  critical?: number;
  casesPerOneMillion?: number;
  deathsPerOneMillion?: number;
  tests?: number;
  testsPerOneMillion?: number;
  population?: number;
  continent?: number;
  oneCasePerPeople?: number;
  oneDeathPerPeople?: number;
  oneTestPerPeople?: number;
  activePerOneMillion?: number;
  recoveredPerOneMillion?: number;
  criticalPerOneMillion?: number;
}

interface InfoNumbers {
  totalCases?: number | null;
  dailyCases?: number | null;
}

interface mapstate {
  location: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<string | string[]>("Worldwide");
  const [currentCountry, setCurrentCountry] = useState("Worldwide");
  const [cases, setCases] = useState<InfoNumbers>();
  const [deaths, setDeaths] = useState<InfoNumbers>();
  const [recoveries, setRecoveries] = useState<InfoNumbers>();
  const [countriesMap, setCountriesMap] = useState([]);
  const [showData, setShowData] = useState<string>("cases");
  const [infoBarClicked, setInfoBarClicked] = useState("Cases");
  // const [mapViewIsTrue, setMapViewIsTrue] = useState();
  const [mapState, setMapState] = useState<mapstate>({
    location: {
      lat: 25.185059,
      lng: -38.202698,
    },
    zoom: 2,
  });

  const handleCountry = (country: string) => {
    setCurrentCountry(country);
  };

  const handleSetShowData = (data: string) => {
    setShowData(data);
  };

  //fetch countries for header country list
  //https://disease.sh/v3/covid-19/countries/{country}
  useEffect(() => {
    const getCountries = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countryList: string[] = data.map((country: object) => {
            let c: countryCall = country;
            return c.country;
          });
          setCountries(countryList);
          setCountriesMap(data);
        });
    };
    getCountries();
  }, []);

  //https://disease.sh/v3/covid-19/all for cards data
  useEffect(() => {
    const getInfoData = async () => {
      let url =
        currentCountry === "Worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : "https://disease.sh/v3/covid-19/countries/" + currentCountry;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const boxInfo: InfoBoxCall = data;

          const cases: InfoNumbers = {
            totalCases: boxInfo.cases,
            dailyCases: boxInfo.todayCases,
          };
          setCases(cases);
          const recover: InfoNumbers = {
            totalCases: boxInfo.recovered,
            dailyCases: boxInfo.todayRecovered,
          };
          setRecoveries(recover);
          const death: InfoNumbers = {
            totalCases: boxInfo.deaths,
            dailyCases: boxInfo.todayDeaths,
          };
          setDeaths(death);
        });
    };
    getInfoData();
  }, [currentCountry]);

  return (
    <Router>
      <div className="app">
        <div className="app_body">
          <Header
            countries={countries}
            handleCountry={handleCountry}
            currentCountry={currentCountry}
            setMapState={setMapState}
          />

          <div className="app_infoBar">
            {cases && (
              <InfoBar
                boxName="Cases"
                today={cases.dailyCases ? cases.dailyCases : 0}
                total={cases.totalCases ? cases.totalCases : 0}
                data={"cases"}
                setShowData={handleSetShowData}
                setInfoBarClicked={setInfoBarClicked}
                infoBarClicked={infoBarClicked}
              />
            )}
            {recoveries && (
              <InfoBar
                boxName="Recovered"
                today={recoveries.dailyCases ? recoveries.dailyCases : 0}
                total={recoveries.totalCases ? recoveries.totalCases : 0}
                data={"recovered"}
                setShowData={handleSetShowData}
                setInfoBarClicked={setInfoBarClicked}
                infoBarClicked={infoBarClicked}
              />
            )}

            {deaths && (
              <InfoBar
                boxName="Deaths"
                today={deaths.dailyCases ? deaths.dailyCases : 0}
                total={deaths.totalCases ? deaths.totalCases : 0}
                data={"deaths"}
                setShowData={handleSetShowData}
                setInfoBarClicked={setInfoBarClicked}
                infoBarClicked={infoBarClicked}
              />
            )}
          </div>
          <div className="app_bottom">
            {/* <Map /> */}
            <Switch>
              <Route path="/graph">
                <Graph
                  currentCountry={currentCountry}
                  infoBarClicked={infoBarClicked}
                  setInfoBarClicked={setInfoBarClicked}
                />
              </Route>
              <Route path="/">
                <div className="app_map">
                  <MapLeaflet
                    countriesMap={countriesMap}
                    data={showData}
                    mapState={mapState}
                  />
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
