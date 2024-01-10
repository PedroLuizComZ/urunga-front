import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import VideoBox from "../components/VideoBox";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const router = useRouter();

  const videosData = [
    {
      title: "Conhecendo a página do estabelecimento dentro do aplicativo",
      videos: [
        "Conhecendo-a-pagina-do-estabelecimento-dentro-do-aplicativo.mp4",
      ],
    },
    {
      title: "Validando o cupom gerado pelo cliente",
      videos: ["Validando-o-cupom-gerado-pelo-cliente.mp4"],
    },
    {
      title: "Área dos estabelecimentos parceiros",
      videos: ["Area-dos-estabelecimentos-parceiros.mp4"],
    },
  ];

  const onSubmit = (data: any) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_URL}/user/login`, data)
      .then(function (response) {
        if (response.data) {
          Cookies.set("token", response.data.sessionToken);
          Cookies.set("userType", "admin");
          router.push("/restaurantes");
        } else {
          alert("Email ou senha incorreto");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <input
          placeholder={"Email"}
          {...register("email", { required: "Email Obrigatório" })}
        />
        <input
          placeholder={"Senha"}
          {...register("password", { required: "Senha Obrigatório" })}
          type="password"
        />
        <Link href="/cadastro">
          <p role="button">Criar nova Conta</p>
        </Link>

        <button type="submit">Confirmar</button>
        <Link href="/esqueci-minha-senha">
          <p role="button">Esqueci minha senha</p>
        </Link>

        <hr />

        {errors.email && <p role="alert">{errors.email?.message}</p>}
        {errors.password && <p role="alert">{errors.password?.message}</p>}
      </form>
      <h1> Guia Prático para Estabelecimentos no App</h1>
      <VideoBox data={videosData} />
    </>
  );
}
