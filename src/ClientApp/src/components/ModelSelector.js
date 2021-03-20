import { useState } from "react";
import className from "classnames";

const models = {
  invoices: {
    name: "Invoices",
    value: "invoices",
  },
  receipts: {
    name: "Receipts",
    value: "receipts",
  },
};

export const ModelSelector = ({ selectedModel, selectModel }) => {
  const [isOpen, setIsOpen] = useState();
  const onSelectModel = (model) => {
    selectModel(model);
    setIsOpen(false);
  };
  return (
    <div className="dropdown">
      <button
        style={{ minWidth: "160px" }}
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="modelSelectButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedModel ? models[selectedModel].name : "Select form type"}
      </button>
      <div
        className={className({ "dropdown-menu": true, show: isOpen })}
        aria-labelledby="modelSelectButton"
      >
        <button
          onClick={() => onSelectModel(models.invoices.value)}
          className="dropdown-item"
          href="#"
        >
          {models.invoices.name}
        </button>
        <button
          onClick={() => onSelectModel(models.receipts.value)}
          className="dropdown-item"
          href="#"
        >
          {models.receipts.name}
        </button>
      </div>
    </div>
  );
};
