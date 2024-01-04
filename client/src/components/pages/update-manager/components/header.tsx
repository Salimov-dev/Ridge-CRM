import { Box, Typography, styled } from "@mui/material";
import CloseButtonIconButton from "../../../common/buttons/icons buttons/close.button-icon";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const Title = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = ({ user, onClose }) => {
  return (
    <Component>
      <Title>
        <Typography variant="h2">Редактировать менеджера:</Typography>
        <Typography
          variant="h2"
          sx={{ background: "yellow", color: "black", padding: "0 4px" }}
        >
          {user?.name.lastName} {user?.name.firstName} {user?.name.surName}
        </Typography>
      </Title>
      <CloseButtonIconButton onClose={onClose} />
    </Component>
  );
};

export default Header;
