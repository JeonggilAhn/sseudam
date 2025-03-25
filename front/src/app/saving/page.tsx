"use client";

import React, { useState } from "react";
import SavingCard from "./components/savingCard";
import SavingButton from "./components/savingButton";
import SavingSearch from "./components/savingSearch";
import SavingDetail from "./components/savingDetail";

const SavingPage: React.FC = () => {
  const [selected, setSelected] = useState<"interest" | "views" | "likes" | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (value: "interest" | "views" | "likes") => {
    setSelected((prev) => (prev === value ? null : value));
  };

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] p-4">
      <SavingSearch />
      <SavingButton selected={selected} onSelect={handleSelect} />
      <div className="mt-8" />
      <SavingCard onClickJoin={() => setShowModal(true)} />
      {showModal && <SavingDetail onClose={() => setShowModal(false)} />}
    </main>
  );
};

export default SavingPage;
