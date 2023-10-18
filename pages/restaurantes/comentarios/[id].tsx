import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import StarFullImage from "../../../public/images/star-full.png";

import { useRouter } from "next/router";

export default function Comments() {
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
      .get(`${process.env.NEXT_PUBLIC_BACK_URL}/store/${id}`)
      .then(function (response) {
        const restaurantData = response.data;
        restaurantData.rating = restaurantData.rating.map((item: any) => {
          return {
            ...item,
            answer: item.answer || "",
            openAnswer: item.answer && item.answer !== "",
          };
        });
        setRestaurant(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleOpenAnswer = (index: number) => {
    const restaurantData = restaurant;
    restaurantData.rating = restaurantData.rating.map(
      (item: any, indexItem: number) => {
        if (indexItem === index) {
          return {
            ...item,
            openAnswer: !item.openAnswer,
          };
        }
        return item;
      }
    );

    setRestaurant({ ...restaurantData });
  };

  const handleChangeAnswer = (index: number, text: string) => {
    const restaurantData = restaurant;
    restaurantData.rating = restaurantData.rating.map(
      (item: any, indexItem: number) => {
        if (indexItem === index) {
          return {
            ...item,
            answer: text,
          };
        }
        return item;
      }
    );

    setRestaurant({ ...restaurantData });
  };

  const handleSubmit = () => {
    console.log(restaurant);

    const payload = restaurant.rating.map((item: any) => {
      return {
        userId: item.userId,
        commentary: item.commentary,
        ratingValue: item.ratingValue,
        answer: item.answer,
      };
    });

    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_URL}/store/rating/${id}`, {
        rating: payload,
      })
      .then(function (response) {
        router.push("/restaurantes");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log(restaurant);

  if (Object.keys(restaurant).length === 0) {
    return (
      <form>
        <h1>Comentarios</h1>
      </form>
    );
  }

  return (
    <form>
      <h1>Comentarios</h1>
      <hr />

      <ul>
        <ul>
          {restaurant &&
            restaurant.rating.map((item: any, index: number) => {
              return (
                <li key={index} className="comments-item">
                  <p>{item.userName.split(" ")[0]}</p>
                  <p>
                    {item.ratingValue}{" "}
                    {Array(item.ratingValue)
                      .fill(0)
                      .map((item) => {
                        return (
                          <Image
                            src={StarFullImage}
                            alt="user image"
                            width={15}
                            height={15}
                          />
                        );
                      })}
                  </p>
                  <p>{item.commentary}</p>
                  {!item.openAnswer && (
                    <button
                      type="button"
                      onClick={() => handleOpenAnswer(index)}
                    >
                      Responder
                    </button>
                  )}
                  {item.openAnswer && (
                    <>
                      <input
                        placeholder="Resposta"
                        type="text"
                        value={item.answer}
                        onChange={(e) =>
                          handleChangeAnswer(index, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleOpenAnswer(index);
                          handleChangeAnswer(index, "");
                        }}
                      >
                        Apagar
                      </button>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      </ul>

      <button type="button" onClick={handleSubmit}>
        Salvar
      </button>

      <Link href={`/restaurantes/${id}`}>
        <p role="button">Voltar</p>
      </Link>
      <hr />
    </form>
  );
}
