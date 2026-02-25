import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import instance from "../../axios";
import { setUserProfile } from "../redux/authSlice";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await instance.get(
          "/auth/view-profile",
          { withCredentials: true }
        );

        if (data.status) {
          dispatch(setUserProfile(data.user));
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center fw-bold">
              My Profile
            </Card.Header>

            <Card.Body>
              <p><strong>Full Name:</strong> {user?.fullName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
             

              <div className="d-flex justify-content-between mt-4">
                <Link to="/user/update-profile">
                  <Button variant="primary">Edit Profile</Button>
                </Link>

                <Link to="/user/change-pass">
                  <Button variant="outline-danger">
                    Change Password
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewProfile;
