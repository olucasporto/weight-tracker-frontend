import { useState } from "react";

const App: React.FC = () => {
  const [weight, setWeight] = useState<string>("");

  const sendWeight = async () => {
    if (!weight) {
      alert("Digite um peso válido!");
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/register_weight/", {
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
      />
      <br />
      <button
        onClick={sendWeight}
        style={{
          marginTop: "10px",
          padding: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Enviar Peso
      </button>
    </div>
  );
};

export default App;
