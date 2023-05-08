import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Menu,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ReservationMutation } from '../../../types';

const ReservationForm = () => {
  const { t } = useTranslation();
  const { apartmentId } = useParams() as { apartmentId: string };

  const [reservation, setReservation] = useState<ReservationMutation>({
    apartmentId: apartmentId,
    dateArrival: null,
    dateDeparture: null,
    comment: '',
    personalTranslator: false,
    meetingAirport: false,
    tourManagement: false,
    eventManagement: false,
  });

  const [required, setRequired] = useState<boolean>(false);

  const additionalServices = [
    { selected: reservation.personalTranslator, id: 'personalTranslator', title: t('personalTranslator') },
    { selected: reservation.meetingAirport, id: 'meetingAirport', title: t('meetingAirport') },
    { selected: reservation.tourManagement, id: 'tourManagement', title: t('tourOrganization') },
    { selected: reservation.eventManagement, id: 'eventManagement', title: t('eventOrganization') },
  ];

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setReservation((prev) => ({ ...prev, [name]: checked }));
  };

  const handleArrivalDate = (date: Date | null) => {
    setReservation((prev) => ({ ...prev, dateArrival: date }));
  };

  const handleDepartureDate = (date: Date | null) => {
    setReservation((prev) => ({ ...prev, dateDeparture: date }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reservation.dateArrival && reservation.dateDeparture) {
      setRequired(false);
      const reservationData = {
        ...reservation,
        dateArrival: reservation.dateArrival?.toDateString(),
        dateDeparture: reservation.dateDeparture?.toDateString(),
      };
      console.log(reservationData);
      setReservation({
        apartmentId: apartmentId,
        dateArrival: null,
        dateDeparture: null,
        comment: '',
        personalTranslator: false,
        meetingAirport: false,
        tourManagement: false,
        eventManagement: false,
      });
    } else {
      setRequired(true);
    }
  };

  return (
    <Box component="form" onSubmit={submitFormHandler} mt={3}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container textAlign="center" spacing={3}>
          <Grid item xs={12} sm={6} lg={6}>
            <DatePicker label={t('dateArrival')} value={reservation.dateArrival} onChange={handleArrivalDate} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <DatePicker label={t('dateDeparture')} value={reservation.dateDeparture} onChange={handleDepartureDate} />
          </Grid>
          {required && (
            <Grid item xs={12}>
              <Alert severity="error">{t('selectDates')}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              onClick={handleClick}
              sx={{
                color: 'grey',
                height: '56px',
                border: '1px solid lightblue',
                textTransform: 'capitalize',
                fontSize: '18px',
                width: '100%',
              }}
            >
              {t('additionalServices')}
            </Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <FormGroup sx={{ p: 1 }}>
                {additionalServices.map((facility) => (
                  <FormControlLabel
                    key={facility.id}
                    control={<Checkbox onChange={handleChangeCheckBox} name={facility.id} />}
                    label={facility.title}
                  />
                ))}
              </FormGroup>
            </Menu>
          </Grid>
          <Grid item container alignItems="center" flexDirection="column">
            {additionalServices.map(
              (service) =>
                service.selected && (
                  <Grid item key={service.title}>
                    {service.title}
                  </Grid>
                ),
            )}
            {additionalServices.some((service) => service.selected) && (
              <Grid item>
                <Typography variant="subtitle2" color="grey">
                  {t('forAdditionalServices')}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={inputChangeHandler}
              value={reservation.comment}
              multiline
              rows={4}
              label={t('writeComment')}
              name="comment"
              autoComplete="new-comment"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="success" type="submit">
              {t('send')}
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
};

export default ReservationForm;
