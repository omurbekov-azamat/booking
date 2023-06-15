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
    <Paper sx={{ my: 1, border: 1, boxShadow: 1, p: 2 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          flexDirection: { xs: 'column' },
          '@media (min-width: 621px)': {
            flexDirection: 'row',
          },
        }}
        spacing={1}
      >
        <Grid item>
          <Typography display="inline-block" variant="body1" sx={{ fontSize: 18, fontWeight: 'bolder', color: 'grey' }}>
            {user.firstName} {user.lastName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography display="inline-block" variant="body1" sx={{ fontSize: 18, fontWeight: 'bolder', color: 'grey' }}>
            {user.email}
          </Typography>
        </Grid>
        <Grid item minWidth="150px">
          <FormControl fullWidth>
            <Select value={status} onChange={handleChange}>
              <MenuItem value="standard">standard</MenuItem>
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
