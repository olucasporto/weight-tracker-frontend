import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const App: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendWeight = async () => {
    if (!weight) {
      alert("Digite um peso válido!");
      return;
    }

    setLoading(true); // Inicia o loading

    try {
      const response = await fetch(`${API_URL}/register_weight/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight: parseFloat(weight) }),
      });

      if (response.ok) {
        alert("Peso registrado com sucesso!");
        setWeight("");
      } else {
        alert("Erro ao registrar peso. Verifique sua conexão.");
      }
    } catch (error) {
      alert("Erro ao conectar-se ao servidor.");
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Registre seu peso</h2>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Digite seu peso (kg)"
        style={{
          padding: "10px",
          fontSize: "18px",
          width: "200px",
          textAlign: "center",
        }}
        disabled={loading} // Bloqueia input enquanto carrega
      />
      <br />
      <button
        onClick={sendWeight}
        style={{
          marginTop: "10px",
          padding: "10px",
          fontSize: "18px",
          cursor: "pointer",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        disabled={loading} // Desativa o botão enquanto carrega
      >
        {loading ? "Enviando..." : "Enviar Peso"}
      </button>
      {loading && <p>⏳ Processando...</p>}
    </div>
  );
};

export default App;
