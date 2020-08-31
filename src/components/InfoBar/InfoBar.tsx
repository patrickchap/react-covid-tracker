import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import "./InfoBar.css";
// interface InfoNumbers {
//   totalCases?: number | null;
//   dailyCases?: number | null;
// }

interface Props {
  boxName: string;
  total?: number;
  today?: number;
  data: string;
  setShowData: (data: string) => void;
  setInfoBarClicked: React.Dispatch<React.SetStateAction<string>>;
  infoBarClicked: string;

  //   cases: InfoNumbers;
}

const InfoBar: React.FC<Props> = ({
  boxName,
  total,
  today,
  setShowData,
  data,
  infoBarClicked,
  setInfoBarClicked,
}) => {
  const [classname, setClassname] = useState("infoBar");

  const handleClassNameChange = () => {
    boxName === "Recovered"
      ? setClassname("infoBar-clicked-green")
      : setClassname("infoBar-clicked");
    setInfoBarClicked(boxName);
  };

  useEffect(() => {
    // console.log(infoBarClicked, " ", boxName);
    if (infoBarClicked === boxName && boxName === "Recovered") {
      setClassname("infoBar-clicked-green");
    } else if (infoBarClicked === boxName) {
      setClassname("infoBar-clicked");
    } else {
      setClassname("infoBar");
    }
  }, [infoBarClicked, boxName]);

  return (
    <Card
      className={classname}
      onClick={(e) => {
        setShowData(data);
        handleClassNameChange();
      }}
    >
      <CardContent>
        <h3>{`${boxName}`}</h3>
        <h5>{`Daily ${boxName}: ${today}`}</h5>
        <h4>{`Total ${boxName} ${total}`}</h4>
      </CardContent>
    </Card>
  );
};

export default InfoBar;
