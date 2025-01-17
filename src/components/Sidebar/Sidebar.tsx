import { AccountCircle } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  username,
}: SidebarProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const menuItems = [
    { text: "INICIO", abbreviation: "IN", path: "/" },
    { text: "Consulta Clientes", abbreviation: "CC", path: "/clients" },
  ];

  const content = (
    <div className="h-full flex flex-col">
      <div className="p-4 flex flex-col items-center space-y-2">
        <AccountCircle className="!w-28 !h-28" />
        <Typography variant="subtitle1">{username}</Typography>
      </div>
      <Divider />
      <Typography variant="h6" className="mb-2 flex flex-col items-center py-4">
        MENÚ
      </Typography>
      <Divider />
      <Box className="p-4">
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={(e) => {
                navigate(item.path);
              }}
              className={`mb-2 rounded-lg`}
            >
              <div className="w-10 h-10 flex items-center justify-center mr-2">
                <span className="text-sky-400 font-bold">
                  {item.abbreviation}
                </span>
              </div>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );

  return (
    <>
      <Drawer
        variant={isLgUp ? "permanent" : "temporary"}
        open={isLgUp ? true : open}
        onClose={onClose}
        PaperProps={{
          className: "w-80 mt-16 !bg-gray-200 !shadow-lg",
        }}
      >
        {content}
      </Drawer>
    </>
  );
};

export default Sidebar;
