"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

export const BackButton = () => {
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <Button
      variant="text"
      onClick={goBack}
      disableRipple
      disableFocusRipple
      disableTouchRipple
      style={{ backgroundColor: "transparent" }}
    >
      <ArrowBackIcon color="disabled" fontSize="large" />
    </Button>
  );
};
