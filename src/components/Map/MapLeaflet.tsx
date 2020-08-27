import React from "react";
import "./MapLeaflet.css";
import { Map as LeafletMap, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// type options = {
//   cases: number;
//   recoveries: number;
//   deaths: number;
// };

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

const location = {
  lat: 25.185059,
  lng: -38.202698,
};
interface mapstate {
  location: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

interface props {
  countriesMap: Array<object>;
  data: string;
  mapState: mapstate;

  //pass lat: , long and zoon
}
function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

const MapLeaflet: React.FC<props> = ({ countriesMap, data, mapState }) => {
  return (
    <div className="map">
      <LeafletMap center={mapState.location} zoom={2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {countriesMap.map((country) => {
          let c: countryCall = country;
          if (hasKey(c, data)) {
            let r: any = c[data];
            let color: any = data === "recovered" ? "#1aff00" : "#eb1a1a";
            return (
              c.countryInfo?.lat &&
              c.countryInfo?.long &&
              c.cases &&
              c.recovered &&
              c.deaths && (
                <Circle
                  center={[c.countryInfo.lat, c.countryInfo.long]}
                  radius={Math.sqrt(r) * 500}
                  color={color}
                ></Circle>
              )
            );
          }
        })}

        {/* <Circle
          center={[location.lat, location.lng]}
          radius={990000}
          color={"#eb1a1a"}
        ></Circle> */}
      </LeafletMap>
    </div>
  );
};

export default MapLeaflet;
