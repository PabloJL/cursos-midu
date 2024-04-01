import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowsIcon } from "./components/Icons";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Form, Stack } from "react-bootstrap";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";

function App() {
  const {
    fromLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    toLanguage,
  } = useStore();
  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col xs="auto">
          <Stack gap={2}>
            <h2>From</h2>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            {fromLanguage}
            <Form.Control
              as="textarea"
              placeholder="Introducir texto"
              autoFocus
              style={{ height: "150px" }}
            />
          </Stack>
        </Col>
        <Col>
          <Button
            variant="link"
            // disabled={fromLanguage === "auto"}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col xs="auto">
          <Stack gap={2}>
            <h2>To</h2>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            {toLanguage}
            <Form.Control
              as="textarea"
              placeholder="Traduccion"
              style={{ height: "150px" }}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
