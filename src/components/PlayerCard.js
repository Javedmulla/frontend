import React from "react";

function PlayerCard({ player }) {
  return (
    <div
      style={{
        border: "2px solid black",
        padding: "10px",
        width: "150px",
        textAlign: "center",
        backgroundColor: player.color || "white",
      }}
    >
      <h4>{player.player_name}</h4>
      <p>Balance: ${player.amount}</p>
    </div>
  );
}

export default PlayerCard;
