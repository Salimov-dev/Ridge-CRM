// libraries
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import ManagerPresentationForm from "../../common/forms/presentation/manager-presentation-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
// schema
import { presentationSchema } from "../../../schemas/presentation-schema";
// store
import { getObjectsList } from "../../../store/object/objects.store";
import { getOpenObjectPageId } from "../../../store/object/open-object-page.store";
import { createPresentation } from "../../../store/presentation/presentations.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../../store/user/users.store";

const initialState = {
  objectId: "",
  status: "",
  cloudLink: "",
  curatorComment: "",
};

const CreatePresentation = ({ onClose, setConfettiActive }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  const actualObjects = isCurator ? currentUserObjects : objects;
  actualObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(presentationSchema),
  });

  const data = watch();
  const watchObjectId = watch("objectId");
  const isFullValid = isValid && Boolean(watchObjectId?.length);
  const statusToBeAgreedId = "654wqeg3469y9dfsd82dd334"; // статус "На согласовании"

  const onSubmit = (data) => {
    setIsLoading(true);

    const presentationNewData = {
      ...data,
      cloudLink: data.cloudLink,
      objectId: data.objectId,
      status: statusToBeAgreedId,
    };

    dispatch<any>(createPresentation(presentationNewData))
      .then(() => {
        setIsLoading(false);
        onClose();
        setConfettiActive(true);
        toast.success("Презентация успешно создана!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  return isLoading ? (
    <IsLoadingDialog
      text="Немного подождите, создаем `Презентацию`"
      isLoading={isLoading}
    />
  ) : (
    <>
      <TitleWithCloseButton
        title="Добавить презентацию"
        onClose={onClose}
        background="SaddleBrown"
        color="white"
      />
      <ManagerPresentationForm
        data={data}
        objects={transformObjects}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />
      <FooterButtons
        onCreate={handleSubmit(onSubmit)}
        onClose={onClose}
        isValid={isFullValid}
      />
    </>
  );
};

export default CreatePresentation;
