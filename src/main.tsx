import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { client } from "./Utils/ApolloConfig/index.tsx";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
