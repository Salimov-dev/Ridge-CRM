import { Box, Paper, Typography, styled } from "@mui/material";
import DividerStyled from "../../../../../components/common/divider/divider-styled";
import { FormatDate } from "../../../../../utils/date/format-date";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../../../store/object/open-object-page.store";
import { useDispatch } from "react-redux";
import OpenPageObjectIconButton from "../../../../../components/common/buttons/icons buttons/open-page-object-icon";
import UpdateElementIconButton from "../../../../../components/common/buttons/icons buttons/update-element-icon";

const ObjectsContainer = styled(Box)`
  width: 265px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 12px;
  margin-bottom: 14px;
  overflow-y: scroll;
  padding-right: 4px;
  margin-right: -8px;
`;

const ObjectContainer = styled(Paper)`
  width: 100%;
  color: black;
  background: white;
  padding: 10px;
  border: 1px solid gray;
`;

const Objects = ({ deals, item, getObjectAddress, userName }) => {
  const dispatch = useDispatch();

  const handleUpdateDeal = (dealId) => {};

  const handleOpenObjectPage = (objectId) => {
    console.log("objectId", objectId);
    dispatch(setOpenObjectPageId(objectId));
    dispatch(setOpenObjectPageOpenState(true));
  };

  return (
    <ObjectsContainer>
      {deals?.map((deal) => {
        const isDeal = deal?.stageId === item?._id;

        return isDeal ? (
          <ObjectContainer key={deal?._id}>
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Typography variant="h6">
                {getObjectAddress(deal?.objectId)}
              </Typography>
              <OpenPageObjectIconButton
                onClick={() => handleOpenObjectPage(deal?.objectId)}
              />
            </Box>
            <DividerStyled />
            <Typography>{FormatDate(deal?.created_at)}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontStyle: "italic" }}>{userName}</Typography>
              <UpdateElementIconButton onClick={handleUpdateDeal} />
            </Box>
          </ObjectContainer>
        ) : null;
      })}
    </ObjectsContainer>
  );
};

export default Objects;
