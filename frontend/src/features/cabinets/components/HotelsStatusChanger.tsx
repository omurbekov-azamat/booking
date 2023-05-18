import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Hotel } from '../../../types';
import { changeStatusHotels, getCabinetHotels, removeHotel } from '../../hotels/hotelsThunks';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectLoadingRemoveHotel } from '../../hotels/hotelsSlice';

interface Props {
  hotel: Hotel;
  DeleteAction: boolean;
  StatusAction: boolean;
  match: string;
}

const UsersStatusChanger: React.FC<Props> = ({ hotel, DeleteAction, StatusAction, match }) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(hotel.status);
  const [open, setOpen] = useState(false);
  const loadingDeleteHotel = useAppSelector(selectLoadingRemoveHotel);
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const onOkButton = async () => {
    if (status || StatusAction) {
      await dispatch(changeStatusHotels({ id: hotel._id, status: status }));
    }
  };

  const onDeleteBtnClick = () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    setOpen(false);
    await dispatch(removeHotel(hotel._id));
    await dispatch(getCabinetHotels('nameMatch=' + match));
  };
  return (
    <>
      <Paper sx={{ marginTop: '5px', paddingY: '20px' }}>
        <Grid container justifyContent="space-between">
          <Typography display="inline-block" variant="body1">
            {hotel.name}
          </Typography>
          {StatusAction && (
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
          )}
          {DeleteAction && (
            <LoadingButton
              loading={loadingDeleteHotel ? loadingDeleteHotel === hotel._id : false}
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={onDeleteBtnClick}
            >
              Удалить
            </LoadingButton>
          )}
        </Grid>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Удалить {hotel.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Вы уверены что хотите удалить {hotel.name} ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleConfirm}>Удалить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersStatusChanger;
