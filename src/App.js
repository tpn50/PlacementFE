import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import StudentList from "./components/Students/StudentList";
import StudentForm from "./components/Students/StudentForm";
import InterviewList from "./components/Interviews/InterviewList";
import InterviewForm from "./components/Interviews/InterviewForm";
import Results from "./components/Results/Results";
import CSVDownload from "./components/CSV/CSVDownload";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/addstudent" element={<StudentForm />} />
        <Route path="/interviews" element={<InterviewList />} />
        <Route path="/addinterview" element={<InterviewForm />} />
        <Route path="/results" element={<Results />} />
        <Route path="/download" element={<CSVDownload />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
