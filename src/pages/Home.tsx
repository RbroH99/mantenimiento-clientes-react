import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <div className="min-h-screen flex mt-56 justify-center bg-gray-50">
      <Box className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Typography
            variant="h1"
            component="span"
            className="text-6xl !font-extrabold "
          >
            Bienvenido
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default Home;
