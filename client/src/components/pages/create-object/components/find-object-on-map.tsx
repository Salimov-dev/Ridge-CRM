import { Box, styled } from "@mui/material";

const Map = styled(Box)`
  width: 100%;
  height: 250px;
  background-color: gray;
`;

const FindObjectOnMap = () => {
  return (
    <Map>
      <Box sx={{ width: "100%", height: "100%" }} id="findObject"></Box>
    </Map>
  );
};

export default FindObjectOnMap;
