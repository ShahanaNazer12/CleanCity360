import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import UserDashboard from './user/UserDashboard';
import WorkerDashboard from './worker/WorkerDashboard';
import AdminDashboard from './admin/AdminDashboard';
import AddArea from './admin/AddArea';
import ListArea from './admin/ListArea';
import EditArea from './admin/EditArea';
import AddWorker from './admin/AddWorker';
import ListWorker from './admin/ListWorker';
import EditWorker from './admin/EditWorker';
import AssignAreaToWorker from './admin/AssignAreaToWorker';
import ViewAssignedRequest from './worker/ViewAssignedRequest';
import CreateRequest from './user/CreateRequest';
import ViewAllRequests from './admin/ViewAllRequests';
import TrackRequests from './user/TrackRequest';
import Footer from './components/Footer';
import "../App.css"
import ProtectedRoute from '../utils/ProtectedRoute';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import ViewCompletedRequest from './worker/ViewCompletedRequest';
import EditRequest from './user/EditRequest';
import UpdateProfile from './user/UpdateProfile';
import ViewProfile from './user/ViewProfile';
import ChangePassword from './user/ChangePassword';
import ListUsers from './admin/ListUsers';



function App() {
  

  return (
    <>
    
  
   <BrowserRouter>
      <div className="app-container">
        <Header />

        <ToastContainer autoClose={2000} />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/contactus' element={<ContactUs/>}/>

            
     

            {/* <Route path="/user/user-dashboard" element={<UserDashboard />} /> */}
            <Route path='/user/user-dashboard' element={<ProtectedRoute requiredRole={["user"]}>
              <UserDashboard/>
            </ProtectedRoute>}/>

            <Route path="/worker/worker-dashboard" element={<ProtectedRoute requiredRole={["worker"]}>
              <WorkerDashboard />
            </ProtectedRoute>} />

            <Route path="/admin/admin-dashboard" element={<ProtectedRoute requiredRole={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>} />

            <Route path="/admin/add-area" element={<ProtectedRoute requiredRole={['admin']}>
              <AddArea />
            </ProtectedRoute>} />

            <Route path="/admin/list-area" element={<ProtectedRoute requiredRole={["admin"]}>
              <ListArea />
            </ProtectedRoute>} />

            <Route path="/admin/edit-area/:id" element={<EditArea />} />
            <Route path="/admin/add-worker" element={<AddWorker />} />
            <Route path="/admin/list-worker" element={<ListWorker />} />
            <Route path="/admin/edit-worker/:id" element={<EditWorker />} />
            <Route path="/admin/assign-area" element={<AssignAreaToWorker />} />
            <Route path="/admin/view-all-requests" element={<ViewAllRequests />} />
            <Route path='/admin/list-users' element={<ListUsers/>}/>

            <Route path="/worker/view-requests" element={<ViewAssignedRequest />} />
            <Route path="/worker/view-completed-requests" element={<ViewCompletedRequest />} />

            <Route path="/user/create-request" element={<CreateRequest />} />
            <Route path="/user/track-requests" element={<TrackRequests />} />
            <Route path="/user/edit-requests/:id" element={<EditRequest />} />
            <Route path="/user/update-profile" element={<UpdateProfile />} />
            <Route path="/user/view-profile" element={<ViewProfile />} />
            <Route path="/user/change-pass" element={<ChangePassword />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
