import "dayjs/locale/ru";
import React from "react";
import { Box, Typography, styled } from "@mui/material";
import telegramIcon from "@assets/telegram.png";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

const Logo = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  margin-bottom: 30px;
`;

const Main = React.memo(() => {
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
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          gap: "50px",
          padding: "0 2%"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            gap: "30px"
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
            ЗАБУДЬТЕ ПРО EXCEL, В ГРЯДКЕ ВСЁ ЕСТЬ
          </Typography>
          <Typography sx={{ fontSize: "20px", lineHeight: "1.4" }}>
            Работайте в Грядке самостоятельно или создайте Команду из своих
            Менеджеров и добавляйте новые объекты кликом прямо с карты,
            назначайте встречи, контролируйте воронку переговоров, качественно и
            своевременно прорабатывайте каждого Собственника из своей базы с
            помощью наших алгоритмов
          </Typography>
          <Typography
            sx={{ fontSize: "28px", lineHeight: "1.4", color: "DodgerBlue" }}
          >
            Стоимость подписки 25руб/день
          </Typography>
        </Box>

        <ButtonStyled
          title="ПОПРОБОВАТЬ БЕСПЛАТНО НА 14 ДНЕЙ"
          style="LAST_CONTACT"
          icon={<ThumbUpAltOutlinedIcon />}
          height="70px"
          style="TRY_DEMO"
          fontSize="18px"
          padding="0 30px"
          // disabled={!isAuthorEntity}
          // onClick={() => onUpdate(lastContactId)}
        />
      </Box>
    </Box>
  );
});

export default Main;
