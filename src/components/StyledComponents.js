import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${(props) => (props.darkMode ? "#111827" : "#F9FAFB")};
  color: ${(props) => (props.darkMode ? "white" : "black")};
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => (props.darkMode ? "#F3F4F6" : "#1F2937")};
  color: ${(props) => (props.darkMode ? "#1F2937" : "#F3F4F6")};
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const GridItem = styled.div`
  background-color: ${(props) => (props.darkMode ? "#1F2937" : "white")};
  border-radius: 0.5rem;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: ${(props) => (props.minimized ? "50px" : "auto")};
`;

export const DragHandle = styled.div`
  cursor: move;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(150px, auto);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;