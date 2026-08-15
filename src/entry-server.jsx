import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

export function render(url) {
  const initialView = url === '/about' ? 'about' : 'app';
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App initialView={initialView} />
    </React.StrictMode>
  );
  return html;
}
