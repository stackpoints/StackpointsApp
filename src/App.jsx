import { Outlet } from "react-router-dom";

import { TopBar } from "./components/header/Topbar";


function App() {
 
  return (
    
      <div className="min-h-screen">
        <TopBar />
        <Outlet />
      </div>
    
  );
}

export default App;
