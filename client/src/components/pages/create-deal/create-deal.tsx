// libraries
import { useEffect } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import DealForm from "../../common/forms/deal-form/deal-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
// store
import { createDeal } from "../../../store/deal/deal.store";
import { getCreateDealStageId } from "../../../store/deal/add-object-to-deal.store";
// schema
import { dealSchema } from "../../../schemas/deal-shema";

const initialState = {
  stageId: "",
  objectId: "",
  isArchived: false,
};

const CreateDeal = ({
  title = "",
  objects = [],
  stages = [],
  onClose = () => {},
}) => {
  const dispatch = useDispatch();
  const selectedStageId = useSelector(getCreateDealStageId());

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(dealSchema),
  });

  const data = watch();

  const onSubmit = () => {
    dispatch(createDeal(data))
      .then(() => onClose())
      .then(() => toast.success("Объект в сделку добавлен!"));
  };

  useEffect(() => {
    setValue("stageId", selectedStageId);
  }, [selectedStageId]);

  return (
    <Box>
      <TitleWithCloseButton
        title={title}
        background="SteelBlue"
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
      />
      <FooterButtons
        isValid={isValid}
        onCreate={handleSubmit(onSubmit)}
        onClose={onClose}
      />
    </Box>
  );
};

export default CreateDeal;
