import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import FriendsDetailPage from './pages/FriendsDetailPage';
import FriendsPage from './pages/FriendsPage';
import MainPage from './pages/MainPage';
import NewsPage from './pages/NewsPage';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import RegistrationPage from './pages/RegistrationPage';
import { setupStore } from './store';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='page'>
          <Routes>
            <Route path='/auth' element={<AuthPage />}></Route>
            <Route path='/register' element={<RegistrationPage />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<MainPage/>} path="/" />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<Profile/>} path='/profile' />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<NewsPage/>} path='/news' />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<FriendsPage/>} path='/friends' />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<FriendsDetailPage/>} path='/friends/:id' />
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
