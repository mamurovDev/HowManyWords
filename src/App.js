import logo from "./assets/logo.png";
import { useState } from "react";
function App() {
  const [lengthOfWord, setLengthOfWord] = useState([]);
  const [words, setWords] = useState("");
  const handleChangeInputValue = (e) => {
    let splitted = handleSplitWords(e.target.value);
    setWords(splitted.join(" "));
    setLengthOfWord(splitted);
  };
  const handleSplitWords = (splitted) => {
    return splitted.split(" ");
  };
  const showNothing = () => {
    alert("Nothing :) Hello World");
  };

  return (
    <div className="App">
      <nav className="flex-x">
        <a
          href="https://www.linkedin.com/in/nurmuhammad-mamurjonov-49913025a/"
          rel="noreferrer"
          target={"_blank"}
        >
          <img src={logo} alt="This is logo of the `How Many Words?` website" />
        </a>
        <div className="navItems flex-x">
          <p onClick={showNothing}>About</p>
          <p>GitHub code</p>
          <a
            href="https://www.linkedin.com/in/nurmuhammad-mamurjonov-49913025a/"
            target={"_blank"}
            rel="noreferrer"
          >
            Developer
          </a>
        </div>
      </nav>
      <div className="body flex-y">
        <div className="total">
          <h2>Total words: {lengthOfWord.length}</h2>
        </div>
        <form>
          <textarea className="nam" value={words} onInput={handleChangeInputValue}></textarea>
        </form>
      </div>
      <footer className="flex-x">
        <a
          href="https://github.com/mamurovDev"
          rel="noreferrer"
          target="_blank"
        >
          © mamurovDev
        </a>
      </footer>
    </div>
  );
}

export default App;
