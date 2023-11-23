import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  RouterProvider,
} from "react-router-dom";
import Router from './router/Router';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/Theme';
import AuthProvider from './providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={Router} />
    </React.StrictMode>
  </AuthProvider>
  ,
)
