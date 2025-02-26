import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../components/navbar';

const Crud: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fineRecords, setFineRecords] = useState([]);
  const [userRecords, setUserRecords] = useState<any[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phoneNumber: '',
    department: '',
    tower: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    if (activeTab === 0) {
      fetchFineRecords();
    } else if (activeTab === 1) {
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

  const fetchUserRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://apireact-1-88m9.onrender.com/api/users/all', {
        headers: {
          'Authorization': token || '',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error fetching user records');
      }
      const data = await response.json();
      setUserRecords(data);
    } catch (error) {
      console.error('Error fetching user records:', error);
    }
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEditOpen = (user: any) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || '',
      phoneNumber: user.phoneNumber || '',
      department: user.department || '',
      tower: user.tower || '',
      password: user.password || '',
      role: user.role || ''
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedUser(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://apireact-1-88m9.onrender.com/api/users/update/${selectedUser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify(editForm)
      });
      if (!response.ok) {
        throw new Error('Error updating user');
      }
      // Actualizamos la lista de usuarios y cerramos el modal
      fetchUserRecords();
      handleEditClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderFineRecords();
      case 1:
        return renderUserRecordsTable();
      default:
        return null;
    }
  };

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

  const renderUserRecordsTable = () => (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon color="primary" /> Registro de Usuarios
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Torre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRecords.map((user: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.tower}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditOpen(user)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para edición de usuario */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
            <TextField
              label="Nombre"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="phoneNumber"
              value={editForm.phoneNumber}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Departamento"
              name="department"
              value={editForm.department}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Torre"
              name="tower"
              value={editForm.tower}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={editForm.password}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Rol"
              name="role"
              value={editForm.role}
              onChange={handleEditChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
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
          <Tab label="Registros de Multas" />
          <Tab label="Registro de Usuarios" />
        </Tabs>
        <Box sx={{ marginTop: 4 }}>{renderTabContent()}</Box>
      </Box>
    </>
  );
};

export default Crud;