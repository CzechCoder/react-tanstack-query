"use client";

import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BackButton = () => {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <Button variant="text" onClick={goBack}>
      <ArrowBackIcon color="disabled" fontSize="large" />
    </Button>
  );
};
