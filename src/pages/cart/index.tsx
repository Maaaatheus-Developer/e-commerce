export function Cart() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">
        Carrinho de compras
      </h1>

      <section className=" flex items-center justify-between border-b-2 border-gray-300">
        <img
          className="w-28"
          src="https://img.freepik.com/vetores-gratis/composicao-realista-sem-fio-de-fones-de-ouvido-com-imagem-isolada-de-telefones-com-estacao-de-dock-de-banco-de-potencia-com-ilustracao-vetorial-de-reflexoes_1284-73201.jpg?t=st=1740379077~exp=1740382677~hmac=c02df12d4da97d2faf3859c40027adec2c9a3c50371493d256eeac97354978f6&w=740"
          alt="Logo produto"
        />
        <strong>Preço: R$ 1.000</strong>

        <div className="flex-items-center justify-center">
          <button className="bg-slate-600 px-2.5 rounded text-white font-medium flex items-center justify-center">
            -
          </button>
          2
          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            +
          </button>
        </div>

        <strong className="float-right">SubTotal: R$ 1.000</strong>
      </section>

      <p className="font-bold mt4">Total: R$1.000</p>
    </div>
  );
}