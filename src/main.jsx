import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home.jsx'
import AddUser from './AddUser.jsx'
import UpdateUser from './UpdateUser.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://user-management-server-8wi41ig11-kamruzzaman-bayezids-projects.vercel.app/users')
      },
      {
        path: '/addUser',
        element: <AddUser></AddUser>
      },
      {
        path: '/users/:id',
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) => fetch(`https://user-management-server-8wi41ig11-kamruzzaman-bayezids-projects.vercel.app/users/${params.id}`)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
