import { useEffect, useState } from "react";

function Home() {
  const [text, setText] = useState("");
  const message = "Bienvenido al Sistema de Gestión de Pedidos 🚀";

  useEffect(() => {
    setText(""); // Resetear el texto
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setText(message.substring(0, i + 1)); // Forma más limpia
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 tracking-wide">{text}</h1>
        <p className="text-gray-400 text-lg mt-4">
          Gestiona tus clientes y pedidos de manera simple y eficiente.
        </p>
      </div>
    </div>
  );
}

export default Home;