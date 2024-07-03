import Head from "next/head";
import {
  InformationContainer,
  ItemList,
  ModalCommentsContainer,
  ModalContainer,
  ModalReviewContainer,
  QrCodeContainer,
  RestaurantContainer,
} from "../../../styles/Restaurant";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IStores } from "../../../interfaces/IStores";
import {
  createRatingController,
  listStoreByIdController,
} from "../../../controllers/Restaurants.controller";
import QRCode from "qrcode";
import { Modal, ModalBody } from "reactstrap";
import Cookies from "js-cookie";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { parseJwt } from "../../../utils/parseJwt";
import { getCheckinByIdController } from "../../../controllers/Checkin.controller";

import StarImage from "../../../public/images/star.png";
import StarFullImage from "../../../public/images/star-full.png";
import { calcRating } from "../../../utils/calcRating";
import { getUserProfileController } from "../../../controllers/Auth.controller";
import { getAnalytics, logEvent } from "firebase/analytics";

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [hasValidSubscription, setHasValidSubscription] = useState(false);

  const canvasRef = useRef<any>(null);
  const textareaRef = useRef<any>(null);

  const token = Cookies.get("token");

  const toggle = () => setModal(!modal);

  const toggleStar = () => setStartModal(!startModal);

  const handleClick = () => {
    router.push(`/app/list`);
  };

  const [restaurant, setRestaurant] = useState<IStores | null>(null);
  const [loading, setLoading] = useState(true);
  const [enableChecking, setEnableChecking] = useState(false);
  const [reviewValue, setReviewValue] = useState(5);

  useEffect(() => {
    if (router.isReady) {
      loadData();
      checkSubscription();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (restaurant) {
      const analytics = getAnalytics();
      const parsedToken = parseJwt(`${token}`);
      logEvent(analytics, "page_view", {
        page_title: `${restaurant.name}`,
        user_id: parsedToken.data._id,
      });
    }
  }, [restaurant]);

  const loadData = async () => {
    const result = await listStoreByIdController(`${id}`);
    await handleCheckin();
    setRestaurant(result);
    setLoading(false);
  };

  const handleCheckin = async () => {
    const parsedToken = parseJwt(`${token}`);
    const checkins = await getCheckinByIdController(
      `${parsedToken.data._id}`,
      `${id}`
    );

    if (checkins.status === "success") {
      setEnableChecking(true);
    }
  };

  const checkSubscription = async () => {
    let jwtToken: any = Cookies.get("token");

    const parsedJwt = await parseJwt(jwtToken);

    const userProfile = await getUserProfileController(parsedJwt.data._id);

    try {
      const session = await stripe.checkout.sessions.retrieve(
        userProfile?.checkoutSessionId
      );

      if (session && session.status === "complete") {
        setHasValidSubscription(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRating = async () => {
    const parsedToken = parseJwt(`${token}`);

    const payload = {
      userId: parsedToken.data._id,
      commentary: textareaRef.current.value,
      ratingValue: reviewValue,
    };

    await createRatingController(`${id}`, payload);

    setReviewValue(5);
    setStartModal(false);

    await loadData();
  };

  const createSubscription = async () => {
    const parsedToken = parseJwt(`${token}`);

    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        customer_email: parsedToken.data.email,
        billing_address_collection: "required",
        phone_number_collection: {
          enabled: true,
        },
        tax_id_collection: {
          enabled: true,
        },
        custom_fields: [
          {
            key: "cpf",
            label: {
              custom: "CPF",
              type: "custom",
            },
            type: "numeric",
          },
        ],
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_ID,
            quantity: 1,
          },
        ],
        mode: "subscription",
      });

      window.location.href = session.url;
    } catch (error) {
      alert("Ocorreu um erro, tente novamente mais tarde");
    }
  };

  const handleClickQrCode = async () => {
    if (!enableChecking) {
      return alert("QR Code utilizado essa semana, aguarde 7 dias após o uso");
    }
    const token = Cookies.get("token");

    if (!document.querySelector('input[name="radio"]:checked')) {
      return alert("Selecione uma das promoções");
    }
    toggle();

    console.log(
      `${
        window.location.origin
      }/app/validador?token=${token}&date=${new Date().getTime()}&restaurantId=${id}&promotionId=${
        document.querySelector('input[name="radio"]:checked')!.id
      }`
    );

    setTimeout(() => {
      QRCode.toCanvas(
        canvasRef.current,
        `${
          window.location.origin
        }/app/validador?token=${token}&date=${new Date().getTime()}&restaurantId=${id}&promotionId=${
          document.querySelector('input[name="radio"]:checked')!.id
        }` || " ",
        (error) => error && console.error(error)
      );
    }, 500);
  };

  const handleGoogleClick = () => {
    window.open(restaurant?.google);
  };

  const handleInstagramClick = () => {
    window.open(`https://www.instagram.com/${restaurant?.instagram}`);
  };

  const handleReviewClick = () => {
    const analytics = getAnalytics();
    const parsedToken = parseJwt(`${token}`);
    logEvent(analytics, "review_click", {
      content_id: restaurant?.name,
      user_id: parsedToken.data._id,
    });
    window.open(restaurant?.review);
  };

  return (
    <>
      <Head>
        <title>Urunga - Restaurante</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && (
        <RestaurantContainer>
          <Image
            src={"/icons/back.svg"}
            alt={"go back"}
            height={30}
            width={30}
            className="back-icon"
            onClick={handleClick}
          />
          <Image
            src={"/logo.svg"}
            alt={"RatingStar"}
            height={88}
            width={88}
            className="logo-icon"
          />
          <ItemList>
            <ul>
              <li>
                <div className="image-holder">
                  <Image
                    src={restaurant!.logo}
                    alt={"RatingStar"}
                    height={150}
                    width={150}
                  />
                </div>
                <div className="info-box">
                  <p>{restaurant!.name} </p>
                  <div className="social-media-container">
                    {restaurant && restaurant.veggie && (
                      <div className="tooltip-container">
                        <Image
                          src={"/images/vegan.png"}
                          alt={"pet"}
                          height={30}
                          width={30}
                          style={{ marginRight: 10 }}
                        />
                        <span className="tooltiptext">Veggie</span>
                      </div>
                    )}
                    {restaurant && restaurant.petFriendly && (
                      <div className="tooltip-container">
                        <Image
                          src={"/images/pet.png"}
                          alt={"pet"}
                          height={30}
                          width={30}
                          style={{ marginRight: 10 }}
                        />
                        <span className="tooltiptext">Pet Friendly</span>
                      </div>
                    )}
                    {restaurant && restaurant.kids && (
                      <div className="tooltip-container">
                        <Image
                          src={"/images/kids.png"}
                          alt={"pet"}
                          height={30}
                          width={30}
                          style={{ marginRight: 10 }}
                        />
                        <span className="tooltiptext">Espaço kids</span>
                      </div>
                    )}
                    {restaurant && restaurant.accessibility && (
                      <div className="tooltip-container">
                        <Image
                          src={"/images/chair.png"}
                          alt={"pet"}
                          height={30}
                          width={30}
                          style={{ marginRight: 10 }}
                        />
                        <span className="tooltiptext">Acessibilidade</span>
                      </div>
                    )}
                    {restaurant && restaurant.mealTicket && (
                      <div className="tooltip-container">
                        <Image
                          src={"/images/mealTicket.jpeg"}
                          alt={"mealTicket"}
                          height={30}
                          width={30}
                          style={{ marginRight: 10 }}
                        />
                        <span className="tooltiptext">Vale Refeição</span>
                      </div>
                    )}
                    {restaurant && restaurant.lactoseFree && (
                      <div className="tooltip-container">
                        <Image
                          src={"/images/lactoseFree.jpeg"}
                          alt={"lactoseFree"}
                          height={30}
                          width={30}
                          style={{ marginRight: 10 }}
                        />
                        <span className="tooltiptext">Lactose Free</span>
                      </div>
                    )}
                    {restaurant && restaurant.glutenFree && (
                      <div className="tooltip-container">
                        <Image
                          src={"/images/glutenFree.jpeg"}
                          alt={"glutenFree"}
                          height={30}
                          width={30}
                          style={{ marginRight: 10 }}
                        />
                        <span className="tooltiptext">Gluten Free</span>
                      </div>
                    )}
                  </div>
                  <div className="ratings" onClick={toggleStar}>
                    <Image
                      src={"/icons/start.svg"}
                      alt={"RatingStar"}
                      height={10}
                      width={10}
                    />
                    <label>{restaurant && calcRating(restaurant)}</label>
                    <small>({restaurant?.rating.length} avaliações)</small>
                  </div>
                  <div className="social-media-container">
                    {restaurant &&
                      restaurant.google &&
                      restaurant.google !== "" && (
                        <Image
                          src={"/icons/googleIcon.svg"}
                          alt={"RatingStar"}
                          height={30}
                          width={30}
                          onClick={handleGoogleClick}
                        />
                      )}
                    {restaurant &&
                      restaurant.instagram &&
                      restaurant.instagram !== "" && (
                        <Image
                          src={"/icons/instagram.svg"}
                          alt={"RatingStar"}
                          height={30}
                          width={30}
                          onClick={handleInstagramClick}
                        />
                      )}

                    {restaurant &&
                      restaurant.review &&
                      restaurant.review !== "" && (
                        <Image
                          src={"/images/review.png"}
                          alt={"review"}
                          height={30}
                          width={30}
                          onClick={handleReviewClick}
                        />
                      )}
                  </div>
                </div>
              </li>
            </ul>
          </ItemList>
          <InformationContainer>
            <p>Descrição</p>
            <span>{restaurant!.description}</span>
            {restaurant!.promotions.length !== 0 && (
              <>
                <p>Promoções</p>
                <form>
                  {restaurant!.promotions.map((item, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="radio"
                          name={`radio`}
                          value={`radio-${index}`}
                          id={`${index}`}
                        />
                        <label htmlFor={`radio-${index}`}>{item}</label>
                      </div>
                    );
                  })}
                </form>
              </>
            )}
          </InformationContainer>
          <QrCodeContainer>
            {hasValidSubscription ? (
              <button onClick={handleClickQrCode}>Gerar Cupom</button>
            ) : (
              <button onClick={createSubscription}>Assinar</button>
            )}
          </QrCodeContainer>
          <Modal isOpen={modal} toggle={toggle} centered>
            <ModalBody>
              <ModalContainer>
                <canvas ref={canvasRef} />
              </ModalContainer>
            </ModalBody>
          </Modal>

          <Modal isOpen={startModal} toggle={toggleStar} centered>
            <ModalBody>
              <ModalCommentsContainer>
                <h1>Avaliações</h1>

                <ul>
                  {restaurant &&
                    restaurant.rating.map((item: any, index: number) => {
                      return (
                        <li key={index}>
                          <p>{item.userName.split(" ")[0]}</p>
                          <p>
                            {item.ratingValue}{" "}
                            {Array(item.ratingValue)
                              .fill(0)
                              .map((item, index) => {
                                return (
                                  <Image
                                    key={index}
                                    src={StarFullImage}
                                    alt="user image"
                                    width={15}
                                    height={15}
                                  />
                                );
                              })}
                          </p>
                          <p>{item.commentary}</p>
                          {item.answer && (
                            <p>
                              <strong>Resposta</strong> : {item.answer}
                            </p>
                          )}

                          <hr />
                        </li>
                      );
                    })}
                </ul>
              </ModalCommentsContainer>
              <ModalReviewContainer>
                <h1>Avalie o restaurante</h1>
                <div>
                  <Image
                    src={reviewValue < 1 ? StarImage : StarFullImage}
                    alt="user image"
                    width={30}
                    height={30}
                    onClick={() =>
                      reviewValue === 0 ? setReviewValue(1) : setReviewValue(0)
                    }
                  />
                  <Image
                    src={reviewValue < 2 ? StarImage : StarFullImage}
                    alt="user image"
                    width={30}
                    height={30}
                    onClick={() =>
                      reviewValue < 2 ? setReviewValue(2) : setReviewValue(1)
                    }
                  />
                  <Image
                    src={reviewValue < 3 ? StarImage : StarFullImage}
                    alt="user image"
                    width={30}
                    height={30}
                    onClick={() =>
                      reviewValue < 3 ? setReviewValue(3) : setReviewValue(2)
                    }
                  />
                  <Image
                    src={reviewValue < 4 ? StarImage : StarFullImage}
                    alt="user image"
                    width={30}
                    height={30}
                    onClick={() =>
                      reviewValue < 4 ? setReviewValue(4) : setReviewValue(3)
                    }
                  />
                  <Image
                    src={reviewValue < 5 ? StarImage : StarFullImage}
                    alt="user image"
                    width={30}
                    height={30}
                    onClick={() =>
                      reviewValue < 5 ? setReviewValue(5) : setReviewValue(4)
                    }
                  />
                </div>
                <textarea
                  rows={5}
                  placeholder={"Deixe um Comentario..."}
                  ref={textareaRef}
                />
                <button onClick={handleRating}>Confirmar</button>
                <span onClick={toggleStar}>Cancelar</span>
              </ModalReviewContainer>
            </ModalBody>
          </Modal>
        </RestaurantContainer>
      )}
    </>
  );
}
