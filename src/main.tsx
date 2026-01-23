import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home.tsx";
import RestaurantPage from "./pages/Restaurant.tsx";
import Authenticated from "./components/authenticated.tsx";
import { LoginPage } from "./pages/Login.tsx";
import Guest from "./components/guest.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Authenticated>
        <Home />
      </Authenticated>
    ),
  },
  {
    path: "/login",
    element: (
      <Guest>
        <LoginPage />
      </Guest>
    ),
  },
  {
    path: "/restaurant/:id",
    element: (
      <Authenticated>
        <RestaurantPage />
      </Authenticated>
    ),
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>,
);
