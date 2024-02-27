import "dayjs/locale/ru";
import React, { useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import backgroundImage from "@assets/main-background.png";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import PageDialogs from "@components/common/dialog/page-dialogs";

const Logo = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  margin-bottom: 30px;
`;

const Main = React.memo(() => {
  const [state, setState] = useState({
    loginPage: false,
    registerPage: false
  });
  const { handleOpenAuthPage } = useDialogHandlers(setState);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "start",
        flexDirection: "column"
      }}
    >
      <Logo>
        <Typography
          sx={{ fontSize: "70px", fontWeight: "700", marginBottom: "-10px" }}
        >
          Г Р Я Д К А
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>
          НАША СИСТЕМА АВТОМАТИЗАЦИИ ДЛЯ ОТДЕЛОВ РАЗВИТИЯ
        </Typography>
      </Logo>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex"
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
            padding: "2% 2% 5% 2%",
            gap: "20px"
          }}
        >
          <Typography
            sx={{ fontSize: "24px", lineHeight: "1.2", color: "Gold" }}
          >
            АВТОМАТИЗИРУЙТЕ СВОЙ ОТДЕЛ РАЗВИТИЯ
          </Typography>
          <Typography
            sx={{
              fontSize: "50px",
              fontWeight: "bold",
              lineHeight: "1.2",
              WebkitTextStroke: "1px white",
              WebkitTextFillColor: "transparent",
              MozTextStroke: "1px white",
              MozTextFillColor: "transparent",
              OTextStroke: "1px white",
              OTextFillColor: "transparent",
              msTextStroke: "1px white",
              msTextFillColor: "transparent"
            }}
          >
            ЗАБУДЬТЕ ПРО EXCEL, В ГРЯДКЕ ВСЁ ЕСТЬ ДЛЯ РАЗВИТИЯ
          </Typography>

          <Typography sx={{ fontSize: "20px", lineHeight: "1.4" }}>
            Работайте в Грядке самостоятельно или создайте команду из своих
            менеджеров и добавляйте новые объекты недвижимости кликом прямо с
            карты, назначайте встречи, контролируйте этапы переговоров,
            качественно и своевременно прорабатывайте каждые объект и контакт
          </Typography>
          <Typography sx={{ fontSize: "20px", lineHeight: "1.4" }}>
            Полностью Российская разработка. Сервер и База Данных расположены в
            Санкт-Петербурге
          </Typography>

          <Typography
            sx={{ fontSize: "28px", lineHeight: "1.4", color: "DodgerBlue" }}
          >
            Стоимость подписки 25руб/день
          </Typography>

          <ButtonStyled
            title="ПОПРОБОВАТЬ БЕСПЛАТНО НА 14 ДНЕЙ"
            style="LAST_CONTACT"
            icon={<ThumbUpAltOutlinedIcon />}
            height="70px"
            style="TRY_DEMO"
            fontSize="18px"
            padding="0 30px"
            // disabled={!isAuthorEntity}
            onClick={() => handleOpenAuthPage("register")}
          />
        </Box>
        <Box
          sx={{
            margin: "20px 0 0 0",
            height: "100% - 20px",
            width: "50%",
            display: "flex",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "auto 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left"
          }}
        ></Box>
      </Box>
      <PageDialogs state={state} setState={setState} />
    </Box>
  );
});

export default Main;
