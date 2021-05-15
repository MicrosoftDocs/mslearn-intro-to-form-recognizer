import create, { SetState, GetState } from "zustand";

// ---------------------------------------------------------------
// Global Methods (are here because they manipulate global state)
// ---------------------------------------------------------------
const setActiveTab = (tabName) => {
  const state = useStore.getState();
  useStore.setState({
    ...state,
    activeTab: tabName
  })
}

// ---------------------------------------------------------------
// Global State vars
// ---------------------------------------------------------------
// defines a store, setting the intial state
export const useStore = create((set, get) => ({
  activeTab: "Invoices",
  setActiveTab: setActiveTab
}));
