import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://e3956997-0da3-4ff4-ba83-e3fcf2ec7467-00-1kreqcgohket.pike.replit.dev/bookings';

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', phone_number: '', email: '' });
  const [editId, setEditId] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(API_URL);
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ title: '', description: '', date: '', time: '', phone_number: '', email: '' });
      setEditId(null);
      fetchBookings();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (booking) => {
    setForm(booking);
    setEditId(booking.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const backgroundImageUrl = 'workshop.jpg'; // Replace with your image URL

  return (
    <Container fluid style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '2rem',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Row className="justify-content-center" style={{ width: '100%' }}>
        <Col xs={12} md={8} lg={6}>
          <Card style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '2rem',
            borderRadius: '1rem',
            marginBottom: '2rem'
          }}>
            <Card.Title className="text-center" style={{ color: 'yellow' }}>Car Workshop Booking System</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{ color: 'yellow' }}>Customer Name</Form.Label>
                <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required className="bg-light" />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: 'yellow' }}>Description</Form.Label>
                <Form.Control type="text" name="description" value={form.description} onChange={handleChange} className="bg-light" />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: 'yellow' }}>Date</Form.Label>
                <Form.Control type="text" name="date" value={form.date} onChange={handleChange} required className="bg-light" />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: 'yellow' }}>Time</Form.Label>
                <Form.Control type="text" name="time" value={form.time} onChange={handleChange} required className="bg-light" />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: 'yellow' }}>Phone Number</Form.Label>
                <Form.Control type="text" name="phone_number" value={form.phone_number} onChange={handleChange} required className="bg-light" />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: 'yellow' }}>Email</Form.Label>
                <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required className="bg-light" />
              </Form.Group>
              <Button type="submit" className="btn btn-warning">{editId ? 'Update' : 'Create'} Booking</Button>
            </Form>
          </Card>
          <Table striped bordered hover className="mt-4" style={{ zIndex: 1 }}>
            <thead>
              <tr className="table-warning">
                <th>ID</th>
                <th>Customer Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.title}</td>
                    <td>{booking.description}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.phone_number}</td>
                    <td>{booking.email}</td>
                    <td>
                      <Button variant="info" onClick={() => handleEdit(booking)}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDelete(booking.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No bookings available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
