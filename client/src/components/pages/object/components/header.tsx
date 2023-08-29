import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import ObjectName from "./object-name";
import ButtonsPanel from "./buttons-panel";
import Loader from "../../../common/loader/loader";
// store
import { getDistrictById } from "../../../../store/object/districts.store";
import { getObjectsLoadingStatus } from "../../../../store/object/objects.store";

const Component = styled(Box)``;

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

  return (
    <Component>
      {!isLoading ? (
        <HeaderContainer>
          <Title>
            <Typography variant="h2">Объект: </Typography>
            <ObjectName city={city} district={district} address={address} />
          </Title>
          <ButtonsPanel city={city} district={district} address={address} />
        </HeaderContainer>
      ) : (
        <Loader />
      )}
    </Component>
  );
};

export default Header;
