import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/object/objects.store";

const Main = () => {
  const objects = useSelector(getObjectsList());
  return (
    <>
      <h1>Main</h1>
      <h3>Тут будут различные графики и Результаты</h3>
    </>
  );
};

export default Main;
