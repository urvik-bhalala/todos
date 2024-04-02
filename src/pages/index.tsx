import { Container } from "react-bootstrap";
import Todos from "../components/Todos";

const HomePage = () => {
    return (
        <>
            <Container>
                <div>
                    <Todos />
                </div>
            </Container>
        </>
    )
}

export default HomePage;