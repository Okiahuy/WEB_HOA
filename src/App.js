import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';

function App() {

  return (

    <div>
     
    <Router>
      <Routes>
       {/* Admin layout and routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          
          <Route path="*" element={<AdminRoutes />} />
        </Route>

        {/* User layout and routes */}
        <Route path="/*" element={<UserLayout />}>
          <Route path="*" element={<UserRoutes />} />
        </Route>
      </Routes>
    </Router>

    </div>
  );
}

export default App;

