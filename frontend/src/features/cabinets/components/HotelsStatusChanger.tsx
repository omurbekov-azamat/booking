import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { Hotel } from '../../../types';
import { changeStatusHotels } from '../../hotels/hotelsThunks';

interface Props {
  hotel: Hotel;
}

const UsersStatusChanger: React.FC<Props> = ({ hotel }) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(hotel.status);
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const onOkButton = async () => {
    if (status) {
      await dispatch(changeStatusHotels({ id: hotel._id, status: status }));
    }
  };
  return (
    <Paper sx={{ marginTop: '5px', paddingY: '20px' }}>
      <Grid container justifyContent="space-between">
        <Typography display="inline-block" variant="body1">
          {hotel.name}
        </Typography>
        <FormControl>
          <Select value={status} label="Статус" onChange={handleChange}>
            <MenuItem value="standart">standart</MenuItem>
            <MenuItem value="premium">premium</MenuItem>
            <MenuItem value="business">business</MenuItem>
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
