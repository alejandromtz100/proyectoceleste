import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import WarningIcon from '@mui/icons-material/Warning';
import GateIcon from '@mui/icons-material/LockOpen';
import Navbar from '../components/navbar';

const Crud: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fineRecords, setFineRecords] = useState([]);

  useEffect(() => {
    if (activeTab === 1) {
      fetchFineRecords();
    }
  }, [activeTab]);

  const fetchFineRecords = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/montos/mostrar');
      const data = await response.json();
      setFineRecords(data);
    } catch (error) {
      console.error('Error fetching fine records:', error);
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
          <Tab label="Registros de Pagos" />
          <Tab label="Registros de Multas" />
          <Tab label="Permisos de Portones" />
        </Tabs>
        <Box sx={{ marginTop: 4 }}>{renderTabContent()}</Box>
      </Box>
    </>
  );
};

export default Crud;
