import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './hooks/useTheme.js'
import { FavoritesProvider } from './hooks/useFavorites.js'
import { ToastProvider } from './hooks/useToast.jsx'
import { AnnouncerProvider } from './hooks/useAnnouncer.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider>
          <FavoritesProvider>
            <AnnouncerProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </AnnouncerProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
