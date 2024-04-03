import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from "./components/Icons";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";
import { VOICE_FOR_LANGUAGE } from "./constants";

function App() {
  const {
    fromLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    loading,
    setResult,
    toLanguage,
  } = useStore();

  const debounceFromText = useDebounce(fromText);

  const handleClipBoard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (debounceFromText === "") return;
    translate({ fromLanguage, toLanguage, text: debounceFromText })
      .then((result) => {
        if (result == null) return;
        setResult(result);
      })
      .catch(() => setResult("error"));
  }, [debounceFromText, fromLanguage, toLanguage]);

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
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
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
            <div style={{ position: "relative" }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                }}
              >
                <Button variant="link" onClick={handleClipBoard}>
                  <ClipboardIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
