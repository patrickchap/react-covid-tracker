import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import "./Header.css";

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

// pass this a function to update the cards
const Header: React.FC<props> = ({
  countries,
  handleCountry,
  currentCountry,
}) => {
  const changeCountry = async (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    handleCountry: (country: string) => void
  ) => {
    console.log(e.target.value);
    handleCountry(String(e.target.value));
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
            onChange={(e) => changeCountry(e, handleCountry)}
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

      <div className="header_option--button">
        {/* switch between Map View and Graph View */}
        <Button variant="outlined">Graph View</Button>
        {/* <ButtonGroup variant="outlined">
          <Button >Map</Button>
          <Button>Graph</Button>
        </ButtonGroup> */}
      </div>
    </div>
  );
};

export default Header;
