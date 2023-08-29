import { useEffect } from "react";
import { Chart } from "chart.js";

function Example() {
  useEffect(() => {
    var ctx = document.getElementById("myChart1").getContext("2d");
    var myChart1 = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: "",
        datasets: [
          {
            data: [70, 30],
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
  }, []);

  return (
    <>
      {/* Doughnut chart */}
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto  shadow-xl pb-2">
          <canvas id="myChart1"></canvas>
        </div>
      </div>
    </>
  );
}

export default Example;
