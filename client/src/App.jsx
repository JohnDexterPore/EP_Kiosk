import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dinein from "./Dinein";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dinein" element={<Dinein />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
