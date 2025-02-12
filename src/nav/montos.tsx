import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  Grid,
} from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import Navbar from '../components/navbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import '../css/Montos.css';

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
  const [showModal, setShowModal] = useState(false);

  // Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUserData = async (userName: string) => {
    if (userName.trim() !== "") {
      try {
        const response = await fetch(`http://localhost:4000/api/users/search?name=${userName}`);
        if (!response.ok) {
          throw new Error('Error al obtener el usuario');
        }
        const foundUser = await response.json();
        setFormData((prev) => ({
          ...prev,
          department: foundUser.department,
          tower: foundUser.tower,
        }));
      } catch (error) {
        console.error('Error al buscar el usuario por nombre', error);
      }
    }
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    if (formData.name.trim() !== "") {
      const timeout = setTimeout(() => {
        fetchUserData(formData.name);
      }, 500);
      setTypingTimeout(timeout);
    } else {
      setFormData((prev) => ({ ...prev, department: '', tower: '' }));
    }
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [formData.name]);

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
        throw new Error('Error al registrar la multa.');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      setTimeout(() => {
        setShowModal(true);
        setFormData({
          name: '',
          description: '',
          amount: '',
          date: '',
          department: '',
          tower: '',
        });
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error('Ocurrió un error al enviar el formulario.', error);
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            maxWidth: '800px',
            width: '100%',
            padding: 4,
            borderRadius: '16px',
            position: 'relative',
            background: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              marginBottom: 3,
              color: '#37474f',
            }}
          >
            Registro de Multa
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              opacity: isSubmitting ? 0.5 : 1,
              pointerEvents: isSubmitting ? 'none' : 'auto',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monto"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Departamento"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Torre"
                  name="tower"
                  value={formData.tower}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    padding: 1.5,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '16px',
                    boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
                  }}
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
          {isSubmitting && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
              }}
            >
              <CircularProgress size={50} />
            </Box>
          )}
        </Paper>
      </Box>
      <CSSTransition in={showModal} timeout={300} classNames="modal" unmountOnExit>
        <Dialog
          open={showModal}
          onClose={handleCloseModal}
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, #d0e8f2, #a8c0d8)',
              borderRadius: '16px',
              padding: 4,
              textAlign: 'center',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.15)',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#2e3b55', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#2e3b55' }}>
              Multa Registrada
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#2e3b55' }}>
              La multa se registró con éxito.
            </Typography>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                backgroundColor: '#2e3b55',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '8px',
                px: 4,
                '&:hover': { backgroundColor: '#1c313a' },
              }}
            >
              Cerrar
            </Button>
          </Box>
        </Dialog>
      </CSSTransition>
    </>
  );
};

export default Montos;
