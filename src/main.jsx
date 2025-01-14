import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthProvider from './provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer position="top-left"></ToastContainer>
      </AuthProvider>

    </QueryClientProvider>
  </StrictMode>,
)
