import Layout from "./components/Layout/Layout";
import { CarProvider } from "./pages/CarContext";

function App() {
  return (
    // Wrap your entire layout with the CarProvider so that it can access the context
    <CarProvider>
      <Layout />
    </CarProvider>
  );
}

export default App;
