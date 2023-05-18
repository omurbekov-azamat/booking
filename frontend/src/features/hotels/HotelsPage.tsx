import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from 'react-router-dom';
import { Grid, MenuItem, TextField } from '@mui/material';
import { cities } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchNewPage, fetchSearchedHotels } from './hotelsThunks';
import {
  selectFetchSearchedHotelsLoading,
  selectHotels,
  selectLoadingFetchNewPage,
  selectPageOfHotels,
} from './hotelsSlice';
import HotelsCard from './components/HotelsCard';
import { LoadingButton } from '@mui/lab';
import Spinner from '../../components/UI/Spinner/Spinner';

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

  const catchParams = useParams() as { city: string; propertyType: string };
  const hotels = useAppSelector(selectHotels);

  const [state, setState] = useState({
    city: catchParams?.city !== 'false' ? (catchParams.city === 'issyk-kul' ? 'issykKul' : catchParams.city) : '',
    propertyType: catchParams && catchParams.propertyType !== 'false' ? catchParams.propertyType : '',
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

  useEffect(() => {
    dispatch(fetchSearchedHotels(state));
  }, [dispatch, state]);

  const drawer = (
    <>
      <Toolbar />
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
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city} sx={{ height: '50px' }}>
              {t(city)}
            </MenuItem>
          ))}
        </TextField>
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
              <Grid item xs={12} sm={12} md={6} lg={4} key={el._id} alignItems="stretch">
                <HotelsCard hotel={el} />
              </Grid>
            ))
          ) : (
            <Typography>There are no hotels</Typography>
          )}
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
        </Grid>
      </Box>
    </Box>
  );
};

export default HotelsPage;
