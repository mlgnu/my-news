import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "./components/Navbar";
import { Articles } from "./components/Articles";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Navbar />
        <Articles />
      </>
    </QueryClientProvider>
  );
}

export default App;
