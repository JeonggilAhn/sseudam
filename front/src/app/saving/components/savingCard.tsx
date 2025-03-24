"use client";

import React from "react";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";

const SavingCard: React.FC = () => {
  return (
    <main>
      <Icon name={getBankIconName("0010927")} />
    </main>
  );
};

export default SavingCard;
