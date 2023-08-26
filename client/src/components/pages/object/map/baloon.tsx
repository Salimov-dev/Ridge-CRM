import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import { FormatDate } from "../../../../utils/format-date";
import { getUserNameById } from "../../../../store/users.store";
import { getDistrictById } from "../../../../store/districts.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
`;

const Baloon = ({ object }) => {
  return (
    <BaloonContainer>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <b>Дата создания:</b> {FormatDate(object.created_at)}
      </Box>
      <Typography>
        <b>Менеджер:</b> {useSelector(getUserNameById(object?.userId))}
      </Typography>
      <Typography>
        <b>Город:</b> {object?.location?.city}
      </Typography>
      <Typography>
        <b>Район:</b> {useSelector(getDistrictById(object?.location?.district))}
      </Typography>
      <Typography>
        <b>Адрес:</b> {object?.location?.address}
      </Typography>
    </BaloonContainer>
  );
};

export default Baloon;
