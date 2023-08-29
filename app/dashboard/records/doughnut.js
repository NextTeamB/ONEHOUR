import { useState, useEffect } from "react";
import { Chart } from "chart.js";
import { useSelector } from "react-redux";

function Example() {
  const chartInfo = useSelector((state) => state.chart);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(chartInfo.challengeTimeAvg);
  }, []);

  useEffect(() => {
    console.log(chartInfo.challengeTimeAvg);
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: "",
        datasets: [
          {
            data: [value, 100 - value],
            borderColor: ["rgb(106, 180, 255)", "rgba(206, 206, 206)"],
            backgroundColor: ["rgb(106, 180, 255 )", "rgba(206, 206, 206)"],
            borderWidth: 2,
            weight: 1000,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        cutoutPercentage: 70,
      },
    });
  }, [value]);

  return (
    <>
      {/* Doughnut chart */}
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto  shadow-xl pb-2">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default Example;
