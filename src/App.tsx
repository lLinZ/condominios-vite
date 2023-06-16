import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages';
import { AdminRoutes, ClientRoutes } from './components/router';
// import { AuthContext } from './context/auth';
// import { useContext } from 'react';

function App() {

  // const context = useContext(AuthContext);1

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
      </Routes>
      <ClientRoutes />
      <AdminRoutes />
      {/* {
        context.authState.role?.description === 'Cliente' ? (
        ) : (
        )
      } */}
    </BrowserRouter>
  );
}

export default App;
