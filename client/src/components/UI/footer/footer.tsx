import { Box, Divider, styled } from "@mui/material";
import { useSelector } from "react-redux";
import ItemFooter from "./components/item.footer";
import {
  getCurrentUserId,
  getIsLoggedIn,
  getIsUserCurator
} from "@store/user/users.store";

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
  const isLoggedIn = useSelector(getIsLoggedIn());

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  return isLoggedIn ? (
    <Component>
      <Menu>
        <ItemFooter title="Главная" path="/" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Объекты" path="/objects" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Сделки" path="/deals" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Встречи" path="/meetings" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Презентации" path="/presentations" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Контакты" path="/contacts" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Компании" path="/companies" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Статистика" path="/statictics" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Проработка базы" path="/objectsdatabase" />
        <Divider orientation="vertical" flexItem />
        <ItemFooter title="Календарь" path="/calendar" />
        {isCurator ? (
          <>
            <Divider orientation="vertical" flexItem />
            <ItemFooter title="Команда" path="/users" />
          </>
        ) : null}
      </Menu>
    </Component>
  ) : null;
};

export default Footer;
