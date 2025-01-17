import { Typography, Box } from "@mui/material";
import { WarningRounded } from "@mui/icons-material";

const NotFound = () => {
  return (
    <div className="min-h-screen flex mt-56 justify-center bg-gray-50">
      <Box className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <WarningRounded
            sx={{ fontSize: "12rem" }}
            className="text-sky-500 font-bold"
          />
          <Typography
            variant="h1"
            component="span"
            className="text-9xl !font-extrabold text-sky-500"
          >
            404
          </Typography>
        </div>
        <Typography
          variant="h4"
          component="h1"
          className="text-gray-600 !font-bold"
        >
          Oops... Page Not Found!
        </Typography>
      </Box>
    </div>
  );
};

export default NotFound;
