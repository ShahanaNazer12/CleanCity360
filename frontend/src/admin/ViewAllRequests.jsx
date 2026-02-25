import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setRequests } from "../redux/requestSlice";
import instance from "../../axios";


function ViewAllRequests() {
  const { requests } = useSelector((state) => state.requests);
  console.log(requests)
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchedRequests = async () => {
      try {
        const { data } = await instance.get(
          "garbage/view-requests",
          { withCredentials: true }
        );
        dispatch(setRequests(data.requests));

      } catch (error) {
        console.log(error)

      }

    }
    fetchedRequests()

  }, [dispatch])
  return (
    <Container>
      <Row>
        <h1 className=" text-center mt-3 mb-3">View All Requests</h1>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Area</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => (
                <tr key={i} >
                  <td>{i + 1}</td>

                  <td>{req.user?.fullName}</td>


                  <td>{req.area?.areaName}</td>

                  <td>{req.description}</td>

                  <td className={req.status === "completed" ? "text-success" : "text-warning"}>
                    {req.status}
                  </td>

                </tr>
              ))}



            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default ViewAllRequests