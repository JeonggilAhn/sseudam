"use client";

import React, { useState } from "react";
import SavingCard from "./components/savingCard";
import SavingButton from "./components/savingButton";

const SavingPage: React.FC = () => {
  const [selected, setSelected] = useState<"interest" | "views" | "likes" | null>(null);

  const handleSelect = (value: "interest" | "views" | "likes") => {
    setSelected((prev) => (prev === value ? null : value));
  };

  return (
    <main className="p-4">
      <SavingButton selected={selected} onSelect={handleSelect} />
      <SavingCard />
    </main>
  );
};

export default SavingPage;
