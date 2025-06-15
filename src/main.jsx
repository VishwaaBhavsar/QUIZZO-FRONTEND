import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ClerkProvider} from '@clerk/clerk-react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

const clerkPubKey=import.meta.env.VITE_CLERK_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
    <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
