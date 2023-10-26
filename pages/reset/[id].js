import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ForgetPassword() {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      password : data.password,
      id : id
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_URL}/user/new-password`, payload)
      .then(function (response) {
        if(response === "error updating user") {
          alert('Ocorreu um erro tente novamente mais tarde');
        } else {
          router.push("/login");
        }
      })
      .catch(function (error) {
        alert('Ocorreu um erro tente novamente mais tarde');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Digite sua nova senha</h1>
      <input
        placeholder={"Senha"}
        {...register("password", { required: "Senha Obrigatório" })}
        type="password"
      />
      <button type="submit">Confirmar </button>
      <Link href="/">
        <p role="button">Voltar ao login</p>
      </Link>
      <hr />

      {errors.password && <p role="alert">{errors.password?.message}</p>}
    </form>
  );
}
