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
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';
import GateIcon from '@mui/icons-material/LockOpen';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/navbar';

// Definición de la interfaz para el usuario
interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  department: string;
  tower: string;
  role: 'admin' | 'user';
}

const Crud: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fineRecords, setFineRecords] = useState<any[]>([]);

  // Estados para la gestión de usuarios (nuevo tab)
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    department: '',
    tower: '',
    password: '',
    role: 'user',
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Se ejecuta al cambiar de pestaña: si se activa el de multas o usuarios, se consulta la API
  useEffect(() => {
    if (activeTab === 1) {
      fetchFineRecords();
    } else if (activeTab === 3) {
      fetchUsers();
    }
  }, [activeTab]);

  // ----------------------------
  // Funciones para "Registros de Multas"
  // ----------------------------
  const fetchFineRecords = async () => {
    try {
      const response = await fetch('https://apireact-1-88m9.onrender.com/api/montos/mostrar');
      const data = await response.json();
      setFineRecords(data);
    } catch (error) {
      console.error('Error fetching fine records:', error);
    }
  };

  // ----------------------------
  // Funciones para "Gestión de Usuarios"
  // ----------------------------
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://apireact-1-88m9.onrender.com/api/users');
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('https://apireact-1-88m9.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al agregar el usuario');
      }
      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]);
      setFormData({ name: '', phoneNumber: '', department: '', tower: '', password: '', role: 'user' });
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  const startEditing = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      phoneNumber: user.phoneNumber,
      department: user.department,
      tower: user.tower,
      password: '',
      role: user.role,
    });
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setFormData({ name: '', phoneNumber: '', department: '', tower: '', password: '', role: 'user' });
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      const response = await fetch(`https://apireact-1-88m9.onrender.com/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      const updatedUser = await response.json();
      setUsers(prev => prev.map(user => (user._id === updatedUser._id ? updatedUser : user)));
      cancelEditing();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch(`https://apireact-1-88m9.onrender.com/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // ----------------------------
  // Manejo de Tabs y renderizado de contenido
  // ----------------------------
  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
            {fineRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>${record.amount}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.department}</TableCell>
                <TableCell>{record.tower}</TableCell>
              </TableRow>
            ))}
            {fineRecords.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No hay registros de multas</TableCell>
              </TableRow>
            )}
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

  const renderUserManagement = () => (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PeopleIcon color="action" /> Gestión de Usuarios
      </Typography>
      {/* Formulario para agregar o editar un usuario */}
      <Box sx={{ marginTop: 3, p: 3, backgroundColor: '#fff', boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          {editingUser ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleUserChange}
            fullWidth
          />
          <TextField
            label="Número de Teléfono"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleUserChange}
            fullWidth
          />
          <TextField
            label="Departamento"
            name="department"
            value={formData.department}
            onChange={handleUserChange}
            fullWidth
          />
          <TextField
            label="Torre"
            name="tower"
            value={formData.tower}
            onChange={handleUserChange}
            fullWidth
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleUserChange}
            fullWidth
            helperText={editingUser ? 'Deja en blanco para mantener la contraseña actual' : ''}
          />
          <FormControl fullWidth>
            <InputLabel id="role-label">Rol</InputLabel>
            <Select
              labelId="role-label"
              label="Rol"
              name="role"
              value={formData.role}
              onChange={handleUserChange}
            >
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {editingUser ? (
              <>
                <Button variant="contained" color="primary" onClick={handleUpdateUser}>
                  Actualizar Usuario
                </Button>
                <Button variant="outlined" color="secondary" onClick={cancelEditing}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={handleAddUser}>
                Registrar Usuario
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
      {/* Tabla de usuarios */}
      <TableContainer component={Paper} sx={{ marginTop: 4, boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Torre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.tower}</TableCell>
                <TableCell>{user.role === 'admin' ? 'Administrador' : 'Usuario'}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => startEditing(user)}>
                    <EditIcon color="primary" />
                  </Button>
                  <Button onClick={() => handleDeleteUser(user._id)}>
                    <DeleteIcon color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderPaymentRecords();
      case 1:
        return renderFineRecords();
      case 2:
        return renderGatePermissions();
      case 3:
        return renderUserManagement();
      default:
        return null;
    }
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
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ marginBottom: 4 }}
        >
          <Tab label="Registros de Pagos" />
          <Tab label="Registros de Multas" />
          <Tab label="Permisos de Portones" />
          <Tab label="Gestión de Usuarios" />
        </Tabs>
        <Box sx={{ marginTop: 4 }}>{renderTabContent()}</Box>
      </Box>
    </>
  );
};

export default Crud;
