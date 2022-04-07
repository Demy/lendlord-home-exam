import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useEffect, useState } from 'react';
import { USER_ROLES } from '../redux/users/constants';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/users/actions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
}

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  date: new Date(Date.now()),
  role: '',
  salary: 0,
  manager: ''
};

export default function UserPopup(props) {

  const users = useSelector(state => state.users.users);
  const isLoading = useSelector(state => state.users.isLoading);
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(emptyUser._id);
  const [firstName, setFirstName] = useState(emptyUser.firstName);
  const [lastName, setLastName] = useState(emptyUser.lastName);
  const [email, setEmail] = useState(emptyUser.email);
  const [date, setDate] = useState(new Date(emptyUser.date || Date.now()));
  const [role, setRole] = useState(emptyUser.role || '');
  const [salary, setSalary] = useState(emptyUser.salary);
  const [manager, setManager] = useState(emptyUser.manager || '');
  const [managers, setManagers] = useState([]);

  const isNotComplete = !firstName || !lastName || !email || !role;

  useEffect(() => {
    if (props.open) {
      const user = props.user || emptyUser;
      setUserId(user._id);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setDate(new Date(user.date));
      setRole(user.role || '');
      setSalary(user.salary);
      setManager(user.manager || '');
    }
  }, [props.user, props.open]);

  useEffect(() => {
    const filtered = [];
    if (users) {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.role === USER_ROLES.MANAGER && user._id !== userId) {
          filtered.push(user);
        }
      }
    }
    setManagers(filtered);
  }, [users, userId]);
  
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeRole = (e) => {
    setRole(e.target.value);
  };
  const onChangeSalary = (e) => {
    setSalary(e.target.value);
  };
  const onChangeManager = (e) => {
    setManager(e.target.value);
  };

  const handleSubmit = () => {
    const newParams = {
      firstName, 
      lastName, 
      email, 
      date: date.getTime(), 
      role, 
      salary, 
      manager
    };
    if (props.user) {
      dispatch(actions.saveUser({
        ...props.user,
        ...newParams
      }));
      props.onClose();
      return;
    }
    dispatch(actions.addUser(newParams));
    props.onClose();
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      key={`edit${userId}`}
    >
      <Box sx={style}>
        <Typography sx={{ mb: 2 }} id="modal-modal-title" variant="h3" component="h2">
          {props.user ? 'Edit' : 'Add'} user
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="first name"
          autoFocus
          value={firstName}
          onChange={onChangeFirstName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="last name"
          value={lastName}
          onChange={onChangeLastName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={onChangeEmail}
        />
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date Started"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                margin="normal"
                fullWidth
                required
                {...params} 
              />
            )}
          />
        </LocalizationProvider>

        <FormControl 
          fullWidth
          margin="normal"
        >
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            label="Role"
            onChange={onChangeRole}
          >
            {Object.keys(USER_ROLES).map(roleId => (
              <MenuItem key={roleId} value={USER_ROLES[roleId]}>
                {capitalize(USER_ROLES[roleId])}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          id="salary"
          label="Salary"
          type="number"
          value={salary}
          onChange={onChangeSalary}
        />

        {role !== USER_ROLES.MANAGER ? (
          <FormControl 
            fullWidth
            margin="normal"
          >
            <InputLabel id="role-label">Manager</InputLabel>
            <Select
              labelId="manager-label"
              id="manager"
              value={manager}
              label="Manager"
              onChange={onChangeManager}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {managers && managers.length ? managers.map((user, index) => (
                <MenuItem 
                  key={`managerUser${index}`} 
                  value={user._id}
                >
                  {user.firstName} {user.lastName}
                </MenuItem>
              )) : ''}
            </Select>
          </FormControl>
        ) : <></>}

        <Button 
          sx={{ mt: 2 }}
          variant="contained"
          disabled={isLoading || isNotComplete}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}