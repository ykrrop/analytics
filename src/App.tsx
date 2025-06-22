import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AggregatorPage } from "./features/Aggregator/AggregatorPage";
import { GeneratorPage } from "./features/Generator/GeneratorPage";
import { HistoryPage } from "./features/History/HistoryPage";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AggregatorPage />} />
          <Route path="generator" element={<GeneratorPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
