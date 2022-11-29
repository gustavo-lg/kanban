import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import sideMenuBtns from './sideMenu.json';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AdjustIcon from '@mui/icons-material/Adjust';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import styles from './SideMenu.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import {
  List,
  IconButton,
  Divider,
  Avatar,
  Icon, ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem
} from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideMenu() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return <>
    <Drawer className={styles.body} variant="permanent" open={open}>
      <DrawerHeader className={styles.header}>
        <Avatar
          className={styles.logo}
          alt="Logo"
        >
          <Image
            width={40}
            height={40}
            src={"/assets/logo.svg"}
            alt='logo'
          />
        </Avatar>
        <IconButton
          className={styles.btn}
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            ...(open && { display: 'none' }),
          }}
        >

          <MenuIcon />
        </IconButton>
        <IconButton
          className={styles.btn}
          onClick={handleDrawerClose}
          sx={{
            ...(open === false && { display: 'none' }),
          }}
        >
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />
      <List>
        {sideMenuBtns.map((sideMenuBtn, index) => (
          <ListItem key={sideMenuBtn.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {sideMenuBtn.icon === 'ViewQuiltRoundedIcon' ? <Icon component={ViewQuiltRoundedIcon} /> : []}
                {sideMenuBtn.icon === 'NotificationsOutlinedIcon' ? <Icon component={NotificationsOutlinedIcon} /> : []}
                {sideMenuBtn.icon === 'DateRangeIcon' ? <Icon component={DateRangeIcon} /> : []}
                {sideMenuBtn.icon === 'AdjustIcon' ? <Icon component={AdjustIcon} /> : []}
                {sideMenuBtn.icon === 'AssessmentOutlinedIcon' ? <Icon component={AssessmentOutlinedIcon} /> : []}
                {sideMenuBtn.icon === 'LibraryAddIcon' ? <Icon component={LibraryAddIcon} /> : []}
                {sideMenuBtn.icon === 'SettingsIcon' ? <Icon component={SettingsIcon} /> : []}
              </ListItemIcon>
              <ListItemText primary={sideMenuBtn.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  </>
}