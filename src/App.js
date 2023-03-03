import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fullstack-bakalarka-production.up.railway.app/players")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(data);
  return <div>Commit in github will result into change of site appearance</div>;
}

export default App;
