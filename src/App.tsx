
// import './App.css'

// export default function App() {
//   return <div> <h1 className="text-3xl font-bold underline">Personal Dev Dashboard </h1>
// </div>
// }
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/routes";

export default function App() {
  return <RouterProvider router={router} />;
}

