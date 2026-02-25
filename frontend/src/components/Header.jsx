import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/authSlice";
import { toast } from "react-toastify";

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated,user} = useSelector((state)=>state.auth);

    console.log("isauthenticated-------->",isAuthenticated)
        console.log("user-------->",user)

 


  function handleLogout(){
    dispatch(userLogout())
    navigate("/login")
    toast.success("user logged out successfully")

  }
  return (
    <Navbar expand="lg" className="custom-navbar sticky-top">
      <Container>
        <Navbar.Brand href="#home" className="brand-name">
          CleanCity360
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contactus">Contact</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {isAuthenticated ?(
              
              
               <NavDropdown title={user?.fullName||"profile"} id="basic-nav-dropdown">
                {user?.role === "admin" && (
                  <>
                  <NavDropdown.Item as={Link} to="/admin/admin-dashboard">
                Admin Dashboard
              </NavDropdown.Item>
               <NavDropdown.Item as={Link} to="/admin/add-worker">
                Add Worker
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/list-worker">
                List workers
              </NavDropdown.Item>
               <NavDropdown.Item as={Link} to="/admin/add-area">
                Add Area
              </NavDropdown.Item>
               <NavDropdown.Item as={Link} to="/admin/list-area">
                List Area
              </NavDropdown.Item>
               <NavDropdown.Item as={Link} to="/admin/list-users">
                List Users
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/view-all-requests">
                View  Requests
              </NavDropdown.Item>
              </>
              

                )}
              
              {user?.role === "worker" &&(
                <>
                <NavDropdown.Item as={Link} to="/worker/worker-dashboard">
                Worker Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/worker/view-requests">
               View Assigned Request
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/worker/view-completed-requests">
               All request
              </NavDropdown.Item>
              </>

              )}
              {user?.role === "user" &&(
                <>
                 <NavDropdown.Item as={Link} to="/user/user-dashboard">
                User Dashboard
              </NavDropdown.Item>
               <NavDropdown.Item as={Link} to="/user/create-request">
               Request Pickup
              </NavDropdown.Item>
               <NavDropdown.Item as={Link} to="/user/track-requests">
                Track Request Status
              </NavDropdown.Item>
              
               <NavDropdown.Item as={Link} to="/user/view-profile">
                View Profile
              </NavDropdown.Item>
              </>

              )}
              
             
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.4"
                className="logout"
                onClick={handleLogout}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            ):(
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
            )}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
