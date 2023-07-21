import { createRoot } from 'react-dom/client';
import './index.scss';
import { MyFlixApplication } from './App';

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<MyFlixApplication />);