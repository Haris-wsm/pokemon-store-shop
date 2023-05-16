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

export const paymentState = atom({
  key: "paymentState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export function usePayment() {
  const [isInitial, setIsInitial] = React.useState(true);
  const [paymentStored, setPaymentStored] = useRecoilState(paymentState);

  React.useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial === true ? {} : paymentStored, setPaymentStored];
}
