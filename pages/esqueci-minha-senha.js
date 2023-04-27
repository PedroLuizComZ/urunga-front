import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_URL}/user/forget-password`, data)
      .then(function (response) {
        alert('Verifque seu email');
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Esqueci minha senha</h1>
      <input
        placeholder={"Email"}
        {...register("email", { required: "Email Obrigatório" })}
        type="password"
      />
      <button type="submit">Confirmar </button>
      <Link href="/">
        <p role="button">Voltar ao login</p>
      </Link>
      <hr />

      {errors.email && <p role="alert">{errors.email?.message}</p>}
    </form>
  );
}
