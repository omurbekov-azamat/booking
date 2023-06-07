import React, { useEffect, useRef, useState } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from 'react-router-dom';
import { Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, TextField } from '@mui/material';
import { cities } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchNewPage, fetchSearchedHotels } from './hotelsThunks';
import {
  selectFetchSearchedHotelsLoading,
  selectHotels,
  selectLoadingFetchNewPage,
  selectPageOfHotels,
  selectShowMoreBtn,
} from './hotelsSlice';
import { LoadingButton } from '@mui/lab';
import Spinner from '../../components/UI/Spinner/Spinner';
import { SearchData } from '../../types';
import HotelCardLarge from './components/HotelCardLarge';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const HotelsPage: React.FC<Props> = ({ window }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const page = useAppSelector(selectPageOfHotels);
  const fetchSearchHotelsLoading = useAppSelector(selectFetchSearchedHotelsLoading);
  const fetchNewPageLoading = useAppSelector(selectLoadingFetchNewPage);
  const showMoreBtn = useAppSelector(selectShowMoreBtn);

  const catchParams = useParams() as { city: string; propertyType: string };
  const hotels = useAppSelector(selectHotels);

  const [state, setState] = useState<SearchData>({
    city: catchParams.city !== 'false' ? catchParams.city : '',
    propertyType: '',
    nonSmokingRooms: false,
    parking: false,
    swimmingPool: false,
    petFriendly: false,
    star: null,
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const facilities = [
    { id: 'nonSmokingRooms', title: t('noneSmokingRoom') },
    { id: 'parking', title: t('parking') },
    { id: 'swimmingPool', title: t('pool') },
    { id: 'petFriendly', title: t('petFriendly') },
  ];

  const [stars, setStars] = useState([
    { number: '1', title: 'star', value: false },
    { number: '2', title: 'stars', value: false },
    { number: '3', title: 'stars', value: false },
    { number: '4', title: 'stars', value: false },
    { number: '5', title: 'stars', value: false },
  ]);

  const [checkPropertyType, setCheckPropertyType] = useState([
    { value: false, id: 'guestHouse', title: t('guestHouse') },
    { value: false, id: 'Hostel', title: t('Hostel') },
    { value: false, id: 'hotel', title: t('hotel') },
    { value: false, id: 'pension', title: t('pension') },
  ]);

  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckPropertyType((prev) => {
      const updatedCheckPropertyType = prev.map((item) => {
        if (item.id === name) {
          return { ...item, value: checked };
        }
        return { ...item, value: false };
      });

      const result = updatedCheckPropertyType.find((item) => item.value);
      setState((prev) => ({ ...prev, propertyType: result ? result.id : '' }));

      return updatedCheckPropertyType;
    });
  };

  const handleChooseFacilities = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleChooseStars = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setStars((prev) => {
      return prev.map((item) => {
        if (item.number === name) {
          return { ...item, value: checked };
        }
        return { ...item, value: false };
      });
    });
    setState((prev) => ({ ...prev, star: checked ? parseFloat(name) : null }));
  };

  const timerId = useRef<NodeJS.Timeout | null>(null);
  const startDelayedSearch = (state: SearchData) => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      dispatch(fetchSearchedHotels(state));
    }, 500);
  };

  useEffect(() => {
    startDelayedSearch(state);
  }, [state]);

  useEffect(() => {
    if (catchParams.propertyType !== 'false') {
      const result = checkPropertyType.find((item) => item.id === catchParams.propertyType);
      if (result) {
        setCheckPropertyType((prev) => {
          return prev.map((item) => {
            if (item.title === result.title) {
              return { ...item, value: true };
            }
            return { ...item, value: false };
          });
        });
        setState((prev) => ({ ...prev, propertyType: catchParams.propertyType }));
      }
    }
  }, [catchParams.propertyType]);

  const drawer = (
    <>
      <Typography p={2} variant="h5">
        {t('filterBy')}
      </Typography>
      <Divider />
      <Box p={2}>
        <TextField
          id="standard-select-currency-native"
          select
          value={state.city}
          name="city"
          onChange={inputChangeHandler}
          variant="standard"
          sx={{ mt: 2 }}
          label={t('city')}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city} sx={{ height: '50px' }}>
              {t(city)}
            </MenuItem>
          ))}
        </TextField>
        <Box textAlign="center" mt={2}>
          <Typography fontWeight="bold">{t('propertyType')}</Typography>
          <FormGroup sx={{ p: 1 }}>
            {Object.entries(checkPropertyType).map(([key, value]) => (
              <FormControlLabel
                key={key}
                control={<Checkbox onChange={handleChangeCheckBox} checked={value.value} name={value.id} />}
                label={t(`${value.id}`)}
              />
            ))}
          </FormGroup>
          <Divider />
        </Box>
        <Box textAlign="center" mt={2}>
          <Typography fontWeight="bold">{t('facilities')}</Typography>
          <FormGroup sx={{ p: 1 }}>
            {facilities.map((facility) => (
              <FormControlLabel
                key={facility.id}
                control={<Checkbox onChange={handleChooseFacilities} name={facility.id} />}
                label={facility.title}
              />
            ))}
          </FormGroup>
          <Divider />
        </Box>
        <Box textAlign="center" mt={2}>
          <Typography fontWeight="bold">{t('propertyRating')}</Typography>
          <FormGroup sx={{ p: 1 }}>
            {stars.map((star) => (
              <FormControlLabel
                key={star.number}
                control={<Checkbox onChange={handleChooseStars} name={star.number} checked={star.value} />}
                label={`${star.number} ${t(`${star.title}`)}`}
              />
            ))}
          </FormGroup>
          <Divider />
        </Box>
      </Box>
    </>
  );

  const addMore = (pageNum: number) => {
    dispatch(fetchNewPage(pageNum));
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'unset' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, pl: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {fetchSearchHotelsLoading && <Spinner />}
        {fetchNewPageLoading && <Spinner />}
        <Grid container spacing={2} alignItems="stretch" sx={{ marginTop: '10px' }}>
          {hotels && hotels.length > 0 ? (
            hotels.map((el) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={el._id} alignItems="stretch">
                <HotelCardLarge hotel={el} />
              </Grid>
            ))
          ) : (
            <Typography>{t('empty')}</Typography>
          )}
          {showMoreBtn && (
            <Grid item container xs={12}>
              <LoadingButton
                loading={fetchNewPageLoading}
                style={{ margin: 'auto' }}
                variant="outlined"
                onClick={() => addMore(page)}
              >
                {t('more')}
              </LoadingButton>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default HotelsPage;
