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
    <Paper sx={{ my: 1, paddingY: '20px', border: 1, boxShadow: 1, p: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography display="inline-block" variant="body1">
            {user.firstName} {user.lastName}
          </Typography>
        </Grid>

        <Grid item>
          <Typography display="inline-block" variant="body1">
            Почта : {user.email}
          </Typography>
        </Grid>
        <Grid item minWidth="150px">
          <FormControl fullWidth>
            <Select value={status} onChange={handleChange}>
              <MenuItem value="standard">standart</MenuItem>
              <MenuItem value="royal">royal</MenuItem>
              <MenuItem value="vip">vip</MenuItem>
            </Select>
            <Button onClick={onOkButton} variant="contained" sx={{ mt: 1 }}>
              OK
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UsersStatusChanger;
