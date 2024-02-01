import logo from "./assets/logo.png";
import { useState, useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { analytics, db } from "./config/firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const site = window.location;
  const [lengthOfWord, setLengthOfWord] = useState(0);
  const [words, setWords] = useState("");
  const handleChangeInputValue = (e) => {
    setWords(e.target.value);
    setLengthOfWord(length(e.target.value));
  };
  const length = (word) => {
    return word.split(" ").filter(Boolean).length;
  };
  const userAgentCollection = collection(db, "userAgents");
  useEffect(() => {
    logEvent(analytics, "screen_view", {
      screen_name: "Home Page",
      screen_class: "Main",
    });
    var userAgent = navigator.userAgent;

    logEvent(analytics, "user_agent_info", {
      user_agent: userAgent,
    });

    async function add() {
      const userAgent = navigator.userAgent;
      const date = new Date();
      

      addDoc(userAgentCollection, {
        userAgent,
        date: date.toTimeString(),
        site: JSON.stringify(site),
      });
    }
    add();
  }, [userAgentCollection, site]);

  return (
    <div className="App">
      <nav className="flex-x">
        <img src={logo} alt="This is logo of the `How Many Words?` website" />
        <div className="navItems flex-x">
          <a
            href="https://github.com/mamurovDev/HowManyWords"
            rel="noreferrer"
            target="_blank"
          >
            GitHub code
          </a>
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
          <h2>Essay Input</h2>
          <p className="description">
            Type your essay in the box below and the word count will be updated
            in real time.{" "}
          </p>
        </div>
        <form>
          <textarea
            className="nam"
            value={words}
            onInput={handleChangeInputValue}
            placeholder="Type your essay here..."
            spellCheck="true"
          ></textarea>
          <p className="word">Word count: {lengthOfWord}</p>
        </form>
      </div>
      <footer className="flex-x">
        <p>Made by ❤️</p>
      </footer>
    </div>
  );
}

export default App;
