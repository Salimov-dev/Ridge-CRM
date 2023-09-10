import { Box, Typography, styled } from "@mui/material";
// components
import ObjectName from "./components/object-name";
import ButtonsPanel from "../buttons-panel/buttons-panel";
import Loader from "../../../common/loader/loader";

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

const Header = ({ object, isLoading, onClose, onEdit, isEdit }) => {
  const city = object?.location.city;
  const address = object?.location.address;

  return !isLoading ? (
    <HeaderContainer>
      <Title>
        <Typography variant="h2">Объект: </Typography>
        <ObjectName city={city} address={address} />
      </Title>
      <ButtonsPanel onClose={onClose} isEdit={isEdit} onEdit={onEdit} negativeTitle="Закрыть"/>
    </HeaderContainer>
  ) : (
    <Loader />
  );
};

export default Header;
