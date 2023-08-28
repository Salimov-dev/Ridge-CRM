import { useSelector } from "react-redux";
import Loader from "../../../common/loader/loader";
import { Box, Typography, styled } from "@mui/material";
import { FormatDate } from "../../../../utils/date/format-date";
import { getUserNameById } from "../../../../store/user/users.store";
import { getDistrictById } from "../../../../store/object/districts.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
`;

const Baloon = ({ object }) => {
  const date = FormatDate(object.created_at);
  const manager = useSelector(getUserNameById(object?.userId));
  const city = object?.location?.city;
  const district = useSelector(getDistrictById(object?.location?.district));
  const address = object?.location?.address;

  return object ? (
    <BaloonContainer>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography>
          <b>Дата создания:</b>
        </Typography>
        {date}
      </Box>
      <Typography>
        <b>Менеджер:</b> {manager}
      </Typography>
      <Typography>
        <b>Город:</b> {city}
      </Typography>
      <Typography>
        <b>Район:</b> {district}
      </Typography>
      <Typography>
        <b>Адрес:</b> {address}
      </Typography>
    </BaloonContainer>
  ) : (
    <Loader height={90} />
  );
};

export default Baloon;
