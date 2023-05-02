import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAdmins } from '../users/usersThunks';
import { selectAdmins, selectGetAdminsLoading } from '../users/usersSlice';
import { Card, CardContent, Grid, List, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import { getForAdminHisOrders } from '../orders/ordersThunks';

const DirectorCabinet = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectGetAdminsLoading);
  const admins = useAppSelector(selectAdmins);
  const [openAdmins, setOpenAdmins] = React.useState(false);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const handleClickAdminName = (id: string) => {
    dispatch(getForAdminHisOrders(id));
  };

  const handleClickShowAdmins = () => {
    setOpenAdmins(!openAdmins);
  };

  return (
    <>
      {loading && <Typography>loading...</Typography>}
      <Typography variant="h5" fontWeight="bold" textAlign="center" mt={3}>
        Director Cabinet
      </Typography>
      <Card>
        <CardContent>
          <Grid container flexDirection="row" spacing={2} alignItems="self-start">
            <Grid item xs>
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="тут может быть что нибудь" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="тут может быть что нибудь" />
                </ListItemButton>
                <ListItemButton onClick={handleClickShowAdmins}>
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admins" />
                  {openAdmins ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAdmins} timeout="auto" unmountOnExit>
                  {admins.map((admin) => (
                    <List key={admin._id} component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickAdminName(admin._id)}>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={admin.firstName + ' ' + admin.lastName} />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              </List>
            </Grid>
            <Grid item xs>
              тут может быть что нибудь
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default DirectorCabinet;
