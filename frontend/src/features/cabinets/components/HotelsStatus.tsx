import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Paper from '@mui/material/Paper';
import { CircularProgress, Divider, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getCabinetHotels } from '../../hotels/hotelsThunks';
import { selectCabinetHotels, selectCabinetLoading } from '../../hotels/hotelsSlice';
import HotelsStatusChanger from './HotelsStatusChanger';
import { useTranslation } from 'react-i18next';

interface props {
  DeleteAction: boolean;
  StatusAction: boolean;
}

const HotelsStatus: React.FC<props> = ({ DeleteAction, StatusAction }) => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(selectCabinetHotels);
  const hotelsLoading = useAppSelector(selectCabinetLoading);
  const { t } = useTranslation();

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
      <Typography variant={'h6'} fontWeight={'bolder'}>
        {t('hotelStatusInfo')}
      </Typography>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginTop: '15px' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t('nameSearch') as string}
          onChange={inputChangeNameHandler}
          value={name}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <SearchIcon />
      </Paper>
      {hotelsLoading ? (
        <CircularProgress />
      ) : !hotels.length ? (
        <Typography sx={{ my: 2, color: 'grey' }}>{t('hotelsNotFound')}</Typography>
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
