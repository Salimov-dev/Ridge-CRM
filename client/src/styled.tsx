import { Box } from "@mui/material";
import styled from "@emotion/styled";
import grassImage from "./assets/grass.png"; // Путь к изображению

export const AppStyled = styled(Box)`
  display: flex;
  min-height: 100vh;
`;

export const RightSide = styled(Box)`
display: flex;
flex-direction: column;
justify-content: space-between;
  padding: 0 20px 50px 20px;
  width: 100%;
  background-image: url(${grassImage}); // Устанавливаем изображение в качестве фона
  background-repeat: repeat-x; // Повторяем по горизонтали (X)
  background-size: auto 35px; // Задаем высоту 50px, а ширину автоматически
  background-position: bottom; // Устанавливаем фон внизу
`;
