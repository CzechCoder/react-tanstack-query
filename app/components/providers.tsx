"use client";

import client from "@/app/lib/apollo-client";
import { queryClient } from "@/app/lib/query-client";

import { ApolloProvider } from "@apollo/client";
import { QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApolloProvider>
  );
}
