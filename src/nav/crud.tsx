import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';
import GateIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../components/navbar';

const Crud: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fineRecords, setFineRecords] = useState<any[]>([]);
  const [userRecords, setUserRecords] = useState<any[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phoneNumber: '',
    department: '',
    tower: '',
    role: '',
    password: '', // campo opcional para actualizar la contraseña
  });

  // Estados para el registro de nuevos usuarios
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phoneNumber: '',
    department: '',
    tower: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    if (activeTab === 1) {
      fetchFineRecords();
    }
    if (activeTab === 3) {
      fetchUserRecords();
    }
  }, [activeTab]);

  const fetchFineRecords = async () => {
    try {
      const response = await fetch(
        'https://apireact-1-88m9.onrender.com/api/montos/mostrar'
      );
      const data = await response.json();
      setFineRecords(data);
    } catch (error) {
      console.error('Error fetching fine records:', error);
    }
  };

  // Se asume que existe un endpoint GET /api/users que retorna la lista de usuarios
  const fetchUserRecords = async () => {
    try {
      const response = await fetch('https://apireact-1-88m9.onrender.com/api/users');
      const data = await response.json();
      setUserRecords(data);
    } catch (error) {
      console.error('Error fetching user records:', error);
    }
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderPaymentRecords();
      case 1:
        return renderFineRecords();
      case 2:
        return renderGatePermissions();
      case 3:
        return renderUserRecords();
      default:
        return null;
    }
  };

  const renderPaymentRecords = () => (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <PaymentIcon color="primary" /> Registros de Pagos
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2025-01-20</TableCell>
              <TableCell>$100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderFineRecords = () => (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <WarningIcon color="warning" /> Registros de Multas
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#fef4e7' }}>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Torre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fineRecords.map((record: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>${record.amount}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell>{record.tower}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderGatePermissions = () => (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <GateIcon color="secondary" /> Permisos de Portones
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#e8f5e9' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Permiso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Juan Pérez</TableCell>
              <TableCell>Acceso Completo</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderUserRecords = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Usuarios
      </Typography>

      {/* Botón para registrar un nuevo usuario */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenRegisterDialog(true)}
        >
          Nuevo Usuario
        </Button>
      </Box>

      {/* Tabla de usuarios */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Torre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRecords.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.tower}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(user)}>
                    <EditIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para editar usuario */}
      <Dialog open={openEditDialog} onClose={handleDialogClose}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Nombre"
              name="name"
              value={editForm.name}
              onChange={handleEditFormChange}
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="phoneNumber"
              value={editForm.phoneNumber}
              onChange={handleEditFormChange}
              fullWidth
            />
            <TextField
              label="Departamento"
              name="department"
              value={editForm.department}
              onChange={handleEditFormChange}
              fullWidth
            />
            <TextField
              label="Torre"
              name="tower"
              value={editForm.tower}
              onChange={handleEditFormChange}
              fullWidth
            />
            <TextField
              label="Rol"
              name="role"
              value={editForm.role}
              onChange={handleEditFormChange}
              fullWidth
            />
            <TextField
              label="Nueva Contraseña (opcional)"
              name="password"
              type="password"
              value={editForm.password}
              onChange={handleEditFormChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleEditUserSubmit} variant="contained">
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para registrar un nuevo usuario */}
      <Dialog open={openRegisterDialog} onClose={handleRegisterDialogClose}>
        <DialogTitle>Registrar Nuevo Usuario</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Nombre"
              name="name"
              value={registerForm.name}
              onChange={handleRegisterFormChange}
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="phoneNumber"
              value={registerForm.phoneNumber}
              onChange={handleRegisterFormChange}
              fullWidth
            />
            <TextField
              label="Departamento"
              name="department"
              value={registerForm.department}
              onChange={handleRegisterFormChange}
              fullWidth
            />
            <TextField
              label="Torre"
              name="tower"
              value={registerForm.tower}
              onChange={handleRegisterFormChange}
              fullWidth
            />
            <TextField
              label="Rol"
              name="role"
              value={registerForm.role}
              onChange={handleRegisterFormChange}
              fullWidth
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={registerForm.password}
              onChange={handleRegisterFormChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterDialogClose}>Cancelar</Button>
          <Button onClick={handleRegisterSubmit} variant="contained">
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  // Funciones para el diálogo de edición
  const handleEditClick = (user: any) => {
    setCurrentUser(user);
    setEditForm({
      name: user.name,
      phoneNumber: user.phoneNumber,
      department: user.department,
      tower: user.tower,
      role: user.role,
      password: '',
    });
    setOpenEditDialog(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditUserSubmit = async () => {
    try {
      const response = await fetch(`https://apireact-1-88m9.onrender.com/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (response.ok) {
        fetchUserRecords();
        setOpenEditDialog(false);
        setCurrentUser(null);
      } else {
        console.error('Error al actualizar usuario');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setCurrentUser(null);
  };

  // Funciones para el diálogo de registro
  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async () => {
    try {
      const response = await fetch('https://apireact-1-88m9.onrender.com//api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });
      if (response.ok) {
        fetchUserRecords();
        setOpenRegisterDialog(false);
        // Reiniciamos el formulario
        setRegisterForm({
          name: '',
          phoneNumber: '',
          department: '',
          tower: '',
          role: '',
          password: '',
        });
      } else {
        console.error('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const handleRegisterDialogClose = () => {
    setOpenRegisterDialog(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Gestión de Registros
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="Registros de Pagos" />
          <Tab label="Registros de Multas" />
          <Tab label="Permisos de Portones" />
          <Tab label="Usuarios" />
        </Tabs>
        <Box sx={{ mt: 4 }}>{renderTabContent()}</Box>
      </Box>
    </>
  );
};

export default Crud;
