import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const TitleContainer = styled(Box)`
  display: flex;
  gap: 4px;
`;

const Title = ({ item, objects }) => {
  const stageObjects = objects?.filter(
    (obj) => obj?.status === item?.objectStatusId
  );

  const stageObjectsQuantity = stageObjects?.length;

  return (
    <Component
      sx={{
        color: item?.txtColor,
        backgroundColor: item?.bkgColor,
        padding: "8px 10px"
      }}
    >
      <TitleContainer>
        <Typography variant="h5">
          <b>{item?.name}</b>{" "}
          {stageObjectsQuantity ? `[${stageObjectsQuantity}]` : null}
        </Typography>
      </TitleContainer>
    </Component>
  );
};

export default Title;
