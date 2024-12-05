import React, { Suspense } from "react";
import Loader from "../Components/Loader";

// Lazy load App component
const App = React.lazy(() => import("../App"));

const SuspenseWrapper = () => (
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>
);

export default SuspenseWrapper;
