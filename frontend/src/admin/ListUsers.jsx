import { Container, Row, Col, Table, Form, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import instance from "../../axios";
import { setUsers, updateUserStatus } from "../redux/authSlice";


const ListUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await instance.get(
          "/user/get-all-users",
          { withCredentials: true }
        );
        dispatch(setUsers(data.users));
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [dispatch]);


async function handleStatusChange(id) {
  try {
    const { data } = await instance.put(
      `/user/update-status/${id}`,
      {},
      { withCredentials: true }
    );

    dispatch(updateUserStatus({ id, status: data.status }));
    toast.success(data.message);

  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
}

  const handleDelete = async () => {
    try {
      const { data } = await instance.delete(
        `/user/delete-user/${userId}`,
        { withCredentials: true }
      );
      dispatch(deleteUser(userId));
      setShow(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Container>
        <h2 className="text-center my-3">List Users</h2>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                 
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        label={user.status ? "Active" : "Inactive"}
                        checked={user.status}
                        onClick={() => handleStatusChange(user._id)}
                      />
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListUsers;
