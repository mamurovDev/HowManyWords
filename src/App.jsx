import logo from "./assets/logo.png";
import { useState, useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { analytics, db } from "./config/firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const site = window.location.origin;
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
    let userAgent = navigator.userAgent.toLowerCase();

    logEvent(analytics, "user_agent_info", {
      user_agent: userAgent,
    });

    let browserInfo = "";
    let deviceInfo = "";
    switch (true) {
      case navigator.userAgent.indexOf("Firefox") !== -1:
        browserInfo = "Firefox";
        break;
      case navigator.userAgent.indexOf("Chrome") !== -1:
        browserInfo = "Chrome";
        break;
      default:
        browserInfo = "Unknown";
    }

    if (userAgent.match(/android/i)) {
      deviceInfo = "Android";
    } else if (userAgent.match(/iphone|ipad|ipod/i)) {
      deviceInfo = "iOS";
    } else if (userAgent.match(/windows/i)) {
      deviceInfo = "Windows";
    } else if (userAgent.match(/mac os/i)) {
      deviceInfo = "Mac OS";
    } else if (userAgent.match(/linux/i)) {
      deviceInfo = "Linux";
    }
    async function add() {
      const date = new Date();
      console.log(date);
      try {
        addDoc(userAgentCollection, {
          browser: browserInfo,
          device: deviceInfo,
          date: date,
          site: JSON.stringify(site),
        });
      } catch (error) {}
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
          <div className="flex-x justify-between">
            <h2>Essay Input</h2>
          </div>
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
