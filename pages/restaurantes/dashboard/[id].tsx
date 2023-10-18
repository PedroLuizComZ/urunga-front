import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [restaurant, setRestaurant] = useState<any>({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACK_URL}/checkin/dashboard/${id}`)
      .then(function (response) {
        setRestaurant(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log(restaurant);

  if (Object.keys(restaurant).length === 0) {
    return (
      <form>
        <h1>Dashboard</h1>
      </form>
    );
  }

  const data = {
    labels: ["Masculino", "Feminino", "Outro"],
    datasets: [
      {
        label: "# de acessos",
        data: [
          restaurant.dataLine.masculino,
          restaurant.dataLine.feminino,
          restaurant.dataLine.outro,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const agelabels = ["Até 20", "20-30", "30-40", "40-50", "50-60", "60+"];

  const dataLine = {
    labels: agelabels,
    datasets: [
      {
        label: "Faixa etaria",
        data: [
          restaurant.pieData["<20"],
          restaurant.pieData["20-29"],
          restaurant.pieData["30-39"],
          restaurant.pieData["40-49"],
          restaurant.pieData["50-59"],
          restaurant.pieData["60+"],
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const checkindLabel = ["1-10", "11-20", "21-31"];

  const checkinLine = {
    labels: checkindLabel,
    datasets: [
      {
        label: "Acesso neste mês por faixa",
        data: restaurant.checkinLine,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <form>
      <h1>Dashboard</h1>
      <hr />
      <Bar
        options={options}
        data={checkinLine}
        width={500}
        className="bar-chart"
      />
      <br />
      <br />

      <Pie data={data} className="pie-chart" width={500} options={options} />
      <br />
      <br />
      <Bar
        options={options}
        data={dataLine}
        width={500}
        className="bar-chart"
      />

      <Link href={`/restaurantes/${id}`}>
        <p role="button">Voltar</p>
      </Link>
      <hr />
    </form>
  );
}
