import { Box, Divider, styled } from "@mui/material";
import Item from "./components/item";

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
  return (
    <Component>
      <Menu>
        <Item title="Главная" path="/" />
        <Divider orientation="vertical" flexItem />
        <Item title="Объекты" path="/objects" />
        <Divider orientation="vertical" flexItem />
        <Item title="Сделки" path="/deals" />
        <Divider orientation="vertical" flexItem />
        <Item title="Встречи" path="/meetings" />
        <Divider orientation="vertical" flexItem />
        <Item title="Грядка" path="/ridge" />
        <Divider orientation="vertical" flexItem />
        <Item title="Календарь" path="/calendar" />
        <Divider orientation="vertical" flexItem />
        <Item title="Менеджеры" path="/users" />
        <Divider orientation="vertical" flexItem />
        <Item title="Презентации" path="/" />
      </Menu>
    </Component>
  );
};

export default Footer;
