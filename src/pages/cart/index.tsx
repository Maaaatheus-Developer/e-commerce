import { useContext } from "react";
import { CartContext, CartItem } from "../../contexts/cartContext";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, total, removeItemCart, addItemCart } = useContext(CartContext);

  function handleRemoveCartItem(product: CartItem) {
    removeItemCart(product);
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">
        Carrinho de compras
      </h1>
      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="font-medium"> Ops, seu carinho está vazio</p>
          <Link
            className="bg-yellow-400 my-3 p-1 px-3 mt-5 text-black font-bold rounded animate-bounce"
            to="/"
          >
            Acessar produtos
          </Link>
        </div>
      )}

      <table className=" w-full table-auto">
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-b-2 border-gray-300">
              <td>
                <img className="w-28" src={item.cover} alt={item.title} />
              </td>
              <td>
                <strong>Preço: {item.price}</strong>
              </td>

              <td>
                <div className="flex-items-center justify-center">
                  <button
                    onClick={() => handleRemoveCartItem(item)}
                    className="bg-black px-2.5 rounded text-white font-medium flex items-center justify-center"
                  >
                    -
                  </button>
                  {item.amount}
                  <button
                    onClick={() => addItemCart(item)}
                    className="bg-black px-2 rounded text-white font-medium flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </td>

              <td>
                <strong className="float-right">
                  SubTotal:
                  {item.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cart.length !== 0 && <p className="font-bold mt4">Total: {total}</p>}
    </div>
  );
}
