import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Paper from '@mui/material/Paper';
import { CircularProgress, Divider, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getCabinetHotels } from '../../hotels/hotelsThunks';
import { selectCabinetHotels, selectCabinetLoading } from '../../hotels/hotelsSlice';
import HotelsStatusChanger from './HotelsStatusChanger';

interface props {
  DeleteAction: boolean;
  StatusAction: boolean;
}

const HotelsStatus: React.FC<props> = ({ DeleteAction, StatusAction }) => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(selectCabinetHotels);
  const hotelsLoading = useAppSelector(selectCabinetLoading);

  useEffect(() => {
    if (name.length > 1) {
      dispatch(getCabinetHotels('nameMatch=' + name));
    }
  }, [name, dispatch]);

  const inputChangeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginTop: '15px' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Поиск по названию"
          onChange={inputChangeNameHandler}
          value={name}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <SearchIcon />
      </Paper>
      {hotelsLoading ? (
        <CircularProgress />
      ) : hotels.length < 1 ? (
        'нету отелей'
      ) : (
        hotels.map((el) => (
          <HotelsStatusChanger
            match={name}
            DeleteAction={DeleteAction}
            StatusAction={StatusAction}
            hotel={el}
            key={el._id}
          />
        ))
      )}
    </div>
  );
};

export default HotelsStatus;
