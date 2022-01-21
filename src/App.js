import {Contact, Home, Navbar, Project, Skill} from "./components";
import styled from "styled-components";

function App() {
  return (
    <>
      <Navbar />
      <MainPart>
        <Home />
        <Project />
        <Skill />
        <Contact />
      </MainPart>
    </>
  );
}

const MainPart = styled.main`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App;
