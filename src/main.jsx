import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import ShopProvider from './Context/ShopProvider';
import router from './routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ShopProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ShopProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
