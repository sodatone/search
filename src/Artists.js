import React from "react";

export const Artists = ({ artists }) => (
  <ul>
    {artists.map(a => (
      <li key={`${a.id}_${a.name}`}>{a.name}</li>
    ))}
  </ul>
);
