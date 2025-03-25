"use client";

import React, { useState } from "react";
import SavingCard from "./components/savingCard";
import SavingButton from "./components/savingButton";
import SavingSearch from "./components/savingSearch";

const SavingPage: React.FC = () => {
  const [selected, setSelected] = useState<"interest" | "views" | "likes" | null>(null);

  const handleSelect = (value: "interest" | "views" | "likes") => {
    setSelected((prev) => (prev === value ? null : value));
  };

  return (
    <main style={{ backgroundColor: "#C1E6FA", minHeight: "100vh", padding: "1rem" }}>
      <SavingSearch />
      <SavingButton selected={selected} onSelect={handleSelect} />
      <div style={{ marginTop: "2rem" }}></div>
      <SavingCard />
    </main>
  );
};

export default SavingPage;
