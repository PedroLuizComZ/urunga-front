import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { parseJwt } from "../../utils/parseJwt";


export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [restaurant, setRestaurant] = useState({});

  const [veggie, setVeggie] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [kids, setKids] = useState(false);
  const [accessibility, setAccessibility] = useState(false);

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
        setVeggie(response.data.veggie);
        setPetFriendly(response.data.petFriendly);
        setKids(response.data.kids);
        setAccessibility(response.data.accessibility);
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
    data.promotions = restaurant.promotions;

    if (data.logo.length === 0) {
      data.logo = restaurant.logo;
    } else {
      data.logo = await getBase64(data.logo[0]);
    }

    let user = Cookies.get("token");
    const { email } = parseJwt(`${user}`);
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

  const handleRemovePromotion = (id) => {
    const restaurantCopy = restaurant;
    restaurantCopy.promotions.splice(id, 1);
    setRestaurant({ ...restaurantCopy });
  };

  const handleDashboardClick = () => {
    router.push(`/restaurantes/dashboard/${id}`);
  }

  const handleCommentsClick = () => {
    router.push(`/restaurantes/comentarios/${id}`);
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Editar restaurante</h1>
      <button type="button" onClick={handleDashboardClick}>Dashboard </button>
      <button type="button" onClick={handleCommentsClick}>Comentarios </button>
      
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

      <hr />

      <input
        placeholder={"Nome para contato"}
        {...register("contactName")}
        defaultValue={restaurant.contactName}
      />
      <input
        placeholder={"Telefone para contato"}
        {...register("contactPhone")}
        defaultValue={restaurant.contactPhone}
      />
      <input
        placeholder={"Email para contato"}
        {...register("contactEmail")}
        defaultValue={restaurant.contactEmail}
      />
      <input
        placeholder={"Chave Pix"}
        {...register("pix")}
        defaultValue={restaurant.pix}
      />

      <hr />

      <input
        placeholder={"Instagram"}
        {...register("instagram")}
        defaultValue={restaurant.instagram}
      />
      <input
        placeholder={"Google"}
        {...register("google")}
        defaultValue={restaurant.google}
      />

      <input
        placeholder={"Review"}
        {...register("review")}
        defaultValue={restaurant.review}
      />

      <div className="checkbox-container">
        <p>Veggie</p>
        <label className="switch">
          <input
            id="veggie"
            name="veggie"
            type="checkbox"
            {...register("veggie")}
            checked={veggie}
            onChange={(e) => setVeggie(e.target.checked)}
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
            checked={petFriendly}
            onChange={(e) => setPetFriendly(e.target.checked)}
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
            checked={kids}
            onChange={(e) => setKids(e.target.checked)}
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
            checked={accessibility}
            onChange={(e) => setAccessibility(e.target.checked)}
          />
          <span className="slider round" />
        </label>
      </div>
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
      <p
        role="button"
        onClick={() => {
          const restaurantCopy = restaurant;
          restaurantCopy.promotions.push("");
          setRestaurant({ ...restaurantCopy });
        }}
      >
        Adicionar Promoção
      </p>

      {restaurant.promotions.map((item, index) => {
        return (
          <div key={index} className="promotion-wrapper">
            <input
              placeholder={"Promoção"}
              {...register(`promotions${index}`, {
                required: "Texto da Promoção Obrigatório",
              })}
              onChange={(e) => {
                const restaurantCopy = restaurant;
                restaurantCopy.promotions[index] = e.target.value;
                setRestaurant({ ...restaurantCopy });
              }}
              value={item}
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
    </form>
  );
}
