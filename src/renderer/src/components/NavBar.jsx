import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import userLogo from '../resources/user.png';
import Hamburger from 'hamburger-react';
const settings = ['Profile', 'Logout'];
function NavBar ({isOpen,toggle}){
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        window.ipcRender.send('logout')
    };

    return(
        <nav className="navbar">
            <div className="navbar_content">
               <Hamburger color='white' size={25} toggled={isOpen} toggle={toggle}/>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '5px 10px 0px 0px',
                }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar src={userLogo} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ m: '30px 0px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
            </div>
        </nav>
    )
}

export default NavBar;