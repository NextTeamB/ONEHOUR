import { useEffect } from "react";
import { Chart } from "chart.js";
import styles from "./records.module.scss";
function Example({ value, id }) {
  useEffect(() => {
    var ctx = document.getElementById(id).getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: "",
        datasets: [
          {
            data: [value, 100 - value],
            borderColor: ["rgb(106, 180, 255)", "rgb(208, 239, 255)"],
            backgroundColor: ["rgb(106, 180, 255)", "rgb(208, 239, 255)"],
            borderWidth: 2,
            weight: 1000,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        hover: { mode: null },
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
          <canvas id={`${id}`} className={styles.doughnutCanvas}></canvas>
        </div>
      </div>
    </>
  );
}

export default Example;
