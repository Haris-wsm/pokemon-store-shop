"use client";

import React from "react";
import { atom, useRecoilState } from "recoil";

import { recoilPersist } from "recoil-persist";

const localStorage =
  typeof window !== `undefined` ? window?.localStorage : null;

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const cartState = atom({
  key: "cartState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export function useCart() {
  const [isInitial, setIsInitial] = React.useState(true);
  const [cartStored, setCartStored] = useRecoilState(cartState);

  React.useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial === true ? [] : cartStored, setCartStored];
}

// This state store all item into localstrorage only for fetch purposes.
