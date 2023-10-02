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
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Typography variant="h5">
          <b>{item?.name}</b>
        </Typography>
      </Box>
    </DealTitleContainer>
  );
};

export default Title;
