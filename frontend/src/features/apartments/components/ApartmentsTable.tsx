import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton, styled } from '@mui/material';
import { Hotel } from '../../../types';
import { useTranslation } from 'react-i18next';
import { selectApartments } from '../apartmentSlice';
import { fetchApartments } from '../apartmentThunks';
import EditIcon from '@mui/icons-material/Edit';
import { selectUser } from '../../users/usersSlice';
import { selectCurrency } from '../../currency/currencySlice';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'green',
  },
});

interface Props {
  hotel: Hotel;
}

const ApartmentsTable: React.FC<Props> = ({ hotel }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currency = useAppSelector(selectCurrency);
  const { t, i18n } = useTranslation();
  const user = useAppSelector(selectUser);
  const apartments = useAppSelector(selectApartments);

  useEffect(() => {
    dispatch(fetchApartments({ hotelId: hotel._id }));
  }, [dispatch, hotel._id]);

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table aria-label="simple table">
        <TableHead sx={{ background: 'lightgreen' }}>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {t('roomType')}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              {t('price')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apartments.map((data) => (
            <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                <Link to={'/' + hotel.name + '/' + hotel._id + '/apartment/' + data._id}>
                  {' '}
                  {i18n.language === 'en' ? data.roomTypeId.name.en : data.roomTypeId.name.ru}
                </Link>
                {(user?.role === 'admin' || user?._id === hotel.userId) && (
                  <IconButton
                    sx={{ color: 'grey', '&:hover': { color: 'blue' }, ml: 2 }}
                    onClick={() => navigate('/my-cabinet/edit-apartment/' + data._id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="right">
                {currency === 'kgs' ? data.price.kgs + ' KGS' : data.price.usd + ' USD'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApartmentsTable;
