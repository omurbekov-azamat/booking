import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { IconButton, styled } from '@mui/material';
import { Hotel } from '../../../types';
import { useTranslation } from 'react-i18next';
import { selectApartments } from '../apartmentSlice';
import { fetchApartments } from '../apartmentThunks';
import EditIcon from '@mui/icons-material/Edit';

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
  const navigate = useNavigate();
  const { id } = useParams();

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
                <Link to={'/' + hotel.name + '/' + hotel._id + '/apartment/' + data._id}>{data.roomTypeId.name}</Link>
                <IconButton
                  sx={{ color: 'grey', '&:hover': { color: 'blue' }, ml: 2 }}
                  onClick={() => navigate('/hotels/' + id + '/editApartment/' + data._id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">{data.price.usd + ' - ' + data.price.kgs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApartmentsTable;
