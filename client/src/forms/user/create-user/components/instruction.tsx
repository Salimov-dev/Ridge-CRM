import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import RoleContainer from "./role-container";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px;
`;

const Instruction = () => {
  return (
    <Component>
      <RoleContainer
        color="yellow"
        role="Менеджер"
        subtitle="создает, видит и редактирует только свои объекты"
      />
      <RoleContainer
        color="yellow"
        role="Куратор"
        subtitle="создает, видит и редактирует свои объекты, а так же видит, но
        не редактирует объекты своих Менеджеров, ставит им задачи"
      />
      <RoleContainer
        color="yellow"
        role="Наблюдатель"
        subtitle="создает, видит и редактирует свои объекты, а так же видит,
        но не редактирует объекты Куратора и его Менеджеров"
      />
    </Component>
  );
};

export default Instruction;
