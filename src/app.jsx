import { useState, useEffect } from "preact/hooks";
import styled from "styled-components";

// Constants:

const SIZES = {
  UNIT: 20,
};

// Styled Components:

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Page = styled.div`
  z-index: 100;
  position: relative;
  width: ${({ $unitSize }) => $unitSize * 30 + 1}px;
  height: ${({ $unitSize }) => $unitSize * 15 + 1}px;
  border: ${({ $unitSize }) => $unitSize}px solid #fffbe8;
  border-top-width: ${({ $unitSize }) => $unitSize * 4}px;
  border-radius: 8px;
  outline: 1px solid rgb(0 0 0 / 10%);
  box-shadow: 0 5px 50px 5px rgb(0 0 0 / 5%);
  transition: all ease 450ms;
  box-sizing: content-box;
`;

const Grid = styled.div`
  z-index: -100;
  position: absolute;
  inset: 0;
  opacity: ${({ $isFaded }) => ($isFaded ? 0.25 : 1)};
  background-size: ${({ $unitSize }) => `${$unitSize}px ${$unitSize}px`};
  background-image: linear-gradient(
      to right,
      rgb(0 0 0 / 10%) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(0 0 0 / 10%) 1px, transparent 1px);
  background-color: #fffbe8;
  background-position: ${({ $isFaded }) => ($isFaded ? "center" : "auto")};
  transition: background-size ease 450ms;
`;

const TextNode = styled.textarea`
  position: absolute;
  transform: translate3d(
    ${({ $coords }) => $coords.x * SIZES.UNIT}px,
    ${({ $coords }) => $coords.y * SIZES.UNIT}px,
    0
  );
  width: ${({ $width }) => $width * SIZES.UNIT}px;
  height: ${({ $height }) => $height};
  resize: none;
  overflow: hidden;
  background: transparent;
  transition: transform ease 450ms;
`;

// Component:

export const App = () => {
  // State:

  const [unitSize, setUnitSize] = useState(20);
  const [startCoords, setStartCoords] = useState(false);
  const [endCoords, setEndCoords] = useState(false);
  const [value, setValue] = useState("");
  const [showTextNode, setShowTextNode] = useState(false);

  // Methods:

  const handleInput = ({ target }) => {
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
    // target.style.height = Math.ceil(target.scrollHeight / 10) * 10 + "px";
    setValue(target.value);
  };

  const getCoords = ({ offsetX, offsetY }) => ({
    x: Math.floor(offsetX / 20),
    y: Math.floor(offsetY / 20),
  });

  const handleMouseDown = (e) => {
    setEndCoords(false);
    setStartCoords(getCoords(e));
  };

  const handleMouseUp = (e) => {
    setEndCoords(getCoords(e));
  };

  // Effects:

  useEffect(() => {
    if (!endCoords) return;
    setShowTextNode(true);
    console.log({ startCoords, endCoords });
  }, [startCoords, endCoords]);

  // Render:

  return (
    <Container>
      <Page $unitSize={unitSize}>
        {showTextNode && (
          <TextNode
            $coords={startCoords}
            $width={
              Math.max(startCoords.x, endCoords.x) -
              Math.min(startCoords.x, endCoords.x)
            }
            onChange={handleInput}
            spellCheck="false"
            autoCorrect="off"
            placeholder="hey there..."
          >
            {value}
          </TextNode>
        )}
        <Grid
          $unitSize={unitSize}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </Page>
      <Grid $unitSize={unitSize} $isFaded />
    </Container>
  );
};
