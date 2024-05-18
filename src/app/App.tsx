import { AppLayout } from "../widgets";
import { useInitializeAppQuery } from "./service/appInitializationApi.ts";

function App() {
  const { data } = useInitializeAppQuery();

  return (
    <div className="bg-light-300">
      <AppLayout />
    </div>
  );
}

export default App;
