import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [promotions, setPromotions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const storeKeys = Object.keys(data)
    const promotionsArray = [];
    storeKeys.forEach(item => {
      if(item.startsWith('promotions')) {
        promotionsArray.push(data[item])
        delete data[item];
      }
    });

    data.promotions = promotionsArray
    let user = await Cookies.get("user");
    const { email } = JSON.parse(user);
    const params = data;
    params.email = email;
    axios
      .post("http://localhost:8080/store/", params)
      .then(function (response) {
        router.push("/restaurantes");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Cadastro de restaurante</h1>
      <input
        placeholder={"Nome"}
        {...register("name", { required: "Nome Obrigatório" })}
      />
      <input
        placeholder={"Descrição"}
        {...register("description", { required: "Descrição Obrigatório" })}
      />
      <input
        placeholder={"Logo"}
        {...register("logo", { required: "logo Obrigatório" })}
      />

      <p role="button" onClick={() => setPromotions([...promotions, ""])}>Adicionar Promoção</p>

      {promotions.map((_item, index) => {
        return (
          <input
            placeholder={"Promoção"}
            {...register(`promotions${index}`, { required: "Texto da Promoção Obrigatório" })}
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
