import { createLazyFileRoute } from "@tanstack/react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const Route = createLazyFileRoute("/login")({
    component: Login,
});

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="email"
                            >
                                <Form.Label column sm={3}>
                                    Email
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextPassword"
                            >
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                        <div className="d-grid gap-2">
                            <Button variant="primary">Login</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}