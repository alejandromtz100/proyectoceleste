import React, { useState, useEffect } from 'react';
import { 
  Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, IconButton, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, Button 
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';
import GateIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/navbar';

const Crud: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fineRecords, setFineRecords] = useState<any[]>([]);
  const [userRecords, setUserRecords] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    name: '',
    phoneNumber: '',
    department: '',
    tower: '',
    role: '',
    password: ''
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phoneNumber: '',
    department: '',
    tower: '',
    role: '',
    password: '' // Si se deja vacío, no se actualiza la contraseña
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
      const response = await fetch('https://apireact-1-88m9.onrender.com/api/montos/mostrar');
      const data = await response.json();
      setFineRecords(data);
    } catch (error) {
      console.error('Error fetching fine records:', error);
    }
  };

  // Se asume que existe un endpoint GET /api/users que retorna todos los usuarios
  const fetchUserRecords = async () => {
    try {
      const response = await fetch('/api/users');
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
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PaymentIcon color="primary" /> Registros de Pagos
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2 }}>
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
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" /> Registros de Multas
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2 }}>
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
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <GateIcon color="secondary" /> Permisos de Portones
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2 }}>
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
        Registro y Edición de Usuarios
      </Typography>

      {/* Formulario de registro */}
      <Box component="form" onSubmit={handleUserRegistration} sx={{ marginBottom: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Nombre"
            name="name"
            value={newUser.name}
            onChange={handleNewUserChange}
            required
          />
          <TextField
            label="Teléfono"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleNewUserChange}
            required
          />
          <TextField
            label="Departamento"
            name="department"
            value={newUser.department}
            onChange={handleNewUserChange}
          />
          <TextField
            label="Torre"
            name="tower"
            value={newUser.tower}
            onChange={handleNewUserChange}
          />
          <TextField
            label="Rol"
            name="role"
            value={newUser.role}
            onChange={handleNewUserChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleNewUserChange}
            required
          />
          <Button type="submit" variant="contained" startIcon={<AddIcon />}>
            Registrar
          </Button>
        </Box>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
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
    </Box>
  );

  // Manejo de cambios en el formulario de registro
  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Envío del formulario para registrar un nuevo usuario
  const handleUserRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (response.ok) {
        // Registro exitoso: se limpia el formulario y se refresca la lista
        setNewUser({
          name: '',
          phoneNumber: '',
          department: '',
          tower: '',
          role: '',
          password: ''
        });
        fetchUserRecords();
      } else {
        console.error('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  // Al hacer clic en editar se abre el diálogo con los datos del usuario
  const handleEditClick = (user: any) => {
    setCurrentUser(user);
    setEditForm({
      name: user.name,
      phoneNumber: user.phoneNumber,
      department: user.department,
      tower: user.tower,
      role: user.role,
      password: ''
    });
    setOpenEditDialog(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Envío del formulario de edición
  const handleEditUserSubmit = async () => {
    try {
      const response = await fetch(`/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
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

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center" 
          sx={{ fontWeight: 'bold', marginBottom: 4 }}
        >
          Gestión de Registros
        </Typography>
        <Tabs 
          value={activeTab} 
          onChange={handleChange} 
          indicatorColor="primary" 
          textColor="primary" 
          centered
          sx={{ marginBottom: 4 }}
        >
          <Tab label="Registros de Pagos" />
          <Tab label="Registros de Multas" />
          <Tab label="Permisos de Portones" />
          <Tab label="Usuarios" />
        </Tabs>
        <Box sx={{ marginTop: 4 }}>{renderTabContent()}</Box>
      </Box>
    </>
  );
};

export default Crud;
