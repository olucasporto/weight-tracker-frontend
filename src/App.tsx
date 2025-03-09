import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const App: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const sendWeight = async () => {
    const formattedWeight = weight.replace(",", ".").trim();

    if (!formattedWeight || isNaN(Number(formattedWeight))) {
      setMessage({ text: "Digite um peso válido!", type: "error" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/register_weight/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight: parseFloat(formattedWeight) }),
      });

      if (response.ok) {
        setMessage({ text: "Peso registrado com sucesso!", type: "success" });
        setWeight("");
      } else {
        setMessage({ text: "Erro ao registrar peso.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Erro ao conectar-se ao servidor.", type: "error" });
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
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "black",
        padding: "20px",
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
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Registre seu peso</h2>

        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Digite seu peso (kg)"
          style={{
            padding: "10px",
            fontSize: "18px",
            width: "calc(100% - 20px)",
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
          disabled={loading}
        />

        <button
          onClick={sendWeight}
          style={{
            padding: "10px",
            fontSize: "18px",
            cursor: loading ? "default" : "pointer",
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

        {message && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
              color: message.type === "success" ? "#155724" : "#721c24",
              border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
            }}
          >
            {message.text}
          </div>
        )}

        {loading && <p style={{ marginTop: "10px", color: "#555" }}>⏳ Processando...</p>}
      </div>
    </div>
  );
};

export default App;
