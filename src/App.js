import {Contact, Home, Navbar, Project, Skill} from "./components";
import styled from "styled-components";

function App() {
  return (
      <MainPart>
        테스트!!
        <Navbar />
        <Home />
        <Project />
        <Skill />
        <Contact />
      </MainPart>
  );
}

const MainPart = styled.main`

`

export default App;
