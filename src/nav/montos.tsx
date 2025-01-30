import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import Navbar from '../components/navbar';

const Montos: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    date: '',
    department: '',
    tower: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:4000/api/montos/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el monto.');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Monto registrado correctamente.',
        confirmButtonColor: '#3085d6',
      });

      setFormData({
        name: '',
        description: '',
        amount: '',
        date: '',
        department: '',
        tower: '',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al enviar el formulario.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ maxWidth: '600px', width: '100%', padding: 4, borderRadius: '12px' }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: 4, color: '#333' }}>
            Registro de Montos
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Monto"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Fecha"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Departamento"
              name="department"
              value={formData.department}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Torre"
              name="tower"
              value={formData.tower}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ padding: 1.5, borderRadius: '8px', textTransform: 'none', fontSize: '16px' }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Registrar'}
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Montos;