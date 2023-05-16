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

export const itemState = atom({
  key: "itemState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export function useItems() {
  const [isInitial, setIsInitial] = React.useState(true);
  const [itemStored, setItemStored] = useRecoilState(itemState);

  React.useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial === true ? [] : itemStored, setItemStored];
}

// This state for fetch item for serverside
