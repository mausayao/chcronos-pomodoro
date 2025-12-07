import './styles/theme.css';
import './styles/global.css';

import { Container } from './components/Container';
import { Logo } from './components/Logo';


export function App() {
    return (
        <>
        <Container>
           <Logo/>
        </Container>
        <Container>
            <section>Menu</section>
        </Container>
        </>
    );
}