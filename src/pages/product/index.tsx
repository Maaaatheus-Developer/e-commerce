import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { ProductProps } from "../home";
import { CartContext } from "../../contexts/cartContext";
import { BsCartPlus } from "react-icons/bs";

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    }

    getProducts();
  }, [id]);

  function handleAddItem(product: ProductProps) {
    addItemCart(product);
    navigate("/cart");
  }

  function voltar() {
    navigate("/");
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto my-6">
        {product && (
          <section className="w-full">
            <div className="py-3">
              <button
                className="bg-black text-white font-bold w-28 rounded-2xl h-8"
                onClick={voltar}
              >
                Voltar
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              <img
                className="flex-1 w-full max-h-72 object-contain"
                src={product?.cover}
                alt={product?.title}
              />

              <div className="flex-1">
                <p className="font-bold text-2xl mt-4 mb-2  ">
                  {product?.title}
                </p>
                <p className="my-4">{product?.description}</p>
                <strong className="text-zinc-700/90 text-xl">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button
                  className="bg-zinc-900 p-1 rounded ml-2"
                  onClick={() => handleAddItem(product)}
                >
                  <BsCartPlus size={20} color="#FFF" />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
