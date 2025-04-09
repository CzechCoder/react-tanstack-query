"use client";

import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import client from "@/app/lib/apollo-client";
import { RESET_ALL_PRODUCTS } from "@/app/lib/apollo-queries";

export const ResetButton = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await client.mutate({
        mutation: RESET_ALL_PRODUCTS,
      });
      return data.resetAllProducts;
    },
    onSuccess: (data) => {
      if (data.success) {
        console.log("success");
      } else {
        console.log("error");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleResetClick = () => {
    mutate();
  };

  return (
    <Button variant="contained" onClick={handleResetClick} disabled>
      Reset all data
    </Button>
  );
};
