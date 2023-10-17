import Head from "next/head";
import { ModalContainer, ProfileContainer } from "../../styles/Profile";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Modal, ModalBody } from "reactstrap";
import { useEffect, useState } from "react";
import { parseJwt } from "../../utils/parseJwt";
import { deleteAccountController } from "../../controllers/Auth.controller";
import { checkSubscription } from "../../utils/checkSubscription";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default function Home() {
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const [modalSubscription, setModalSubscription] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");
  const toggle = () => setModal(!modal);
  const toggleSubscription = () => setModalSubscription(!modalSubscription);

  const handleLogout = () => {
    Cookies.remove("token");
    setTimeout(() => {
      router.push("/app");
    }, 300);
  };

  const handleSubscriptionClick = async () => {
    try {
      const token = Cookies.get("token");
      const parsedToken = parseJwt(`${token}`);

      const customer = await stripe.customers.search({
        query: `email:\'${parsedToken.data.email}\'`,
      });

      if (customer.data.length > 0) {
        const portalLink = await stripe.billingPortal.sessions.create({
          customer: customer.data[0].id,
          return_url: "https://urunga-mobile.vercel.app/",
        });
        router.push(portalLink.url);
      } else {
        alert("Ocorreu um erro, entre em contato com nosso time de suporte.");
      }
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro, entre em contato com nosso time de suporte.");
    }
  };

  const handleDeleteAccount = async () => {
    const token = Cookies.get("token");
    const parsedToken = parseJwt(`${token}`);
    await deleteAccountController(`${parsedToken.data._id}`);
    handleLogout();
  };

  useEffect(() => {
    fetchSubscription();
  });

  const fetchSubscription = async () => {
    const subscription = await checkSubscription();

    if (subscription && subscription.status === "complete") {
      setHasSubscription(true);
      setSubscriptionId(subscription.subscription);
    }
  };

  const cancelSubscription = async () => {
    try {
      const deleted = await stripe.subscriptions.cancel(subscriptionId);

      if (deleted && deleted.status === "canceled") {
        alert("Assinatura cancelada com sucesso.");
        setModalSubscription(false);
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao cancelar assinatura, entre em contato com o suporte.");
    }
  };

  return (
    <>
      <Head>
        <title>Urunga - List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileContainer>
        <Image
          src={"/logo.svg"}
          alt={"RatingStar"}
          height={88}
          width={88}
          className="logo-icon"
        />
        <h2>Perfil</h2>

        <p onClick={toggle}>Excluir conta</p>

        {hasSubscription && (
          <p onClick={handleSubscriptionClick}>Gerenciar Assinatura</p>
        )}
        {hasSubscription && (
          <p onClick={toggleSubscription}>Cancelar Assinatura</p>
        )}

        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </ProfileContainer>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalBody>
          <ModalContainer>
            <h2>Tem certeza de que deseja excluir sua conta?</h2>

            <button
              type="button"
              className="delete"
              onClick={handleDeleteAccount}
            >
              Sim, Excluir
            </button>

            <button type="button" onClick={toggle}>
              Não, voltar
            </button>
          </ModalContainer>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalSubscription} toggle={toggleSubscription} centered>
        <ModalBody>
          <ModalContainer>
            <h2>Tem certeza de que deseja cancelar sua assinatura?</h2>

            <button
              type="button"
              className="delete"
              onClick={cancelSubscription}
            >
              Sim, Cancelar
            </button>

            <button type="button" onClick={toggleSubscription}>
              Não, voltar
            </button>
          </ModalContainer>
        </ModalBody>
      </Modal>
    </>
  );
}
