import { Typography, Box } from "@mui/material";
import { Warning } from "@mui/icons-material";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Box className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Warning sx={{ fontSize: "5rem" }} className="text-sky-500" />
          <Typography
            variant="h1"
            component="span"
            className="text-6xl font-normal text-sky-500"
          >
            404
          </Typography>
        </div>
        <Typography
          variant="h4"
          component="h1"
          className="text-gray-600 font-normal"
        >
          Oops... Page Not Found!
        </Typography>
      </Box>
    </div>
  );
};

export default NotFound;
