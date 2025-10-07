function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
      <div className="text-center p-10 rounded-2xl shadow-lg bg-zinc-800">
        <h1 className="text-4xl font-bold mb-2 text-blue-400">¡Bienvenido!</h1>
        <p className="text-lg text-gray-300 mb-6">
          Ya estás dentro de la aplicación, haz uso de todos los beneficios.
        </p>
        <p className="text-gray-400 italic">
          Usa la barra de navegación superior para empezar 
        </p>
      </div>
    </div>
  );
}

export default Home;
