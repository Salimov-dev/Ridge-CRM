import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import ObjectName from "./components/object-name";
import ButtonsPanel from "../buttons-panel/buttons-panel";
import Loader from "../../../common/loader/loader";
// store
import { getDistrictById } from "../../../../store/object/districts.store";

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled(Box)`
  display: flex;
  gap: 8px;
`;

const Header = ({ object, isLoading }) => {
  const city = object?.location.city;
  const address = object?.location.address;
  const district = useSelector(getDistrictById(object?.location.district));

  return !isLoading ? (
    <HeaderContainer>
      <Title>
        <Typography variant="h2">Объект: </Typography>
        <ObjectName city={city} district={district} address={address} />
      </Title>
      <ButtonsPanel city={city} district={district} address={address} />
    </HeaderContainer>
  ) : (
    <Loader />
  );
};

export default Header;
