import React, { useEffect } from "react";
import "./MapLeaflet.css";
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
}
function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

const MapLeaflet: React.FC<props> = ({ countriesMap, data, mapState }) => {
  useEffect(() => {}, []);

  return (
    <div className="map">
      <LeafletMap
        center={mapState.location}
        zoom={mapState.zoom}
        key={Math.random()}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {countriesMap.map((country, indx) => {
          let c: countryCall = country;
          let i = 0;
          if (hasKey(c, data)) {
            let r: any = c[data];
            let color: any = data === "recovered" ? "#1aff00" : "#eb1a1a";
            i = i + Math.random();

            return (
              c.countryInfo?.lat &&
              c.countryInfo?.long &&
              c.cases &&
              c.recovered &&
              c.deaths && (
                <div className="mapleaflet" key={countriesMap.length + i}>
                  <Circle
                    key={i++}
                    center={[c.countryInfo.lat, c.countryInfo.long]}
                    radius={Math.sqrt(r) * 200}
                    color={color}
                  >
                    <Popup key={countriesMap.length + i}>
                      <h4 className="country">{c.country}</h4>
                      <div>{`Cases: ${c.cases}`}</div>
                      <div>{`Deaths: ${c.deaths}`}</div>
                      <div>{`Recovered: ${c.recovered}`}</div>
                    </Popup>
                  </Circle>
                </div>
              )
            );
          } else {
            return -1;
          }
        })}
      </LeafletMap>
    </div>
  );
};

export default MapLeaflet;
