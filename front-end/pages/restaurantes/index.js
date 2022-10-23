import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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

  const handleClick = async (id) => {
    router.push(`/restaurantes/${id}`)
  }

  const loadData = async () => {
    let user = await Cookies.get("user");
    const { email } = JSON.parse(user);
    axios
      .post("http://localhost:8080/store/list", {email})
      .then(function (response) {
        setRestaurants(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
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
        </tr>
        </thead>
       <tbody>
       {restaurants.map((restaurant) => {
          return (
            <tr key={restaurant._id} onClick={() => handleClick(restaurant._id)}>
              <td>{restaurant.name}</td>
              <td>{restaurant.description}</td>
            </tr>
          );
        })}
       </tbody>
     
      </table>
      <ul></ul>
    </form>
  );
}
