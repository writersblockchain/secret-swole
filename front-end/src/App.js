import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" placeholder="amount of $SWOLE to send?" />
        <input type="text" placeholder="wallet address to send $SWOLE to?" />
        <button onClick={() => console.log("Hello, world!")}>Transfer</button>
      </header>
    </div>
  );
}

export default App;
