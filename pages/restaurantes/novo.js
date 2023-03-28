import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "../../utils/getSession";

export default function Home() {
  const router = useRouter();
  const [promotions, setPromotions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    data.logo = await getBase64(data.logo[0]);

    const params = data;
    const session = getSession();

    params.email = session.email;

    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_URL}/store/`, params)
      .then(function (response) {
        router.push("/restaurantes");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleAddPromotion = async () => {
    setPromotions([...promotions, ""]);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Cadastro de restaurante</h1>
      <input
        placeholder={"Nome"}
        {...register("name", { required: "Nome é Obrigatório" })}
      />
      <input
        placeholder={"Descrição"}
        {...register("description", { required: "Descrição é Obrigatório" })}
      />
      <input
        placeholder={"Logo"}
        type="file"
        {...register("logo", { required: "Logo é Obrigatório" })}
      />
      <select
        name="category"
        id="category"
        {...register("category", { required: "Tipo do restaurante é Obrigatório" })}
      >
        <option value="" disabled selected>
          Tipo do restaurante
        </option>
        <option value="restaurante">Restaurante</option>
        <option value="lanche">Lanche</option>
        <option value="pizza">Pizzaria</option>
        <option value="barzinho">Barzinho</option>
        <option value="doces">Doces</option>
        <option value="doces">Japonês</option>
        <option value="cafereria">Cafereria</option>
        <option value="massas">Massas</option>
      </select>
      <select
        name="city"
        id="city"
        {...register("city", { required: "Cidade é Obrigatório" })}
      >
        <option value="" disabled selected>
          Cidade
        </option>
        <option value="jundiai">Jundiaí</option>
        <option value="varzeapta">Várzea Paulista</option>
        <option value="campolimpopta">Campo Limpo Paulista</option>
      </select>
      <p role="button" onClick={handleAddPromotion}>
        Adicionar Promoção
      </p>
      {promotions.map((_item, index) => {
        return (
          <input
            placeholder={"Promoção"}
            {...register(`promotions${index}`, {
              required: "Texto da Promoção Obrigatório",
            })}
            key={index}
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
      {errors.category && <p role="alert">{errors.category?.message}</p>}
      {errors.city && <p role="alert">{errors.city?.message}</p>}
    </form>
  );
}
