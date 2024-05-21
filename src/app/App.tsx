import { AppLayout } from "../widgets";
import { useInitializeAppQuery } from "./service/appInitializationApi.ts";
import { Loader } from "../shared/components";
import { useAppSelector } from "./store";

function App() {
  useInitializeAppQuery();
  const isInitialized = useAppSelector((state) => state.app.initialized);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <div>
      <AppLayout />
    </div>
  );
}

export default App;
