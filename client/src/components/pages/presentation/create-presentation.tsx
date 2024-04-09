// libraries
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import ManagerPresentationForm from "../../../forms/presentation/presentation-manager.form";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import HeaderWithCloseButton from "@common/page-headers/header-with-close-button";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// schema
import { presentationSchema } from "@schemas/presentation.schema";
// utils
import transformObjectsForSelect from "@utils/objects/transform-objects-for-select";
// store
import { createPresentation } from "@store/presentation/presentations.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import {
  getObjectAddressById,
  getObjectsList
} from "@store/object/objects.store";

const initialState = {
  objectId: "",
  status: "",
  cloudLink: "",
  curatorComment: ""
};

const CreatePresentation = React.memo(({ objectId, onClose, isObjectPage }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const actualObjects = isCurator ? currentUserObjects : objects;
  const transformObjects = transformObjectsForSelect(actualObjects);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(presentationSchema)
  });

  const data = watch();
  const watchObjectId = watch("objectId");
  const cloudLink = watch("cloudLink");

  const statusToBeAgreedId = "654wqeg3469y9dfsd82dd334"; // статус "На согласовании"
  const selectedObject = objects?.find((obj) => obj?._id === watchObjectId);
  const addressObject = useSelector(getObjectAddressById(selectedObject?._id));

  const onSubmit = (data) => {
    setIsLoading(true);
    if (data.objectId && addressObject && cloudLink) {
      const presentationNewData = {
        ...data,
        cloudLink: data.cloudLink,
        objectId: data.objectId,
        status: statusToBeAgreedId
      };

      dispatch<any>(createPresentation(presentationNewData))
        .then(() => {
          onClose();
          toast.success("Презентация успешно создана!");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error);
        });
    } else {
      toast.error("Пожалуйста, заполните все необходимые данные.");
    }
  };

  useEffect(() => {
    isObjectPage && setValue<any>("objectId", objectId);
  }, [objectId]);

  return (
    <>
      <HeaderWithCloseButton
        title="Добавить презентацию"
        color="white"
        margin="0 0 20px 0"
        background={colors.presentation["primary"]}
        onClose={onClose}
      />
      <ManagerPresentationForm
        data={data}
        objects={transformObjects}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        isObjectPage={isObjectPage}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        disabledRemoveButton={true}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default CreatePresentation;
