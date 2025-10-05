import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import TransactionForm from "../components/TransactionForm";

const Dashboard = () => {
  const { gameId } = useParams();
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const res = await API.get(`/fetch-game`, { params: { game_id: gameId } });
      if (!res.data.data || res.data.data.length === 0) {
        return;
      }
      setPlayers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [gameId]);


  const handlePlayerClick = (playerId) => {
    setSelectedPlayers(prev => {
      if (prev.includes(playerId)) return prev.filter(p => p !== playerId);
      if (prev.length < 2) return [...prev, playerId];
      return prev;
    });
  };

  const getGlow = (amount) => {
    if (amount >= 5000) return "rgba(0,255,136,0.35)";
    if (amount <= 500) return "rgba(255,76,76,0.35)";
    return "rgba(30,144,255,0.25)";
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: window.innerWidth <= 768 ? "column" : "row", // mobile -> column
      height: "100vh",
      gap: "15px",
      padding: "15px",
      background: "#1a1a1a"
    }}>
      <div style={{
        flex: window.innerWidth <= 768 ? "0 0 auto" : "0 0 250px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "10px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        color: "#fff",
        fontFamily: "'Baloo 2', cursive",
        maxHeight: window.innerWidth <= 768 ? "150px" : "auto",
        overflowY: window.innerWidth <= 768 ? "auto" : "visible"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>🎲 Players</h3>
        {players.map(p => {
          const selected = selectedPlayers.includes(p.player_id);
          const glowColor = getGlow(p.amount);
          return (
            <div
              key={p.player_id}
              onClick={() => handlePlayerClick(p.player_id)}
              style={{
                padding: "10px",
                borderRadius: "12px",
                background: selected ? glowColor : "rgba(255,255,255,0.05)",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                boxShadow: selected
                  ? `0 0 15px ${glowColor}`
                  : "0 3px 10px rgba(0,0,0,0.2)",
                transition: "0.2s",
              }}
            >
              {p.player_name} ₹{p.amount}
            </div>
          )
        })}
      </div>

      <div style={{ flex: "1", marginTop: window.innerWidth <= 768 ? "10px" : "0" }}>
        <TransactionForm
          players={players}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          gameId={gameId}
          onUpdate={fetchPlayers}
        />
      </div>
    </div>
  );
};

export default Dashboard;
