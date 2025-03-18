import { useState } from "preact/hooks";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const GridBackground = styled.div`
  z-index: -100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: ${({ $size }) => `${$size}px ${$size}px`};
  background-image: linear-gradient(
      to right,
      rgb(0 0 0 / 10%) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgb(0 0 0 / 10%) 1px, transparent 1px);
  background-position: center center;
  background-color: #fffbe8;
  transition: background-size ease 900ms;
  pointer-events: none;
`;

export const App = () => {
  const [squareSize, setSquareSize] = useState(20);
  return (
    <Container onClick={() => setSquareSize((prev) => prev * 1.5)}>
      writeri
      <GridBackground $size={squareSize} />
    </Container>
  );
};
