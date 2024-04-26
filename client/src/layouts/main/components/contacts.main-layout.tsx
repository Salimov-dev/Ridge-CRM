import styled from "@emotion/styled";
import { Box } from "@mui/material";
import TelegramIcon from "@assets/telegram_logo.png";
import YoutubeIcon from "@assets/youtube_logo.png";
import MailIcon from "@assets/mail_logo.png";
import VkIcon from "@assets/vk_logo.png";

const IconsContainer = styled(Box)`
  display: flex;
  align-items: end;
  bottom: 0;
  right: 0;
`;

const Logo = styled("img")({
  borderRadius: "25%",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)"
  },
  "@media screen and (max-width: 755px)": {
    width: "40px",
    height: "40px"
  },
  "@media screen and (min-width: 756px) and (max-width: 1199px)": {
    width: "60px",
    height: "60px"
  },
  "@media screen and (min-width: 1200px)": {
    width: "80px",
    height: "80px"
  }
});

const IconsContactMainLayout = ({
  justifyContent = "end",
  padding = "20px"
}) => {
  const handleSendMail = () => {
    window.location.href = "mailto:ridge-crm@mail.ru";
  };

  const handleOpenLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <IconsContainer
      sx={{
        justifyContent: justifyContent,
        padding: padding,
        position: { md: "static", lg: "fixed" },
        gap: { xs: "10px", md: "20px" }
      }}
    >
      <Logo
        src={VkIcon}
        onClick={() => handleOpenLink("https://vk.com/ridgecrm")}
      />
      <Logo
        src={TelegramIcon}
        onClick={() => handleOpenLink("https://t.me/ridge_crm")}
      />
      <Logo
        src={YoutubeIcon}
        onClick={() => handleOpenLink("https://www.youtube.com/@ridge_crm")}
      />
      <Logo src={MailIcon} onClick={handleSendMail} />
    </IconsContainer>
  );
};

export default IconsContactMainLayout;
