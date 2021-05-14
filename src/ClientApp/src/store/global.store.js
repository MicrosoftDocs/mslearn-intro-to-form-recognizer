import create, { SetState, GetState } from "zustand";

// ---------------------------------------------------------------
// Global Methods (are here because they manipulate global state)
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Global State vars
// ---------------------------------------------------------------
// defines a store, setting the intial state
export const useStore = create((set, get) => ({
  SelectedDocument: "Invoices",
}));
