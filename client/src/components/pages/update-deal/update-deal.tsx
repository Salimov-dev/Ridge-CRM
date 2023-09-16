// liraries
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import DealForm from "../../common/forms/deal-form/deal-form";
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
  const confirm = useConfirm();
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
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: deal,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });
  const data = watch();

  const isEditMode = dealId ? true : false;

  const onSubmit = (data) => {
    dispatch(updateDeal(data, dealId))
      .then(onClose())
      .then(toast.success("Задача себе успешно изменена!"));
  };

  const handleUpdateDeal = () => {
    dispatch(updateDeal(data, dealId))
      .then(onClose())
      .then(toast.success("Задача себе успешно изменена!"));
  };

  const handleRemoveDeal = (dealId) => {
    confirm({
      title: "Подтвердите удаление сделки",
      description: "Удалить сделку безвозвратно?",
      cancellationButtonProps: { color: "error" },
      confirmationButtonProps: { color: "success" },
      confirmationText: "Подтвердить",
      cancellationText: "Отмена",
    })
      .then(() => {
        dispatch(removeDeal(dealId))
          .then(onClose())
          .then(toast.success("Сделка успешно удалена!"));
      })
      .catch((error) => {
        console.log(error);
      });
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
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        watch={watch}
        isEditMode={isEditMode}
      />
      <FooterButtons
        removeId={dealId}
        onUpdate={handleUpdateDeal}
        onRemove={handleRemoveDeal}
        onClose={onClose}
        isValid={!isValid}
        isEditMode={true}
      />
    </>
  );
};

export default UpdateDeal;
