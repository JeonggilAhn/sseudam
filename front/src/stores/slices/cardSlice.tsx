import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardState {
  isRegistModalOpen: boolean;
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: string;
  currentCard: string[];
}

const initialCardState: CardState = {
  isRegistModalOpen: false,
  number: "",
  expiry: "",
  cvc: "",
  name: "",
  focus: "",
  currentCard: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState: initialCardState,
  reducers: {
    toggleIsRegistModalOpen: (state) => {
      state.isRegistModalOpen = !state.isRegistModalOpen;
      state.number = "";
      state.expiry = "";
      state.cvc = "";
      state.name = "";
      state.focus = "";
    },
    setNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload;
    },
    setExpiry: (state, action: PayloadAction<string>) => {
      state.expiry = action.payload;
    },
    setCvc: (state, action: PayloadAction<string>) => {
      state.cvc = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setFocus: (state, action: PayloadAction<string>) => {
      state.focus = action.payload;
    },
    setCurrentCard: (state, action: PayloadAction<string[]>) => {
      state.currentCard = action.payload;
    },
  },
});

export const {
  toggleIsRegistModalOpen,
  setNumber,
  setExpiry,
  setCvc,
  setName,
  setFocus,
  setCurrentCard,
} = cardSlice.actions;
export default cardSlice.reducer;
