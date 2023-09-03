import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { Bar } from "react-chartjs-2";
Chart.register(...registerables);
const Statistics = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [SmartWatchData, setSmartWatchData] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("/api/v1/getData");
    console.log(data);
    setSmartWatchData(data.result);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className=" mt-32 ">
          <h1 className="text-3xl mb-5">unix_timestamp v/s no.of entries</h1>
          <Line
            className="h-80"
            data={{
              labels: SmartWatchData.map((data) => data._id),
              datasets: [
                {
                  label: "No.of entries",
                  data: SmartWatchData.map((data) => data.count),
                  backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
                  tension: 0.3,
                },
              ],
            }}
          />
        </div>
        {/* <div className="mt-32 ">
          <h1 className="text-3xl mb-5"> battery_left v/s no.of entries </h1>
          <Bar
            className="h-80"
            data={{
              labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
              datasets: [
                {
                  label: "Unix Timestamp",
                  data: SmartWatchData.map(
                    (data) => data.structure.unix_timestamp
                  ),
                  backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
                },
              ],
            }}
          />
        </div>
        <div className="mt-32">
          <h1 className="text-3xl mb-5 w-full">
            {" "}
            panic switch, sos switch, gsm msg v/s no.of entries
          </h1>
          <Line
            className="h-80 "
            data={{
              labels: SmartWatchData.map((data) => data.device_id),
              datasets: [
                {
                  label: "SoS switch",
                  data: SmartWatchData.map((data) => data.structure.sos_switch),
                  // data.map((data) => data.structure.battery_left),
                  backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
                },
                {
                  label: "Battery Left",
                  data: SmartWatchData.map(
                    (data) => data.structure.battery_left
                  ),
                  // data.map((data) => data.structure.battery_left),
                  backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
                },
                {
                  label: "Panic switch",
                  data: SmartWatchData.map(
                    (data) => data.structure.panic_switch
                  ),
                  // data.map((data) => data.structure.battery_left),
                  backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
                },
              ],
            }}
          />
        </div> */}
      </div>
    </>
  );
};

export default Statistics;
