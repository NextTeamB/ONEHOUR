"use client";

import { Provider } from "react-redux";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={persistor}>
          {children}
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}
