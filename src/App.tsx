import { Routes, Route } from 'react-router-dom'
import Home from "./components/Home/Home";
import Post from './components/Post/Post';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/post/:id" element={<Post />}/>
    </Routes>
  );
}

export default App;
