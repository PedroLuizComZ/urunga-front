import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getSession } from "../../utils/getSession";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const { handleSubmit } = useForm();
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  const onSubmit = () => {
    router.push("/restaurantes/novo");
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClick = async (id: any) => {
    router.push(`/restaurantes/${id}`);
  };

  const handleDelete = async (event: any, id: any) => {
    event.preventDefault();
    event.stopPropagation();
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_URL}/store/${id}`)
      .then(function (response) {
        alert("Restaurante excluido com sucesso.");
        loadData();
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("userType");
    router.push("/login");
  };

  const loadData = async () => {
    const session = getSession();

    if (session._id === "6436859da102160040d7dced") {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACK_URL}/store/`)
        .then(function (response) {
          setRestaurants(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACK_URL}/store/list`, {
          email: session.email,
        })
        .then(function (response) {
          setRestaurants(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Lista de Restaurantes</h1>
      <button type="submit">Cadastrar novo restaurante</button>
      <br />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descricao</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant : any) => {
            return (
              <tr
                key={restaurant._id}
                onClick={() => handleClick(restaurant._id)}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.description}</td>
                <td onClick={(e) => handleDelete(e, restaurant._id)}>
                  Excluir
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" onClick={handleLogout} style={{ marginTop: 40 }}>
        Sair
      </button>
    </form>
  );
}
