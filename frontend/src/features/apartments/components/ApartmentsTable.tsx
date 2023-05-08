import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';
import { Hotel } from '../../../types';
import { useTranslation } from 'react-i18next';
import { selectApartments } from '../apartmentSlice';
import { fetchApartments } from '../apartmentThunks';

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
  const apartments = useAppSelector(selectApartments);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchApartments(hotel._id));
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
                <Link to={'/' + hotel.name + '/' + hotel._id + '/apartment/' + data._id}>{data.roomTypeId.name}</Link>
              </TableCell>
              <TableCell align="right">{data.price.from + ' - ' + data.price.till}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApartmentsTable;
