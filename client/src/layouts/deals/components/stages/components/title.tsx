import { Box, Typography, styled } from "@mui/material";

const DealTitleContainer = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = ({ item, count }) => {
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
        {count(item?._id) ? (
          <Typography variant="h5">
            <b>[{count(item?._id)}]</b>
          </Typography>
        ) : null}
      </Box>
    </DealTitleContainer>
  );
};

export default Title;
