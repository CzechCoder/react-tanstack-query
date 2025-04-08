"use client";

import { Typography, Divider } from "@mui/material";

import { ProductTable } from "@/app/components/product-table";

export default function Home() {
  return (
    <main className="p-6">
      <Typography
        component="h3"
        variant="h3"
        className="text-2xl font-bold mb-4"
      >
        LEGO Products Table
      </Typography>
      <Divider sx={{ my: 2 }} />

      <ProductTable />
    </main>
  );
}
