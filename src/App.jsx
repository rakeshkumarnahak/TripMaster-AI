import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import Header from "./components/custom/Header";
import ViewTrip from "./pages/ViewTrip";
import AllTrips from "./pages/AllTrips";
import Footer from "./components/custom/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-trips" element={<AllTrips />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trips/:tripId" element={<ViewTrip />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
