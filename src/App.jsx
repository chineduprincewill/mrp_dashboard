import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DefaultLayout from './protected/layout/DefaultLayout'
import PrivateRoute from './protected/layout/PrivateRoute'
import Dashboard from './protected/dashboard/Dashboard'
import AppContextProvider from "./context/AppContext";
import 'leaflet/dist/leaflet.css';
import Casefinders from "./protected/casefinders/Casefinders";

function App() {

  const url = window.location.href;
  const tokenval = url.split('#')[1];
  tokenval && localStorage.setItem('token', tokenval);
  
  return (
    <div className={`w-full `}>
      <AppContextProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoute><DefaultLayout /></PrivateRoute>}>
              <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/case-finders" element={<PrivateRoute><Casefinders /></PrivateRoute>} />
            </Route>
          </Routes>
        </Router>
      </AppContextProvider>
    </div>
  )
}

export default App
