import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { ThemeProvider } from './components/ThemeProvider.jsx';

export function render(url) {
  const initialView = url === '/about' ? 'about' : 'app';
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <ThemeProvider>
        <App initialView={initialView} />
      </ThemeProvider>
    </React.StrictMode>
  );
  return html;
}
