// import './App.css';
// import Student from './components/students/Student/Student';

// function App() {
//   return (
//     <div className="App">
//       <Student/>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/Login/AdminLogin';
import AdminRegistration from './components/Register/AdminRegistration';
import Home from './components/Home/Home';
import Student from './components/Students/Student/Student';
import Classes from './components/Classes/Classes';
import { DataProvider } from './components/Context/Context';

const App = () => {
  return (
    <DataProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegistration />} />
        
        <Route path='/students' element={<Student />}/>
        <Route path='/classes' element={<Classes />}/>

      </Routes>
    </Router>
    </DataProvider>
  );
};

export default App;
