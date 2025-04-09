"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { GET_PRODUCTS } from "@/app/lib/apollo-queries";
import client from "@/app/lib/apollo-client";
import { Typography } from "@mui/material";

export const ProductTable = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await client.query({ query: GET_PRODUCTS });
      return res.data.products;
    },
  });

  if (isLoading)
    return (
      <Typography variant="body1" color="primary">
        Loading products...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="body1" color="primary">
        Error loading products.
      </Typography>
    );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {!data || data.length === 0 ? (
        <Typography variant="body1" color="primary">
          There are no products data.
        </Typography>
      ) : (
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: any) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <Link
                    href={`/product/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="p-3">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
