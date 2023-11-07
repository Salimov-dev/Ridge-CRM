import { Typography } from "@mui/material";

const Titles = ({objects}) => {
  return (
    <>
      <Typography>
        Количество объектов к передаче: {objects?.length}шт
      </Typography>
      <Typography>
        Выберите Менеджера, которому будут переданы объекты:
      </Typography>
    </>
  );
};

export default Titles;
