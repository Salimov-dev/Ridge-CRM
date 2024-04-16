import { Box, Typography, styled } from "@mui/material";
import ObjectName from "./components/object-name";
import ButtonsPanel from "../buttons-panel/buttons-panel";

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

const Header = ({
  object,
  onClose,
  onOpenUpdateObjectPage,
  onOpenCreatePresentationPage
}) => {
  const city = object?.city;
  const address = object?.address;

  return (
    <HeaderContainer>
      <Title>
        <Typography variant="h2">Объект: </Typography>
        <ObjectName city={city} address={address} />
      </Title>
      <ButtonsPanel
        object={object}
        onClose={onClose}
        onOpenUpdateObjectPage={onOpenUpdateObjectPage}
        onOpenCreatePresentationPage={onOpenCreatePresentationPage}
        hasAddPresentationButton={false}
        hasCloudButton={false}
      />
    </HeaderContainer>
  );
};

export default Header;
