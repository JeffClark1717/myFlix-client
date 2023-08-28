import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view.jsx';
import  Container  from 'react-bootstrap/Container';
import './index.scss';

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <>
      <h1 className='heading'>NotFlix</h1>
      <Container>
        <MainView />
      </Container>
    </>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<App />);