import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DefaultLayout from './protected/layout/DefaultLayout'
import PrivateRoute from './protected/layout/PrivateRoute'
import Dashboard from './protected/dashboard/Dashboard'
import AppContextProvider from "./context/AppContext";

function App() {

  return (
    <div className={`w-full `}>
      <AppContextProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoute><DefaultLayout /></PrivateRoute>}>
              <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Route>
          </Routes>
        </Router>
      </AppContextProvider>
    </div>
  )
}

export default App
