"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import agent from "@/utils/agent";
import { getBasketFromLocalStorage } from "@/utils/LocalStorage/Basket";
import { fetchCurrentUser } from "@/components/auth/accountSlice";
import { setBasket } from "@/lib/features/basket/basketSlice";

const AppInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const basket = getBasketFromLocalStorage();
    dispatch(fetchCurrentUser());
    if (basket) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error));
    }
  }, [dispatch]);

  return null; 
};

export default AppInitializer;
