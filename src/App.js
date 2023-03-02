import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fullstack-bakalarka-production.up.railway.app")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  return <div>Hello from react</div>;
}

export default App;
