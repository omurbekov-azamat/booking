import React, { useState } from 'react';
import { User } from '../../../types';
import Paper from '@mui/material/Paper';
import { Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { changeStatus } from '../../users/usersThunks';

interface Props {
  user: User;
}

const UsersStatusChanger: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(user.status);
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const onOkButton = () => {
    if (status) {
      dispatch(changeStatus({ id: user._id, status: status }));
    }
  };
  return (
    <Paper sx={{ marginTop: '5px', paddingY: '20px' }}>
      <Grid container justifyContent="space-between">
        <Typography display="inline-block" variant="body1">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography display="inline-block" variant="body1">
          Почта : {user.email}
        </Typography>
        <FormControl fullWidth>
          <Select value={status} label="Статус" onChange={handleChange}>
            <MenuItem value="standart">standart</MenuItem>
            <MenuItem value="royal">royal</MenuItem>
            <MenuItem value="vip">vip</MenuItem>
          </Select>
          <Button onClick={onOkButton} variant="contained">
            OK
          </Button>
        </FormControl>
      </Grid>
    </Paper>
  );
};

export default UsersStatusChanger;
