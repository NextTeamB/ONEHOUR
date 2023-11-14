"use client";

import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ModalProvider } from "@/context/modalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ModalProvider>
          {children}
        </ModalProvider>
      </PersistGate>
    </Provider>
  );
}
