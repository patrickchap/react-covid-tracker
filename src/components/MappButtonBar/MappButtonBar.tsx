import React, { useState, useEffect } from "react";
import "./MappButtonBar.css";
import { Button, FormControl, Select, MenuItem } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

interface mapstate {
  location: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

interface props {
  countries: Array<string> | string;
  handleCountry: (country: string) => void;
  currentCountry: string;
  // change state to send country name and coords[lat long]
  setMapState: React.Dispatch<React.SetStateAction<mapstate>>;
  // updateCountries: (total: number, today: number, update: string) => void;
}

const MappButtonBar: React.FC<props> = ({
  countries,
  handleCountry,
  currentCountry,
  setMapState,
}) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue === 0) {
      history.push("/");
    } else if (newValue === 2) {
      history.push("/graph");
    } else if (newValue === 1) {
      history.push("/bar");
    }
    setValue(newValue);
  };

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    if (value === 0) {
      history.push("/");
    }

    console.log(location.pathname, " location");
  }, []);

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
    <div className="mappButtonBar">
      <div className="mappButtonBar__left">
        <Paper className="root">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab className="mappButtonBar__left__firstBtn" label="Map" />
            <Tab label="Bar Chart" />
            <Tab className="mappButtonBar__left__lastBtn" label="Trending" />
          </Tabs>
        </Paper>

        {/* <Button
          className="app_middle__btn"
          onClick={() => {
            history.push("/");
          }}
        >
          Map
        </Button>
        <Button className="app_middle__btn">Bar Chart</Button>
        <Button
          className="app_middle__btn"
          onClick={() => {
            history.push("/graph");
          }}
        >
          Trending
        </Button> */}
      </div>

      {/* <div className="mappButtonBar__right">
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
      </div> */}
    </div>
  );
};

export default MappButtonBar;
