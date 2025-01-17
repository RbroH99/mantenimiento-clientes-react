import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <div className="min-h-screen flex mt-56 justify-center">
      <Box className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Typography
            variant="h1"
            component="span"
            className={`${isLgUp ? "text-6xl" : "text-3xl"} !font-extrabold`}
          >
            Bienvenido
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default Home;
