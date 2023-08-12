import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import "./index.scss";
import Container from 'react-bootstrap/Container';

const App = () => {
    return (
        <Container style={{border: "5px solid seagreen"}}>
            <MainView />
        </Container>
    );
    };

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);