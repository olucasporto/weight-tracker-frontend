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

    setLoading(true);

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
        alert("Erro ao registrar peso.");
      }
    } catch (error) {
      alert("Erro ao conectar-se ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Garante altura total
        width: "100vw",
        backgroundColor: "black",
        padding: "20px", // Evita que o conteúdo fique colado nas bordas
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%", // Agora pega 100% do espaço disponível dentro da tela
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Registre seu peso</h2>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Digite seu peso (kg)"
          style={{
            padding: "10px",
            fontSize: "18px",
            width: "calc(100% - 20px)", // Ajusta para não estourar na direita
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid #ddd",
            marginBottom: "10px", // Evita ficar grudado no botão
          }}
          disabled={loading}
        />
        <button
          onClick={sendWeight}
          style={{
            padding: "10px",
            fontSize: "18px",
            cursor: "pointer",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            width: "100%",
          }}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Peso"}
        </button>
        {loading && <p style={{ marginTop: "10px", color: "#555" }}>⏳ Processando...</p>}
      </div>
    </div>
  );
};

export default App;
