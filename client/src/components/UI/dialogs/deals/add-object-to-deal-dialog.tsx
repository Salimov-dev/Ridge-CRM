import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import {
  getAddObjectToDealOpenState,
  setAddObjectToDealOpenState,
} from "../../../../store/deal/add-object-to-deal.store";
import AddObjectToDeal from "../../../pages/add-object-to-deal/add-object-to-deal";

const AddObjectToDealDialog = ({ objects, stages }) => {
  const dispatch = useDispatch();
  const isOpenAddObject = useSelector(getAddObjectToDealOpenState());

  const handleCloseAddObjectToDeal = () => {
    dispatch(setAddObjectToDealOpenState(false));
  };

  return (
    <DialogStyled
      onClose={handleCloseAddObjectToDeal}
      open={isOpenAddObject}
      maxWidth="lg"
      fullWidth={false}
      component={
        <AddObjectToDeal
          title="Добавить объект в сделку"
          objects={objects}
          stages={stages}
          onClose={handleCloseAddObjectToDeal}
        />
      }
    />
  );
};

export default AddObjectToDealDialog;
