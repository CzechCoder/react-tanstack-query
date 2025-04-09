"use client";

import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import client from "@/app/lib/apollo-client";
import Image from "next/image";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type FormData = {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
};

import { GET_PRODUCT, UPDATE_PRODUCT } from "@/app/lib/apollo-queries";
import { BackButton } from "@/app/components/back-button";
import { CustomSnackbar } from "@/app/components/snackbar";

export const ProductDetail = ({ id }: { id: string }) => {
  // state for the custom snackbar, keep it all in one object for readability and manipulation
  const [snackState, setSnackState] = useState<{
    open: boolean;
    message: string;
    severity: AlertSeverity;
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  // state to gather inputs
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  // fetch product's data, but only when the id arrives
  const { data, error, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await client.query({
        query: GET_PRODUCT,
        variables: { id },
      });
      return data.product;
    },
    enabled: !!id,
  });

  // set product's data to state for editing with inputs
  useEffect(() => {
    if (data) {
      setFormData((prev) => {
        // (shallow check) to avoid unnecessary render cycle
        if (
          prev.name !== data.name ||
          prev.description !== data.description ||
          prev.price !== String(data.price) ||
          prev.category !== data.category ||
          prev.stock !== String(data.stock)
        ) {
          return {
            name: data.name ?? "",
            description: data.description ?? "",
            price: data.price?.toString() ?? "",
            category: data.category ?? "",
            stock: data.stock?.toString() ?? "",
          };
        }
        return prev;
      });
    }
  }, [data]);

  // send data to DB, change number values to appropriate formats
  const { isPending, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await client.mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          stock: parseInt(formData.stock),
        },
      });
    },
    // open success snack to let user know it's all good
    onSuccess: () => {
      setSnackState({
        open: true,
        message: "Product data changed successfully.",
        severity: "success",
      });
    },
    // inform the user something went wrong
    onError: () => {
      setSnackState({
        open: true,
        message: "Failed to update product.",
        severity: "error",
      });
    },
  });

  // gather inputs
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // submit form
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutate(formData);
    },
    [formData, mutate]
  );

  return (
    <>
      <Stack direction="row">
        <BackButton />
        <Typography
          component="h3"
          variant="h3"
          className="text-2xl font-bold mb-4"
        >
          Product detail
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {error && (
        <Typography variant="body1" component="h4" color="primary">
          Error getting data! Please try again later or contact the
          administrator!
        </Typography>
      )}
      {isLoading && (
        <Typography variant="body1" color="primary">
          Loading product...
        </Typography>
      )}
      {data === null && (
        <Typography variant="body1">No product data found.</Typography>
      )}
      {data && (
        <Grid container spacing={2} columns={2} maxWidth="lg">
          <Grid size={1}>
            <Box maxWidth="100%" height="auto" position="relative">
              <Image
                alt="product image"
                src={data.image_url}
                width={500}
                height={500}
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  aspectRatio: "auto 1 / 1",
                }}
              />
            </Box>
          </Grid>
          <Grid size={1}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              sx={{ "& > :not(style)": { m: 1 } }}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                multiline
                rows={2}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="number"
                label="Stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
              <Button type="submit" variant="contained" disabled={isPending}>
                Save changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
      <CustomSnackbar snackState={snackState} onClose={setSnackState} />
    </>
  );
};
