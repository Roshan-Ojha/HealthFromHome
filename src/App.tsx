import { Outlet } from 'react-router';
function App() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Outlet />
    </div>
  );
}

export default App;
