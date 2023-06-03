// Lib and material
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Homepage from "./components/homepage/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
