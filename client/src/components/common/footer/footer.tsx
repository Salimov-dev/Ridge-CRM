import { Box, Divider, styled } from "@mui/material";
import Item from "./components/item";
import { useSelector } from "react-redux";
import { getAuthState } from "../../../store/auth/auth.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../../store/user/users.store";

const Component = styled(Box)`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: end;
`;

const Menu = styled(Box)`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Footer = () => {
  const isAuth = useSelector(getAuthState());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  return isAuth ? (
    <Component>
      <Menu>
        <Item title="Главная" path="/" />
        <Divider orientation="vertical" flexItem />
        <Item title="Статистика" path="/statictics" />
        <Divider orientation="vertical" flexItem />
        <Item title="Объекты" path="/objects" />
        <Divider orientation="vertical" flexItem />
        <Item title="Проработка базы" path="/objectsdatabase" />
        <Divider orientation="vertical" flexItem />
        <Item title="Сделки" path="/deals" />
        <Divider orientation="vertical" flexItem />
        <Item title="Встречи" path="/meetings" />
        <Divider orientation="vertical" flexItem />
        <Item title="Календарь" path="/calendar" />
        <Divider orientation="vertical" flexItem />
        <Item title="Презентации" path="/presentations" />

        {isCurator ? (
          <>
            <Divider orientation="vertical" flexItem />
            <Item title="Менеджеры" path="/users" />
          </>
        ) : null}
      </Menu>
    </Component>
  ) : null;
};

export default Footer;
