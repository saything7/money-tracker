import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles.css'; // если нужны глобальные стили

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);