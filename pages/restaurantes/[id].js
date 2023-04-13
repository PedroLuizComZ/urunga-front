import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [restaurant, setRestaurant] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACK_URL}/store/${id}`)
      .then(function (response) {
        setRestaurant(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const onSubmit = async (data) => {
    const storeKeys = Object.keys(data);
    const promotionsArray = [];
    storeKeys.forEach((item) => {
      if (item.startsWith("promotions")) {
        promotionsArray.push(data[item]);
        delete data[item];
      }
    });
    data.promotions = promotionsArray;

    if (data.logo.length === 0) {
      data.logo = restaurant.logo;
    } else {
      data.logo = await getBase64(data.logo[0]);
    }

    let user = await Cookies.get("user");
    const { email } = JSON.parse(user);
    const params = data;
    params.email = email;
    axios
      .put(`${process.env.NEXT_PUBLIC_BACK_URL}/store/${id}`, params)
      .then(function (response) {
        router.push("/restaurantes");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (Object.keys(restaurant).length === 0) {
    return (
      <form>
        <h1>Editar restaurante</h1>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Editar restaurante</h1>
      <input
        placeholder={"Nome"}
        {...register("name", { required: "Nome Obrigatório" })}
        defaultValue={restaurant.name}
      />
      <input
        placeholder={"Descrição"}
        {...register("description", { required: "Descrição Obrigatório" })}
        defaultValue={restaurant.description}
      />
      <input placeholder={"Logo"} type="file" {...register("logo")} />
      <select
        name="category"
        id="category"
        {...register("category", {
          required: "Tipo do restaurante é Obrigatório",
        })}
        defaultValue={restaurant.category}
      >
        <option value="" disabled>
          Tipo do restaurante
        </option>
        <option value="restaurante">Restaurante</option>
        <option value="lanche">Lanche</option>
        <option value="pizza">Pizzaria</option>
        <option value="barzinho">Barzinho</option>
        <option value="doces">Doces</option>
        <option value="japones">Japonês</option>
        <option value="cafeteria">Cafeteria</option>
        <option value="massas">Massas</option>
      </select>
      <select
        name="city"
        id="city"
        {...register("city", { required: "Cidade é Obrigatório" })}
        defaultValue={restaurant.city}
      >
        <option value="" disabled>
          Cidade
        </option>
        <option value="jundiai">Jundiaí</option>
        <option value="varzeapta">Várzea Paulista</option>
        <option value="campolimpopta">Campo Limpo Paulista</option>
      </select>
      <p role="button" onClick={() => setPromotions([...promotions, ""])}>
        Adicionar Promoção
      </p>

      {restaurant.promotions.map((item, index) => {
        return (
          <input
            placeholder={"Promoção"}
            {...register(`promotions${index}`, {
              required: "Texto da Promoção Obrigatório",
            })}
            key={index}
            defaultValue={item}
          />
        );
      })}

      <button type="submit">Confirmar </button>
      <Link href="/restaurantes">
        <p role="button">Voltar a lista</p>
      </Link>
      <hr />

      {errors.name && <p role="alert">{errors.name?.message}</p>}
      {errors.description && <p role="alert">{errors.description?.message}</p>}
      {errors.logo && <p role="alert">{errors.logo?.message}</p>}
    </form>
  );
}
