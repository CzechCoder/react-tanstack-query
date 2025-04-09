"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/app/lib/query-client";
import { ApolloProvider } from "@apollo/client";
import client from "@/app/lib/apollo-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApolloProvider>
  );
}
