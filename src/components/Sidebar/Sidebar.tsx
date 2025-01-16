import {
  Drawer,
  List,
  ListItemText,
  Avatar,
  Typography,
  Box,
  ListItemButton,
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

  const menuItems = [
    { text: "INICIO", abbreviation: "IN", path: "/" },
    { text: "Consulta Clientes", abbreviation: "CC", path: "/clients" },
  ];

  const content = (
    <div className="h-full flex flex-col">
      <div className="p-4 flex flex-col items-center space-y-2 border-b">
        <Avatar className="w-24 h-24">{username.charAt(0)}</Avatar>
        <Typography variant="subtitle1">{username}</Typography>
      </div>

      <Box className="p-4">
        <Typography variant="h6" className="mb-2">
          MENÚ
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={(e) => {
                navigate(item.path);
              }}
              href={item.path}
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
        variant="permanent"
        className="hidden lg:block"
        PaperProps={{
          className: "w-64 mt-16",
        }}
      >
        {content}
      </Drawer>

      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        PaperProps={{
          className: "w-64 mt-16",
        }}
      >
        {content}
      </Drawer>
    </>
  );
};

export default Sidebar;
