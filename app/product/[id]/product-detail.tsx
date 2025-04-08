"use client";

import { BackButton } from "@/app/components/back-button";
import client from "@/app/lib/apollo-client";
import { GET_PRODUCT } from "@/app/lib/apollo-queries";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const ProductDetail = ({ id }: { id: string }) => {
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
          Fetching data...
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
              sx={{ "& > :not(style)": { m: 1 } }}
            >
              <TextField fullWidth label="Name" value={data.name} />
              <TextField
                fullWidth
                label="Name"
                value={data.description}
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                type="number"
                label="Price"
                value={data.price.toFixed(2)}
              />
              <TextField fullWidth label="Category" value={data.category} />
              <TextField
                fullWidth
                type="number"
                label="Stock"
                value={data.stock}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};
