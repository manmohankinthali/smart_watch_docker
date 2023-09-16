import React from "react";
import { Bar } from "react-chartjs-2";
const SosSwitch = ({ SmartWatchData }) => {
  return (
    <>
      <Bar
        className="h-80 "
        data={{
          labels: SmartWatchData.map((data, index) => index + 1),
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
              label: "gsm_msg",
              data: SmartWatchData.map((data) => data.structure.gsm_msg),
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
              data: SmartWatchData.map((data) => data.structure.panic_switch),
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
        options={{
          scales: {
            x: {
              grouped: true, // Enable grouped bars
            },
            y: {
              grouped: true, // Enable grouped bars
            },
          },
        }}
      />
    </>
  );
};

export default SosSwitch;
