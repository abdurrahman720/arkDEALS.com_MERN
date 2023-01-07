import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';

function App() {
  return (
    <div className="max-w-[1240px] mx-auto font-custom1">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
