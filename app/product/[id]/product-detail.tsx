"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  type AlertColor,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GET_PRODUCT, UPDATE_PRODUCT } from "@/app/lib/apollo-queries";
import { BackButton } from "@/app/components/back-button";
import { CustomSnackbar } from "@/app/components/snackbar";
import client from "@/app/lib/apollo-client";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    },
    {
      message: "Price must be a non-negative number",
    }
  ),
  category: z.string(),
  stock: z.string().refine(
    (val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 0 && Number.isInteger(num);
    },
    {
      message: "Stock must be a non-negative number",
    }
  ),
});

type FormData = z.infer<typeof productSchema>;

const legoCategories: string[] = [
  "Architecture",
  "City",
  "Classic",
  "Creator",
  "Friends",
  "Harry Potter",
  "Ninjago",
  "Minecraft",
  "Star Wars",
  "Technic",
];

export const ProductDetail = ({ id }: { id: string }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [snackState, setSnackState] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success" as AlertColor,
  });

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

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "Architecture",
      stock: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        description: data.description ?? "",
        price: data.price?.toString(),
        category: data.category || "City",
        stock: data.stock?.toString(),
      });
    }
  }, [data, reset]);

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
    onSuccess: () => {
      setSnackState({
        open: true,
        message: "Product data changed successfully.",
        severity: "success",
      });
    },
    onError: () => {
      setSnackState({
        open: true,
        message: "Failed to update product.",
        severity: "error",
      });
    },
  });

  const onSubmit = (formData: FormData) => {
    mutate(formData);
  };

  const categoryOptions = useMemo(() => {
    return legoCategories.map((cat) => (
      <MenuItem key={cat} value={cat}>
        {cat}
      </MenuItem>
    ));
  }, []);

  return (
    <>
      <Stack direction="row">
        <BackButton />
        <Typography
          component="h4"
          variant={isSmall ? "h4" : "h3"}
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
        <Grid container spacing={2} columns={{ xs: 1, sm: 2 }} maxWidth="lg">
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
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ "& > :not(style)": { m: 1 } }}
            >
              <TextField
                fullWidth
                label="Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                fullWidth
                label="Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                type="number"
                label="Price"
                {...register("price")}
                slotProps={{ htmlInput: { min: 0 } }}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="category-label">Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="category-label"
                      id="category"
                      label="Category"
                    >
                      {categoryOptions}
                    </Select>
                  )}
                />
                <Typography variant="caption" color="error">
                  {errors.category?.message}
                </Typography>
              </FormControl>
              <TextField
                fullWidth
                type="number"
                label="Stock"
                {...register("stock")}
                slotProps={{ htmlInput: { min: 0 } }}
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                startIcon={
                  isPending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
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
