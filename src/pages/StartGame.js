import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function StartGame() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("new"); // "new" or "join"
  const [initialAmt, setInitialAmt] = useState(1500);
  const [players, setPlayers] = useState([{ name: "", color: "#ff4757" }]);
  const [gameIdInput, setGameIdInput] = useState("");

  const addPlayer = () => {
    if (players.length < 6) setPlayers([...players, { name: "", color: "#1e90ff" }]);
  };

  const updatePlayer = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const startNewGame = async () => {
    try {
      const res = await API.post("/create-game", { initial_amt: initialAmt, players });
      const gameId = res.data.match(/\d+/)[0]; // extract game_id
      navigate(`/dashboard/${gameId}`);
    } catch (err) {
      console.error(err);
      alert("Error creating game");
    }
  };

  const joinGame = () => {
    if (!gameIdInput) return alert("Enter Game ID");
    navigate(`/dashboard/${gameIdInput}`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "'Baloo 2', cursive",
      background: "linear-gradient(135deg, #ff7f50, #ffecd2)"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "2.5rem",
        color: "#fff",
        textShadow: "2px 2px #000"
      }}>🎲 Monopoly Money Manager</h1>

      {/* Mode Selection */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={() => setMode("new")}
          style={{
            backgroundColor: mode === "new" ? "#ff6b81" : "#fff",
            color: mode === "new" ? "#fff" : "#000",
            marginRight: "10px",
            padding: "10px 20px",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>Start New Game</button>
        <button
          onClick={() => setMode("join")}
          style={{
            backgroundColor: mode === "join" ? "#1e90ff" : "#fff",
            color: mode === "join" ? "#fff" : "#000",
            padding: "10px 20px",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>Join Existing Game</button>
      </div>

      {/* New Game Form */}
      {mode === "new" && (
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(8px)",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
        }}>
          <div style={{ marginBottom: "20px" }}>
            <label>Initial Amount: </label>
            <input
              type="number"
              value={initialAmt}
              onChange={e => setInitialAmt(Number(e.target.value))}
              style={{ padding: "5px", borderRadius: "8px", width: "100px", marginLeft:"10px" }}
            />
          </div>

          <h3 style={{ marginBottom: "10px" }}>Players (max 6)</h3>
          {players.map((p, i) => (
            <div key={i} style={{ marginBottom: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
              <input
                placeholder="Name"
                value={p.name}
                onChange={e => updatePlayer(i, "name", e.target.value)}
                style={{ padding: "5px", borderRadius: "8px", width: "120px" }}
              />
              <input
                type="color"
                value={p.color}
                onChange={e => updatePlayer(i, "color", e.target.value)}
                style={{ width: "50px", height: "35px", border: "none", cursor: "pointer" }}
              />
            </div>
          ))}
          <button
            onClick={addPlayer}
            style={{
              marginBottom: "20px",
              padding: "8px 15px",
              borderRadius: "12px",
              background: "#2ed573",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer"
            }}>Add Player</button>

          <div>
            <button
              onClick={startNewGame}
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                background: "#ff4757",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}>Start Game</button>
          </div>
        </div>
      )}

      {/* Join Game Form */}
      {mode === "join" && (
        <div style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(8px)",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
        }}>
          <label>Enter Game ID: </label>
          <input
            type="text"
            value={gameIdInput}
            onChange={e => setGameIdInput(e.target.value)}
            style={{ padding: "5px", borderRadius: "8px", width: "100px", marginLeft:"10px" }}
          />
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={joinGame}
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                background: "#1e90ff",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}>Join Game</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default StartGame;
