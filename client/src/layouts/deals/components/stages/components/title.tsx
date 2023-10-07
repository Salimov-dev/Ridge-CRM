import { Box, Typography, styled } from "@mui/material";
import { getObjectsList } from "../../../../../store/object/objects.store";
import { useSelector } from "react-redux";

const DealTitleContainer = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = ({ item }) => {
  const objects = useSelector(getObjectsList());

  const stageObjects = objects?.filter(
    (obj) => obj?.status === item?.objectStatusId
  );

  const stageObjectsQuantity = stageObjects?.length;

  return (
    <DealTitleContainer
      sx={{
        color: item?.txtColor,
        backgroundColor: item?.bkgColor,
        padding: "8px 10px",
      }}
    >
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography variant="h5">
          <b>{item?.name}</b>{" "}
          {stageObjectsQuantity ? `[${stageObjectsQuantity}]` : null}
        </Typography>
      </Box>
    </DealTitleContainer>
  );
};

export default Title;
