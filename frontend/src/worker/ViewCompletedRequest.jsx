import { Col, Container, Row, Table, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../redux/requestSlice";
import { useEffect } from "react";
import instance from "../../axios";
import { toast } from "react-toastify";

function ViewCompletedRequest() {
  const { requests } = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        const { data } = await instance.get(
          "/user/view-request-worker?status=completed",
          { withCredentials: true }
        );
        dispatch(setRequests(data.requests));
      } catch (error) {
        toast.error("Failed to fetch completed requests");
      }
    };

    fetchCompletedRequests();
  }, [dispatch]);

  return (
    <Container>
      <Row className="justify-content-center">
        <h1 className="text-center mt-3 mb-3">Completed Requests</h1>

        {requests.length === 0 ? (
          <Col>
            <h4 className="text-center text-muted">
              No completed requests found
            </h4>
          </Col>
        ) : (
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Area</th>
                  <th>Description</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((rqsts, i) => (
                  <tr key={rqsts._id}>
                    <td>{i + 1}</td>
                    <td>{rqsts.user?.fullName}</td>
                    <td>{rqsts.area?.areaName}</td>
                    <td>{rqsts.description}</td>
                    <td className="text-center">
                      <Badge bg="success">{rqsts.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ViewCompletedRequest;
