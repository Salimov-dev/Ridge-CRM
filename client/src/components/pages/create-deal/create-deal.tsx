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
  deals = [],
  objects = [],
  stages = [],
  onClose = () => {},
}) => {
  const dispatch = useDispatch();
  const selectedStageId = useSelector(getCreateDealStageId());

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(dealSchema),
  });
  const data = watch();

  const handleCreateDeal = () => {
    if (!deals?.some((deal) => deal?.objectId === data?.objectId)) {
      dispatch(createDeal(data))
        .then(() => onClose())
        .then(() => toast.success("Объект в сделку добавлен!"));
    } else {
      toast.error("Объект с таким адресом уже в сделках, выберитие другой");
    }
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
        errors={errors}
        watch={watch}
      />
      <FooterButtons
        isValid={isValid}
        onCreate={handleCreateDeal}
        onClose={onClose}
      />
    </Box>
  );
};

export default CreateDeal;
