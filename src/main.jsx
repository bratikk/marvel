import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App />
   </BrowserRouter>,
);
