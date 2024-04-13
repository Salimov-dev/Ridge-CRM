import { Box, Hidden, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ContactsMainLayout from "./contacts.main-layout";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2% 2% 5% 2%;
`;

const LeftSideMainLayout = ({ setState }) => {
  const { handleOpenAuthPage } = useDialogHandlers(setState);

  return (
    <Component
      sx={{
        width: { xs: "100%", lg: "50%" }
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: { xs: "center", lg: "start" },
          gap: { xs: "30px", sm: "40px", lg: "50px" }
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            lineHeight: "1.2",
            color: "Gold",
            textAlign: { xs: "center", lg: "start" }
          }}
        >
          АВТОМАТИЗИРУЙТЕ СВОЙ ОТДЕЛ РАЗВИТИЯ
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "32px", sm: "42px", lg: "50px" },
            fontWeight: "bold",
            lineHeight: "1.2",
            WebkitTextStroke: { sm: "1px white", sx: null },
            WebkitTextFillColor: { sm: "transparent", sx: null },
            MozTextStroke: { sm: "1px white", sx: null },
            MozTextFillColor: { sm: "transparent", sx: null },
            OTextStroke: { sm: "1px white", sx: null },
            OTextFillColor: { sm: "transparent", sx: null },
            msTextStroke: { sm: "1px white", sx: null },
            msTextFillColor: { sm: "transparent", sx: null },
            textAlign: { xs: "center", lg: "start" }
          }}
        >
          ЗАБУДЬТЕ ПРО EXCEL, В ГРЯДКЕ ВСЁ ЕСТЬ ДЛЯ РАЗВИТИЯ
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "18px", lg: "20px" },
            lineHeight: "1.4",
            textAlign: { xs: "center", lg: "start" }
          }}
        >
          Работайте в Грядке самостоятельно или создайте команду из своих
          менеджеров и добавляйте новые объекты недвижимости кликом прямо с
          карты, назначайте встречи, контролируйте этапы переговоров,
          качественно и своевременно прорабатывайте каждые объект и контакт
        </Typography>
        <Typography
          sx={{
            color: "GreenYellow",
            fontSize: { xs: "12px", sm: "16px", lg: "20px" },
            lineHeight: "1.4",
            textAlign: { xs: "center", lg: "start" }
          }}
        >
          Полностью Российская разработка. Сервер и База Данных расположены в
          Санкт-Петербурге
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "22px", lg: "28px" },
            lineHeight: "1.4",
            color: "DodgerBlue"
          }}
        >
          Стоимость подписки 25руб/день
        </Typography>

        <ButtonStyled
          title="ПОПРОБОВАТЬ БЕСПЛАТНО НА 14 ДНЕЙ"
          icon={<ThumbUpAltOutlinedIcon />}
          height="70px"
          style="TRY_DEMO"
          fontSize="18px"
          padding="0 30px"
          onClick={() => handleOpenAuthPage("register")}
        />
      </Box>
      <Hidden lgUp>
        <ContactsMainLayout
          justifyContent="center"
          padding="30px 20px 30px 20px"
          size="60px"
        />
      </Hidden>
    </Component>
  );
};

export default LeftSideMainLayout;
