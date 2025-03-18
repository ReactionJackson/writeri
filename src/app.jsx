import { useState } from "preact/hooks";
import styled from "styled-components";

/*
    NOTES:
    The scout editions notebook is 30x15 squares big, plus the header info (date, title)
*/

// Styled Components:

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Page = styled.div`
  z-index: 100;
  position: relative;
  width: ${({ $unit }) => $unit * 30 + 1}px;
  height: ${({ $unit }) => $unit * 15 + 1}px;
  border: ${({ $unit }) => $unit}px solid #fffbe8;
  border-top-width: ${({ $unit }) => $unit * 4}px;
  border-radius: 8px;
  outline: 1px solid rgb(0 0 0 / 10%);
  box-shadow: 0 5px 50px 5px rgb(0 0 0 / 5%);
  transition: all ease 450ms;
  box-sizing: content-box;
`;

const GridBackground = styled.div`
  z-index: -100;
  position: absolute;
  inset: 0;
  opacity: ${({ $isFaded }) => ($isFaded ? 0.25 : 1)};
  background-size: ${({ $size }) => `${$size}px ${$size}px`};
  background-image: linear-gradient(
      to right,
      rgb(0 0 0 / 10%) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(0 0 0 / 10%) 1px, transparent 1px);
  background-color: #fffbe8;
  background-position: ${({ $isFaded }) => ($isFaded ? "center" : "auto")};
  transition: background-size ease 450ms;
  pointer-events: none;
`;

// Component:

export const App = () => {
  // State:

  const [squareSize, setSquareSize] = useState(20);

  // Render:

  return (
    <Container onClick={() => setSquareSize(squareSize === 20 ? 25 : 20)}>
      {/* writeri */}
      <Page $unit={squareSize}>
        this is writeri
        <GridBackground $size={squareSize} />
      </Page>
      <GridBackground $size={squareSize} $isFaded />
    </Container>
  );
};
