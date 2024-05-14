import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// store
import { getUserLicensesByUserId } from "@store/license/user-license.store";
import { getCurrentUserId } from "@store/user/users.store";

const Map = styled(Box)`
  width: 100%;
  height: 250px;
  background-color: gray;
  margin-bottom: 12px;
  position: relative;
`;

const ClickNumbersContainer = styled(Box)`
  width: 200px;
  height: 60px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 9999999;
`;

const ClickNumbers = styled(Typography)`
  color: red;
`;

const BlockMapContainer = styled(Box)`
  width: 100%;
  height: 100%;
  background: grey;
  position: absolute;
  z-index: 99999999;
  opacity: 0.7;
`;

const FindObjectOnMap = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));
  const quantityClicksOnMap = userLicense?.quantityClicksOnMap;

  const getClickText = (quantity) => {
    if (quantity === 1) {
      return "клик";
    } else if (quantity >= 2 && quantity <= 4) {
      return "клика";
    } else {
      return "кликов";
    }
  };

  const renderClickText = () => {
    if (quantityClicksOnMap === 1) {
      return `остался ${quantityClicksOnMap} ${getClickText(
        quantityClicksOnMap
      )}`;
    } else {
      return `осталось ${quantityClicksOnMap} ${getClickText(
        quantityClicksOnMap
      )}`;
    }
  };

  return (
    <Map>
      {!quantityClicksOnMap && <BlockMapContainer></BlockMapContainer>}

      <ClickNumbersContainer>
        <ClickNumbers variant="h2" sx={{ marginBottom: "-8px" }}>
          {quantityClicksOnMap}
        </ClickNumbers>
        <ClickNumbers variant="h7">{renderClickText()}</ClickNumbers>
      </ClickNumbersContainer>

      <Box
        sx={{ width: "100%", height: "100%", marginBottom: "12px" }}
        id="findObject"
      ></Box>
    </Map>
  );
};

export default FindObjectOnMap;
