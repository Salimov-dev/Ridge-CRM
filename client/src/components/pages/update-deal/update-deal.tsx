// liraries
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import DealForm from "../../common/forms/deal-form/deal-form";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import { getUpdateDealId } from "../../../store/deal/update-deal.store";
import {
  getDealById,
  removeDeal,
  updateDeal,
} from "../../../store/deal/deal.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";

const UpdateDeal = ({ title, objects, onClose, stages }) => {
  const [open, setOpen] = useState(false);
  const dealId = useSelector(getUpdateDealId());
  const deal = useSelector(getDealById(dealId));
  const objectId = deal?.objectId;
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const {
    register,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: deal,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });
  const data = watch();

  const isEditMode = dealId ? true : false;

  const handleUpdateDeal = () => {
    dispatch<any>(updateDeal(data))
      .then(onClose())
      .then(toast.success("Сделка успешно изменена!"));
  };

  const handleRemoveDeal = (dealId) => {
    dispatch<any>(removeDeal(dealId))
      .then(onClose())
      .then(toast.success("Сделка успешно удалена!"));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (objectId) {
      setValue("objectId", objectId);
    }
  }, [objectId]);

  return (
    <>
      <TitleWithCloseButton
        title={title}
        background="orange"
        color="white"
        onClose={onClose}
      />
      <DealForm
        stages={stages}
        objects={objects}
        register={register}
        errors={errors}
        watch={watch}
        isEditMode={isEditMode}
      />
      <FooterButtons
        onUpdate={handleUpdateDeal}
        onClose={onClose}
        onRemove={handleClickOpen}
        removeId={dealId}
        isEditMode={isEditMode}
        isValid={!isValid}
      />
      <ConfirmRemoveDialog
        removeId={dealId}
        open={open}
        onClose={handleClose}
        onRemove={handleRemoveDeal}
      />
    </>
  );
};

export default UpdateDeal;
