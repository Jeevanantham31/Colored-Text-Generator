import { useState, useRef, useEffect } from "react";
import { Textarea, Button, Group, Stack, Title, Text, Container, Box } from "@mantine/core";

const ansiColors = [
  { code: "30", color: "#4f545c", label: "Dark Gray" },
  { code: "31", color: "#dc322f", label: "Red" },
  { code: "32", color: "#859900", label: "Yellowish Green" },
  { code: "33", color: "#b58900", label: "Gold" },
  { code: "34", color: "#268bd2", label: "Light Blue" },
  { code: "35", color: "#d33682", label: "Pink" },
  { code: "36", color: "#2aa198", label: "Teal" },
  { code: "37", color: "#ffffff", label: "White" },
];

const bgColors = [
  { code: "40", color: "#002b36", label: "Blueish Black" },
  { code: "41", color: "#cb4b16", label: "Rust Brown" },
  { code: "42", color: "#586e75", label: "Gray (40%)" },
  { code: "43", color: "#657b83", label: "Gray (45%)" },
  { code: "44", color: "#839496", label: "Light Gray (55%)" },
  { code: "45", color: "#6c71c4", label: "Blurple" },
  { code: "46", color: "#93a1a1", label: "Light Gray (60%)" },
  { code: "47", color: "#fdf6e3", label: "Cream White" },
];

export default function DiscordTextGenerator() {
  const [text, setText] = useState("Welcome to Colored Text Generator!");
  const [styledText, setStyledText] = useState(text);
  const [alert, setAlert] = useState(null); 

  const textRef = useRef(null);

  useEffect(() => {
    
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 1000); 

      return () => clearTimeout(timer); 
    }
  }, [alert]);

  const applyAnsiColor = (color, type) => {
    const selectedText = window.getSelection().toString();
    if (!selectedText) {
      setAlert({
        message: "Please select some text to style!",
        type: "error",
      });
      return;
    }

    const newStyledText = styledText.replace(
      selectedText,
      `<span style='${type === "fg" ? "color" : "background-color"}: ${color};'>${selectedText}</span>`
    );
    setStyledText(newStyledText);
    setAlert({
      message: "Style applied successfully!",
      type: "success",
    });
  };

  const resetAllStyles = () => {
    setStyledText(text);
    setAlert({
      message: "All styles have been reset!",
      type: "info",
    });
  };

  const copyToClipboard = () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = styledText;
    const plainText = tempElement.innerText;
    navigator.clipboard.writeText(plainText);
    setAlert({
      message: "Copied to clipboard!",
      type: "success",
    });
  };

  return (
    <Container
      style={{
        textAlign: "center",
        backgroundColor: "#36393F",
        color: "#FFF",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
     
      {alert && (
        <Box
          style={{
            backgroundColor: alert.type === "error" ? "#FF6B6B" : alert.type === "success" ? "#4CAF50" : "#2196F3",
            color: "#FFF",
            padding: "8px 16px", 
            borderRadius: "10px", 
            marginBottom: "16px", 
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            fontFamily: "monospace",
            fontSize: "14px", 
            maxWidth: "300px", 
            margin: "0 auto", 
            animation: "fadeIn 0.5s",
            textAlign: "center", 
          }}
        >
          {alert.message}
        </Box>
      )}

  

      <Stack align="center" spacing="md">
        <Title order={2}>Discord Text Styler</Title>
        <Group spacing="xs">
          <Button size="sm" onClick={resetAllStyles}>
            Reset All
          </Button>
        </Group>
        <Text weight={700}>Foreground Colors</Text>
        <Group>
          {ansiColors.map(({ code, color, label }) => (
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
              key={code}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#2F3136",
                  color: "#FFF",
                  padding: "6px 8px",
                  borderRadius: "4px",
                  fontSize: "15px",
                  visibility: "hidden",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  whiteSpace: "nowrap",
                }}
                className="tooltip-label"
              >
                {label}
              </span>
              <Button
                style={{
                  backgroundColor: color,
                  width: 32,
                  height: 32,
                  border: "1px solid white",
                  margin: "7px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.previousSibling.style.visibility = "visible") &&
                  (e.currentTarget.previousSibling.style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.previousSibling.style.visibility = "hidden") &&
                  (e.currentTarget.previousSibling.style.opacity = "0")
                }
                onClick={() => applyAnsiColor(color, "fg")}
              />
            </div>
          ))}
        </Group>
        <Text weight={700}>Background Colors</Text>
        <Group>
          {bgColors.map(({ code, color, label }) => (
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
              key={code}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#2F3136",
                  color: "#FFF",
                  padding: "6px 8px",
                  borderRadius: "4px",
                  fontSize: "15px",
                  visibility: "hidden",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  whiteSpace: "nowrap",
                }}
                className="tooltip-label"
              >
                {label}
              </span>
              <Button
                style={{
                  backgroundColor: color,
                  width: 32,
                  height: 32,
                  border: "1px solid white",
                  margin: "7px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.previousSibling.style.visibility = "visible") &&
                  (e.currentTarget.previousSibling.style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.previousSibling.style.visibility = "hidden") &&
                  (e.currentTarget.previousSibling.style.opacity = "0")
                }
                onClick={() => applyAnsiColor(color, "bg")}
              />
            </div>
          ))}
        </Group>
        <Textarea
          ref={textRef}
          value={text}
          onChange={(event) => {
            setText(event.currentTarget.value);
            setStyledText(event.currentTarget.value);
          }}
          autosize
          minRows={5}
          styles={{
            input: {
              backgroundColor: "#2F3136",
              color: "#B9BBBE",
              fontFamily: "monospace",
              resize: "vertical",
              width: "100%",
              maxWidth: "800px",
              margin: "0 auto",
              marginTop: "25px",
            },
          }}
        />
        <Box
          dangerouslySetInnerHTML={{ __html: styledText }}
          style={{
            backgroundColor: "#2F3136",
            padding: "10px",
            borderRadius: "5px",
            fontFamily: "monospace",
            minHeight: "50px",
            width: "500px",
          }}
        />
        <Button
          color="blue"
          onClick={copyToClipboard}
          style={{
            marginTop: "25px",
          }}
        >
          Copy text as Discord formatted
        </Button>
      </Stack>
    </Container>
  );
}
