"use client";

import { AlertColor, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { RESET_ALL_PRODUCTS } from "@/app/lib/apollo-queries";
import { CustomSnackbar } from "@/app/components/snackbar";
import client from "@/app/lib/apollo-client";

export const ResetButton = ({ onReset }: { onReset: () => void }) => {
  const [snackState, setSnackState] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success" as AlertColor,
  });

  // TODO Limit resetting data to once in a few minutes to prevent request flooding.

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await client.mutate({
        mutation: RESET_ALL_PRODUCTS,
      });
      return data.resetAllProducts;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        setSnackState({
          open: true,
          message: "Products data reset successfully.",
          severity: "success",
        });
        onReset();
      } else {
        setSnackState({
          open: true,
          message: "Failed to reset the data.",
          severity: "error",
        });
      }
    },
    onError: (error) => {
      console.log(error);
      setSnackState({
        open: true,
        message: "There was a server error.",
        severity: "error",
      });
    },
  });

  const handleResetClick = () => {
    mutate();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleResetClick}
        disabled={isPending}
      >
        Reset all data
      </Button>
      <CustomSnackbar snackState={snackState} onClose={setSnackState} />
    </>
  );
};
