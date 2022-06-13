import { Config } from 'chessground/config';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Chessground from './Chessground';

// temporary for testing Chessground
import "./styles/index.css";
const config: Config = {};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <div className = "board">
      <Chessground  { ...config } />
    </div>
  </StrictMode>
);
