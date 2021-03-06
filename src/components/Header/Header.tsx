import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./Header.css";

interface mapstate {
  location: {
    lat: number;
    lng: number;
  };
  zoom: number;
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

interface props {
  countries: Array<string> | string;
  handleCountry: (country: string) => void;
  currentCountry: string;
  // change state to send country name and coords[lat long]
  setMapState: React.Dispatch<React.SetStateAction<mapstate>>;
  // updateCountries: (total: number, today: number, update: string) => void;
}

// pass this a function to update the cards
const Header: React.FC<props> = ({
  countries,
  handleCountry,
  currentCountry,
  setMapState,
}) => {
  const changeCountry = async (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    getCountries(e.target.value);
  };

  const getCountries = async (country: any) => {
    if (country === "Worldwide") {
      setMapState({
        location: {
          lat: 25.185059,
          lng: -38.202698,
        },
        zoom: 2,
      });
      return;
    }

    fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMapState({
          location: {
            lat: data.countryInfo.lat,
            lng: data.countryInfo.long,
          },
          zoom: 4,
        });
      });
  };

  return (
    <div className="header">
      <div className="header_lable">
        <h2>Covid-19-Tracker</h2>
      </div>

      <div className="header_dropdown">
        <FormControl>
          <Select
            labelId="label"
            id="select"
            value={currentCountry}
            variant="outlined"
            onChange={(e) => {
              changeCountry(e);
              handleCountry(String(e.target.value));
            }}
          >
            <MenuItem value={"Worldwide"}>{"Worldwide"}</MenuItem>
            {typeof countries !== "string" &&
              countries.map((country, countryIndex) => (
                <MenuItem key={countryIndex} value={country}>
                  {country}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      {/* <div className="header_option--button">
        <Button
          key="btn"
          variant="outlined"
          onClick={() => {
            // console.log(history.location);
            mapViewIsTrue === true ? history.push("/graph") : history.push("/");
            setMapViewIsTrue(!mapViewIsTrue);
            // history.push("/graph");
          }}
        >
          {mapViewIsTrue === true ? "Show Graph" : "Show Map"}
        </Button>

      </div> */}
    </div>
  );
};

export default Header;
