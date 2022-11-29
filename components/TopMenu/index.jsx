import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import styles from './TopMenu.module.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import IconButton from '@mui/material/IconButton';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1)
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%'

    },
}));

function getFullscreenElement() {
    return document.fullscreenElement   //standard property
        || document.webkitFullscreenElement //safari/opera support
        || document.mozFullscreenElement    //firefox support
        || document.msFullscreenElement;    //ie/edge support
}

function toggleFullscreen() {
    if (getFullscreenElement()) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen().catch(console.log);
    }
}

export default function TopMenu() {
    return (
        <AppBar className={styles.navbar} position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Tarefas
                </Typography>
                <Search className={styles.searchBar}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Pesquisar por Tarefa..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Button className={styles.filtrosBtn} variant="contained" endIcon={<FilterAltIcon />}>
                    Filtros
                </Button>
                <Badge className={styles.notification} badgeContent={7} max={10} color="error">
                    <NotificationsIcon />
                </Badge>
                <IconButton
                    onClick={('dblclick', () => {
                        toggleFullscreen();
                    })}
                    className={styles.fullscreenBtn}
                    aria-label="full-screen">
                    <FullscreenIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}