import React from "react";
import { Bar } from "react-chartjs-2";

const BatteryLeftGraph = ({ SmartWatchData }) => {
  return (
    <>
      <Bar
        className="h-80"
        data={{
          labels: SmartWatchData.map((data, index) => index + 1),
          datasets: [
            {
              label: "Battery Left",
              data: SmartWatchData.map((data) => data.structure.battery_left),
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
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const dataIndex = context.dataIndex;
                  const batteryLeft =
                    SmartWatchData[dataIndex].structure.battery_left;
                  const deviceId = SmartWatchData[dataIndex].device_id;
                  return [
                    `Device ID: ${deviceId}`,
                    `Battery Left: ${batteryLeft}`,
                  ];
                },
              },
            },
          },
        }}
      />
    </>
  );
};

export default BatteryLeftGraph;
