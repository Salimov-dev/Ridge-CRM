import { useDispatch, useSelector } from "react-redux";
import DialogStyled from "../../../common/dialog/dialog-styled";
import {
  loadUpdateDealOpenState,
  setUpdateDealOpenState,
} from "../../../../store/deal/update-deal.store";
import UpdateDeal from "../../../pages/update-deal/update-deal";

const UpdateDealDialog = ({ stages, objects }) => {
  const dispatch = useDispatch();
  const isOpenUpdateDeal = useSelector(loadUpdateDealOpenState());

  const handleCloseCreateDeal = () => {
    dispatch(setUpdateDealOpenState(false));
  };

  return (
    <DialogStyled
      onClose={handleCloseCreateDeal}
      open={isOpenUpdateDeal}
      maxWidth="lg"
      fullWidth={false}
      component={
        <UpdateDeal
          title="Обновить объект сделки"
          stages={stages}
          objects={objects}
          onClose={handleCloseCreateDeal}
        />
      }
    />
  );
};

export default UpdateDealDialog;
