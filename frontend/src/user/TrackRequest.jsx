
import { useEffect, useState } from "react";
import { Container, Table, Badge, Modal, Button } from "react-bootstrap";
import instance from "../../axios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRequest } from "../redux/requestSlice";
import { toast } from "react-toastify";

function TrackRequests() {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteRequestId, setDeleteRequestId] = useState(null);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setDeleteRequestId(id);
    setShow(true);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await instance.get("/garbage/track-requests", {
        withCredentials: true,
      });
      setRequests(data.requests);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch requests");
    }
  };

  const handleDelete = async () => {
    try {
      await instance.delete(`/garbage/delete-request/${deleteRequestId}`, {
        withCredentials: true,
      });

      setRequests((prev) =>
        prev.filter((req) => req._id !== deleteRequestId)
      );

      dispatch(deleteRequest(deleteRequestId));

      toast.success("Request deleted successfully");
      setShow(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "assigned":
        return <Badge bg="info">Assigned</Badge>;
      case "completed":
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <>
      <Container className="mt-4">
        <h2 className="text-center mb-4">Track My Requests</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Area</th>
              <th>Description</th>
              <th>Worker</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.area?.areaName || "N/A"}</td>
                  <td>{req.description}</td>
                  <td>{req.assignedWorker?.fullName || "Not Assigned"}</td>
                  <td>
                    <Link to={`/user/edit-requests/${req._id}`}>
                      <CiEdit size={23} />
                    </Link>
                  </td>
                  <td>
                    <MdDelete
                      size={23}
                      style={{ cursor: "pointer" }}
                      className=" text-danger "
                      onClick={() => handleShow(req._id)}
                    />
                  </td>
                  <td>{getStatusBadge(req.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this request?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TrackRequests;