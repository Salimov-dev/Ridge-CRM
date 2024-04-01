import styled from "@emotion/styled";
import { Box } from "@mui/material";
import TelegramIcon from "@assets/telegram_logo.png";
import YoutubeIcon from "@assets/youtube_logo.png";
import MailIcon from "@assets/mail_logo.png";

const IconsContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  gap: 26px;
`;

const Logo = styled("img")({
  borderRadius: "25%",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)"
  }
});

const Contacts = ({
  justifyContent = "end",
  padding = "20px",
  size = "80px"
}) => {
  const handleTelegramClick = () => {
    window.open("https://t.me/ridge_crm", "_blank");
  };

  const handleMailClick = () => {
    window.location.href = "mailto:ridge-crm@mail.ru";
  };

  const handleYoutubeClick = () => {
    window.open("https://www.youtube.com/@ridge_crm", "_blank");
  };
  return (
    <IconsContainer
      sx={{
        justifyContent: justifyContent,
        padding: padding
      }}
    >
      <Logo
        src={TelegramIcon}
        onClick={handleTelegramClick}
        style={{ width: size, height: size }}
      />
      <Logo
        src={YoutubeIcon}
        onClick={handleYoutubeClick}
        style={{ width: size, height: size }}
      />
      <Logo
        src={MailIcon}
        onClick={handleMailClick}
        style={{ width: size, height: size }}
      />
    </IconsContainer>
  );
};

export default Contacts;
