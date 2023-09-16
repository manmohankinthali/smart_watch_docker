import React from "react";
import { Line } from "react-chartjs-2";

const UnixTime = ({ SmartWatchData }) => {
  return (
    <>
      <Line
        className="h-80"
        data={{
          labels: SmartWatchData.map((data) => {
            let Rawdate = new Date(data._id);
            const dayOfMonth = Rawdate.getDate();

            // Get the short month name
            const shortMonth = Rawdate.toLocaleString("en-US", {
              month: "short",
            });
            return `${dayOfMonth} ${shortMonth}  Entries:${data.count}`;
          }),
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
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  // Get the data point's index and retrieve the corresponding device ID
                  const dataIndex = context.dataIndex;
                  const deviceId = SmartWatchData[dataIndex].device_ids;
                  const count = SmartWatchData[dataIndex].count;
                  // Return the label to be displayed in the tooltip

                  return deviceId;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // Remove the X-axis gridlines
              },
            },
            y: {
              grid: {
                display: false, // Remove the Y-axis gridlines
              },
            },
          },
        }}
      />
    </>
  );
};

export default UnixTime;
