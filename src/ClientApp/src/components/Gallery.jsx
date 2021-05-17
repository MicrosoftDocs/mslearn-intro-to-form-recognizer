import React from "react";
import { useStore } from "../store/global.store";

const Gallery = () => {
  const activeTab = useStore((state) => state.activeTab);
  return (
    <div className="">
      <p className="h4">{activeTab === "Invoices" ? "Invoice": "Receipt"} Gallery</p>
    </div>
  )
};

export default Gallery;
