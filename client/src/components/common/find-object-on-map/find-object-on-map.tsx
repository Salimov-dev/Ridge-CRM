import { Box, styled } from "@mui/material";

const Map = styled(Box)`
  width: 100%;
  height: 250px;
  background-color: gray;
  margin-bottom: 12px;
`;

const FindObjectOnMap = () => {
  return (
    <Map>
      <Box sx={{ width: "100%", height: "100%", marginBottom: '12px' }} id="findObject"></Box>
    </Map>
  );
};

export default FindObjectOnMap;
