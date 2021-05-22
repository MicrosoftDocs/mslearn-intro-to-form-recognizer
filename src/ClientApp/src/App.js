import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// local imports
import "./App.css";
import {
  ImageSelection,
  Results,
  AnalysedImage,
  ModelSelector,
} from "./components";
import { getDataUrlFromFile, getImageUriFromFileName } from "./utility";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import FileSelectorPage from "./pages/FileSelectorPage";
import ResultsPage from "./pages/ResultsPage";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column sticky-footer-wrapper min-vh-100">
        <main className="flex-fill">
          <Route path="/" exact>
            <LandingPage />
          </Route>

          <Route path="/fileselector" exact>
            <FileSelectorPage />
          </Route>

          <Route path="/results" exact>
            <ResultsPage />
          </Route>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
