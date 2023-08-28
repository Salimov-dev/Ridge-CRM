import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { getMonthIndexState } from "../../../store/month-index.store";

const Header = () => {
    const monthIndex = useSelector(getMonthIndexState())
    console.log("monthIndex", monthIndex);
    
  return (
    <Box sx={{ margin: "20px 0", display: "flex", gap: "4px" }}>
      <Button variant="outlined" color="success">
        назад
      </Button>
      <Button variant="outlined" color="success">
        Today
      </Button>
      <Button variant="outlined" color="success">
        вперед
      </Button>
    </Box>
  );
};

export default Header;
