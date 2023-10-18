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

  const handleAddPromotion = () => {
    setPromotions([...promotions, ""]);
  };

  const handleRemovePromotion = (id) => {
    const promotionsCopy = promotions;
    promotionsCopy.splice(id, 1);
    setPromotions([...promotionsCopy]);
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

      <hr />

      <input placeholder={"Nome para contato"} {...register("contactName")} />
      <input placeholder={"Telefone para contato"} {...register("contactPhone")} />
      <input placeholder={"Email para contato"} {...register("contactEmail")} />
      <input placeholder={"Chave Pix"} {...register("pix")} />

      <hr />

      <input placeholder={"Instagram"} {...register("instagram")} />
      <input placeholder={"Google"} {...register("google")} />

      <input placeholder={"Review"} {...register("review")} />

      <div className="checkbox-container">
        <p>Veggie</p>
        <label className="switch">
          <input
            id="veggie"
            name="veggie"
            type="checkbox"
            {...register("veggie")}
          />
          <span className="slider round" />
        </label>
      </div>

      <div className="checkbox-container">
        <p>Pet Friendly</p>
        <label className="switch">
          <input
            id="petFriendly"
            name="petFriendly"
            type="checkbox"
            {...register("petFriendly")}
          />
          <span className="slider round" />
        </label>
      </div>

      <div className="checkbox-container">
        <p>Espaço kids</p>
        <label className="switch">
          <input
            id="kids"
            name="kids"
            type="checkbox"
            {...register("kids")}
          />
          <span className="slider round" />
        </label>
      </div>

      <div className="checkbox-container">
        <p>Acessibilidade</p>
        <label className="switch">
          <input
            id="accessibility"
            name="accessibility"
            type="checkbox"
            {...register("accessibility")}
          />
          <span className="slider round" />
        </label>
      </div>

      <input
        placeholder={"Logo"}
        type="file"
        {...register("logo", { required: "Logo é Obrigatório" })}
      />
      <select
        name="category"
        id="category"
        {...register("category", {
          required: "Tipo do restaurante é Obrigatório",
        })}
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
          <div key={index} className="promotion-wrapper">
            <input
              placeholder={"Promoção"}
              {...register(`promotions${index}`, {
                required: "Texto da Promoção Obrigatório",
              })}
              onChange={(e) => {
                const promotionsCopy = promotions;
                promotionsCopy[index] = e.target.value;
                setPromotions([...promotionsCopy]);
              }}
              value={promotions[index]}
            />
            <label onClick={() => handleRemovePromotion(index)}>X</label>
          </div>
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
