import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
function App() {

  const router = createBrowserRouter([
    {
      path:'/register',
      element:<Register />,
      errorElement:`This is error`
    },
    {
      path:'/login',
      element:<Login />,
      errorElement:`This is error`
    },
    {
      path:'/',
      element:<Chat />,
      errorElement:`This is error`
    },
    {
      path:'/setavatar',
      element:<SetAvatar />
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
