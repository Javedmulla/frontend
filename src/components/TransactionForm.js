import React, { useState } from "react";
import API from "../api";

const predefinedActions = [
  { label: "Pass GO", type: "CREDIT", amount: 100 },
  { label: "Jail", type: "DEBIT", amount: 50 },
  { label: "Income Tax", type: "DEBIT", amount: 75 },
  { label: "Wealth Tax", type: "DEBIT", amount: 1500 },
  { label: "Income Tax Refund", type: "CREDIT", amount: 2000 },
];

const TransactionForm = ({ players, selectedPlayers, setSelectedPlayers, gameId, onUpdate }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("DEBIT");
  const [desc, setDesc] = useState("");

  const submit = async (override = null) => {
    let playerOne = selectedPlayers[0];
    let playerTwo = selectedPlayers[1] || null;
    let amt = Number(amount);
    let t = type;
    let description = desc;

    if (override) {
      playerOne = override.playerOne;
      playerTwo = override.playerTwo || null;
      amt = override.amount;
      t = override.type;
      description = override.desc;
    }

    if (!playerOne || !amt) return alert("Select player(s) and enter amount!");

    try {
      const res = await API.post("/process", {
        game_id: gameId,
        player_one: playerOne,
        player_two: playerTwo,
        amount: amt,
        type: t,
        desc: description,
      });

      if (typeof res.data === "string" && res.data.toLowerCase().includes("insuff")) {
        alert(res.data); 
        return;
      }

      onUpdate();
      setAmount("");
      setDesc("");
      setSelectedPlayers([]);
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Check console.");
    }
  };

  const oneClickAction = (action) => {
    if (!selectedPlayers.length) return alert("Select at least one player!");
    const player1 = selectedPlayers[0];
    submit({
      playerOne: player1,
      playerTwo: null,
      amount: action.amount,
      type: action.type,
      desc: action.label
    });
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "20px auto",
      padding: "25px",
      borderRadius: "25px",
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
      fontFamily: "'Baloo 2', cursive",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.25)"
    }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", fontSize:"1.8em" }}>💸 Make Transaction</h3>

      {/* Predefined buttons */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent:"center", marginBottom: "20px" }}>
        {predefinedActions.map(a => (
          <button
            key={a.label}
            onClick={() => oneClickAction(a)}
            style={{
              padding: "8px 15px",
              borderRadius: "15px",
              background: "#ff7f50",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
              transition: "0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.08)"}
            onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* Amount & Type inline / responsive */}
      <div style={{
        display: "flex",
        flexDirection: window.innerWidth <= 768 ? "column" : "row",
        gap: "25px",
        flexWrap: "wrap",
        marginBottom: "15px",
        alignItems: "center"
      }}>
        <div style={{ flex: "1" }}>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                 style={{ width: "100%", padding:"12px", borderRadius:"12px", border:"none", outline:"none" }} />
        </div>

        <div style={{ flex: "1" }}>
          <label>Type:</label>
          <select value={type} onChange={e => setType(e.target.value)}
                  style={{ width: "100%", padding:"12px", borderRadius:"12px", border:"none", outline:"none" }}>
            <option value="DEBIT">DEBIT</option>
            <option value="CREDIT">CREDIT</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Description:</label>
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)}
               style={{ width: "100%", padding:"12px", borderRadius:"12px", border:"none", outline:"none" }} />
      </div>

      <button onClick={() => submit()}
              style={{
                padding: "14px 30px",
                borderRadius: "22px",
                background: "#ff4757",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
                fontSize: "1.1em",
                transition: "0.3s",
                boxShadow: "0 5px 18px rgba(0,0,0,0.25)"
              }}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
      >
        Submit Transaction
      </button>
    </div>
  );
};

export default TransactionForm;
