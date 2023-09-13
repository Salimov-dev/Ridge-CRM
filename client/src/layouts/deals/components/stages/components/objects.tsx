import { Box, Paper, Typography, styled } from "@mui/material";
import DividerStyled from "../../../../../components/common/divider/divider-styled";
import { FormatDate } from "../../../../../utils/date/format-date";

const ObjectsContainer = styled(Box)`
  width: 230px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 12px;
  margin-bottom: 14px;
`;

const ObjectContainer = styled(Paper)`
  width: 100%;
  color: black;
  background: white;
  padding: 10px;
  border: 1px solid gray;
`;

const Objects = ({ deals, item, getObjectAddress, userName }) => {
  return (
    <ObjectsContainer>
      {deals?.map((deal) => {
        const isDeal = deal?.stageId === item?._id;

        return isDeal ? (
          <ObjectContainer key={deal?._id}>
            <Typography variant="h5">
              {getObjectAddress(deal?.objectId)}
            </Typography>
            <DividerStyled />
            <Typography>{FormatDate(deal?.created_at)}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>{userName}</Typography>
          </ObjectContainer>
        ) : null;
      })}
    </ObjectsContainer>
  );
};

export default Objects;
