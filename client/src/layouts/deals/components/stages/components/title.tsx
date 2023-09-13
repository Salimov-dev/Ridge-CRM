import { Box, Typography, styled } from "@mui/material";

const DealTitleContainer = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = ({ item }) => {
  return (
    <DealTitleContainer
      sx={{
        color: item?.txtColor,
        backgroundColor: item?.bkgColor,
        padding: "8px 10px",
      }}
    >
      <Typography variant="h5">
        <b>{item.name}</b>
      </Typography>
    </DealTitleContainer>
  );
};

export default Title;
