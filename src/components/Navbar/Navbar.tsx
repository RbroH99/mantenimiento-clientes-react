import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon, LogoutOutlined } from "@mui/icons-material";
import { useCallback } from "react";
import { useAuthContext } from "../../context/AuthContext";

interface NavbarProps {
  onMenuClick: () => void;
  username: string;
}

export default function Navbar({ onMenuClick, username }: NavbarProps) {
  const { logout } = useAuthContext();
  const handleLogout = useCallback(() => {
    console.log("Logout clicked");
    logout();
  }, []);

  return (
    <AppBar position="fixed" className="bg-[#071727] z-[1200]">
      <Toolbar className="bg-[#071727] border-b-4 border-b-sky-500">
        <IconButton edge="start" onClick={onMenuClick} className=" !text-white">
          <MenuIcon className="" />
        </IconButton>
        <Typography variant="h6" component="div" className="flex-grow">
          COMPANIA PRUEBA
        </Typography>
        <Typography variant="body1" className="!mr-4">
          {username}
        </Typography>
        <IconButton
          size="small"
          onClick={handleLogout}
          className="!bg-white !text-[#001f3f] "
        >
          <LogoutOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
