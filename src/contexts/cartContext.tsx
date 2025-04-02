import { createContext, PropsWithChildren, useState } from "react";
import { ProductProps } from "../pages/home/index";
import toast from "react-hot-toast";

type CartContextData = ReturnType<typeof cartHook>;

export type CartItem = ProductProps & {
  amount: number;
  total: number;
};

export const CartContext = createContext({} as CartContextData);

const cartHook = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState("");

  function addItemCart(newItem: ProductProps) {
    //Adiciona no carrinho

    const indexItem = cart.findIndex((item) => item.id === newItem.id); //-1

    const itemJaAdicionado = indexItem !== -1;
    if (itemJaAdicionado) {
      //Se entrou aqui, apenas somamos +1 na quantidade e calculamos o total desse carrinho
      let cartList = cart;
      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      toast.success(
        `O produto foi adicionado ${cartList[indexItem].amount} vezes`,
        {
          style: {
            fontWeight: "bold",
          },
        }
      );

      return;
    }

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((products) => [...products, data]);
    totalResultCart([...cart, data]);

    toast.success("Produto adicionado no carrinho", {
      style: {
        fontWeight: "bold",
      },
    });
  }

  function removeItemCart(product: CartItem) {
    const indexItem = cart.findIndex((item) => item.id === product.id);

    //Diminuir um amount

    if (cart[indexItem]?.amount > 1) {
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount - 1;
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price;
      setCart(cartList);

      totalResultCart(cartList);
      toast.error(`Você tem um total de ${product.amount} produtos`, {
        style: {
          fontWeight: "bold",
        },
      });
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);
    toast.error(`O produto ${product.title} foi removido do seu carrinho`, {
      style: {
        fontWeight: "bold",
      },
    });
  }

  function totalResultCart(items: CartItem[]) {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);

    const resultFormat = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setTotal(resultFormat);
  }

  return {
    cart,
    cartAmount: cart.length,
    addItemCart,
    removeItemCart,
    total,
  };
};

function CartProvider({ children }: PropsWithChildren) {
  const value = cartHook();

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
