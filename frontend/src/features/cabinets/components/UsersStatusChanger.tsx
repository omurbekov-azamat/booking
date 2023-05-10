import React, { useState } from 'react';
import { User } from '../../../types';
import Paper from '@mui/material/Paper';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

interface Props {
  user: User;
}

const UsersStatusChanger: React.FC<Props> = ({ user }) => {
  const [status, setStatus] = useState(user.status);
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
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
        </FormControl>
      </Grid>
    </Paper>
  );
};

export default UsersStatusChanger;
