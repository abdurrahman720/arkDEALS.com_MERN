import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="max-w-[1240px] mx-auto font-custom1">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
position="bottom-center"
autoClose={1997}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="colored"
/>
    </div>
  );
}

export default App;
