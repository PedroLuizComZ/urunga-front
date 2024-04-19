import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getSession } from "../../utils/getSession";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/image";
import { Modal, ModalBody } from "reactstrap";
import { ModalContainer } from "../../styles/Profile";

export default function Home() {
  const { handleSubmit } = useForm();
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantToDelete, setRestaurantToDelete] = useState("");
  const [modal, setModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const toggle = () => setModal(!modal);

  const router = useRouter();

  const onSubmit = () => {
    router.push("/restaurantes/novo");
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClick = async (id: any) => {
    router.push(`/restaurantes/${id}`);
  };

  const handleDelete = async () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_URL}/store/${restaurantToDelete}`)
      .then(function (response) {
        alert("Restaurante excluido com sucesso.");
        loadData();
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
    toggle();
  };

  const handleDeleteClick = async (event: any, id: any) => {
    event.preventDefault();
    event.stopPropagation();
    setRestaurantToDelete(id);
    toggle();
  };

  const handleApproval = async (event: any, id: any) => {
    event.preventDefault();
    event.stopPropagation();
    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_URL}/store/approval/${id}`)
      .then(function (response) {
        alert("Restaurante alterado com sucesso.");
        loadData();
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("userType");
    router.push("/login");
  };

  const loadData = async () => {
    const session = getSession();

    if (session.isAdmin) {
      setIsAdmin(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BACK_URL}/store/admin`)
        .then(function (response) {
          setRestaurants(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACK_URL}/store/list`, {
          email: session.email,
        })
        .then(function (response) {
          setRestaurants(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Lista de Restaurantes</h1>
        <button type="submit">Cadastrar novo restaurante</button>
        <br />

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descricao</th>
              <th>Excluir</th>
              {isAdmin && <th>Aprovar</th>}
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant: any) => {
              return (
                <tr
                  key={restaurant._id}
                  onClick={() => handleClick(restaurant._id)}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.description}</td>
                  <td onClick={(e) => handleDeleteClick(e, restaurant._id)}>
                    <div className="action-line">
                      <p>Excluir</p>
                      <Image
                        src={"/icons/trash.svg"}
                        alt={"Excluir"}
                        height={20}
                        width={20}
                      />
                    </div>
                  </td>

                  {isAdmin && (
                    <td onClick={(e) => handleApproval(e, restaurant._id)}>
                      <div className="action-line">
                        <p>{restaurant.active ? "Desaprovar" : "Aprovar"}</p>
                        <Image
                          src={`/icons/${
                            restaurant.active ? "valid.svg" : "not-valid.svg"
                          }`}
                          alt={"Excluir"}
                          height={20}
                          width={20}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="button" onClick={handleLogout} style={{ marginTop: 40 }}>
          Sair
        </button>
      </form>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalBody>
          <ModalContainer>
            <h2>Tem certeza de que deseja excluir esse restaurante?</h2>

            <button type="button" className="delete" onClick={handleDelete}>
              Sim, Excluir
            </button>

            <button type="button" onClick={toggle}>
              Não, voltar
            </button>
          </ModalContainer>
        </ModalBody>
      </Modal>
    </>
  );
}
