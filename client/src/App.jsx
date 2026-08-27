import "./App.css";
import AddNewProperty from "./pages/admin/AddNewProperty";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Home from "./pages/Home";
import Projects from "./pages/Projects";

import ProjectDetails from "./pages/ProjectDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin/add-property" element={<AddNewProperty />} />
                <Route
  path="/projects/:id"
  element={<ProjectDetails />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;