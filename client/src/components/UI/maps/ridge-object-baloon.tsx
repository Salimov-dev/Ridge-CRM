import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import DividerStyled from "../../common/divider/divider-styled";
import OpenObjectButton from "../../common/map/baloon/open-object-button";
import Attribute from "../../common/map/baloon/attribute";
// utils
import { FormatDate } from "../../../utils/date/format-date";
// store
import { getUserNameById } from "../../../store/user/users.store";
import { getDistrictById } from "../../../store/object/districts.store";
import {
  setUpdateRidgeObjectId,
  setUpdateRidgeObjectOpenState,
} from "../../../store/ridge-object/update-ridge-object.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const RidgeObjectBaloon = ({ object }) => {
  const objectId = object?._id;
  const createdAt = FormatDate(object.created_at);
  const manager = useSelector(getUserNameById(object?.userId));
  const city = object?.location?.city;
  const district = useSelector(getDistrictById(object?.location?.district));
  const address = object?.location?.address;
  const comment = object?.comment;

  const dispatch = useDispatch();

  const handleOpenObjectPage = () => {
    dispatch(setUpdateRidgeObjectId(objectId));
    dispatch(setUpdateRidgeObjectOpenState(true));
  };

  return (
    <BaloonContainer>
      <OpenObjectButton onClick={handleOpenObjectPage} />
      <DividerStyled />
      <Attribute
        title="Дата создания:"
        subTitle={createdAt}
        withoutTypography={true}
      />
      <Attribute title="Менеджер:" subTitle={manager} />
      <Attribute title="Город:" subTitle={city} />
      <Attribute title="Район:" subTitle={district} />
      <Attribute title="Адрес:" subTitle={address} />

      <Box>
        <Typography variant="body1">
          <b>Комментарий</b>
        </Typography>
        <Attribute subTitle={comment} />
      </Box>
      <DividerStyled />
      <OpenObjectButton onClick={handleOpenObjectPage} />
    </BaloonContainer>
  );
};

export default RidgeObjectBaloon;
