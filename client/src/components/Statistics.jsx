import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import UnixTime from "./UnixTime";
import BatteryLeftGraph from "./BatteryLeftGraph";
import SosSwitch from "./SosSwitch";
Chart.register(...registerables);
const Statistics = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [SmartWatchData, setSmartWatchData] = useState([]);
  const [SmartWatchbattery, setSmartWatchbattery] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("/api/v1/getData");
    console.log(data.result);
    console.log(data.data);

    setSmartWatchData(data.result);
    setSmartWatchbattery(data.data);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className=" mt-32 ">
          <h1 className="text-3xl mb-5">unix_timestamp v/s no.of entries</h1>
          <UnixTime SmartWatchData={SmartWatchData} />
        </div>
        <div className="mt-32 ">
          <h1 className="text-3xl mb-5"> battery_left v/s no.of entries </h1>
          <BatteryLeftGraph SmartWatchData={SmartWatchbattery} />
        </div>
        <div className="mt-32">
          <h1 className="text-3xl mb-5 w-full">
            {" "}
            panic switch, sos switch, gsm msg v/s no.of entries
          </h1>
          <SosSwitch SmartWatchData={SmartWatchbattery} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
