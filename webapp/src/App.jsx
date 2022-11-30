import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductComponent from "./pages/Products";
import ProductDetailComponent from "./pages/ProductDetail";
import UserComponent from "./pages/SubscribedUsers";
import SubscribedProductsComponent from "./pages/SubscribedProducts";
import AdminComponent from "./pages/Admin";
import HomeComponent from "./pages/Home";
import NavBarComponent from "./components/NavBar";

import Container from "react-bootstrap/Container";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      {/* React Router */}
      <BrowserRouter>
        <NavBarComponent />
        {/* Bootstrap Container  */}
        <Container>
          {/* React Query to use for clean state management */}
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/products" element={<ProductComponent />} />
              <Route path="/product/:id" element={<ProductDetailComponent />} />
              <Route path="/subscribedusers" element={<UserComponent />} />
              <Route
                path="/subscribedproducts"
                element={<SubscribedProductsComponent />}
              />
              <Route path="/admin" element={<AdminComponent />} />
            </Routes>
          </QueryClientProvider>
        </Container>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
