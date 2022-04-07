import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../redux/users/actions';
import UserPopup from './UserPopup';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const salaryFormatter = new Intl.NumberFormat();

export default function UsersTableView() {

  const [parsedUsers, setParsedUsers] = useState([]);
  const [isPopupOn, setPopupOn] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const users = useSelector(state => state.users.users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (users === null) {
      dispatch(actions.getUsers());
    } else {
      const parsed = users.map(user => {
        let manager = '';
        if (user.manager) {
          const managerUser = users.find(u => u._id === user.manager);
          if (managerUser) {
            manager = `${managerUser.firstName} ${managerUser.lastName}`;
          }
        }
        return {
          ...user,
          date: new Date(user.date).toLocaleDateString(),
          salary: salaryFormatter.format(user.salary),
          manager
        };
      });
      setParsedUsers(parsed);
    }
  }, [users]);

  const showPopup = () => {
    setUserToEdit(null);
    setPopupOn(true);
  };

  const handleEditUser = (index) => {
    if (users) {
      setUserToEdit(users[index]);
      setPopupOn(true);
    }
  };

  const handleDeleteUser = (index) => {
    dispatch(actions.deleteUser(users[index]._id));
  }

  const closePopup = () => {
    setUserToEdit(null);
    setPopupOn(false);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: grey[100],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
        
      <Button 
        sx={{ m: 2, mb: 0 }} 
        variant="outlined" 
        startIcon={<AddBoxIcon />}
        onClick={showPopup}
      >
        Add
      </Button>
      <UserPopup 
        open={isPopupOn} 
        user={userToEdit} 
        onClose={closePopup} 
      />

      <Paper sx={{ m: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
        {users && users.length ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date Started</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parsedUsers.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>£{row.salary}</TableCell>
                  <TableCell>{row.manager}</TableCell>
                  <TableCell>
                    <Button onClick={handleEditUser.bind(null, index)}><EditIcon /></Button>
                    <Button onClick={handleDeleteUser.bind(null, index)}><DeleteIcon /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (users ? (
            <Typography>No users found</Typography>
          ) : (
            <Typography>Loading...</Typography>
          )
        )}
      </Paper>
    </Box>
  );
}