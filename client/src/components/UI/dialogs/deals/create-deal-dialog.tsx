import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import {
  getCreateDealOpenState,
  setCreateDealOpenState,
} from "../../../../store/deal/add-object-to-deal.store";
import CreateDeal from "../../../pages/create-deal/create-deal";

const CreateDealDialog = ({ objects, deals, stages }) => {
  const dispatch = useDispatch();
  const isOpenAddObject = useSelector(getCreateDealOpenState());

  const handleCloseCreateDeal = () => {
    dispatch<any>(setCreateDealOpenState(false));
  };

  return (
    <DialogStyled
      onClose={handleCloseCreateDeal}
      open={isOpenAddObject}
      maxWidth="lg"
      fullWidth={false}
      component={
        <CreateDeal
          title="Добавить объект в сделку"
          objects={objects}
          deals={deals}
          stages={stages}
          onClose={handleCloseCreateDeal}
        />
      }
    />
  );
};

export default CreateDealDialog;
