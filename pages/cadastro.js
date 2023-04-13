import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_URL}/user/`, data)
      .then(function (response) {
        if (response.data) {
          Cookies.set("user", JSON.stringify(response.data.sessionToken));
          router.push("/restaurantes");
        } else {
          alert("Email ou senha incorreto.");
        }
      })
      .catch(function (error) {
        alert("Ocorreu um erro ao criar sua conta, tente novamente mais tarde.");

        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Cadastro</h1>
      <input placeholder={"Nome"} {...register("name",  { required: "Nome Obrigatório" })} />
      <input
        placeholder={"Email"}
        {...register("email", { required: "Email Obrigatório" })}
      />
      <input
        placeholder={"Senha"}
        {...register("password", { required: "Senha Obrigatório" })}
      />
      <button type="submit">Confirmar </button>
      <Link href="/">
        <p role="button">Voltar ao cadatro</p>
      </Link>
      <hr/>

      {errors.name && <p role="alert">{errors.name?.message}</p>}
      {errors.email && <p role="alert">{errors.email?.message}</p>}
      {errors.password && <p role="alert">{errors.password?.message}</p>}
    </form>
  );
}
