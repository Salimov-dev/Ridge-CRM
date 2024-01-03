// libraries
import { send } from "emailjs-com";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import ManagerPresentationForm from "../../common/forms/presentation/manager-presentation-form";
// schema
import { presentationSchema } from "../../../schemas/presentation-schema";
// utils
import transformObjectsForSelect from "../../../utils/objects/transform-objects-for-select";
// store
import { createPresentation } from "../../../store/presentation/presentations.store";
import {
  getObjectAddressById,
  getObjectsList,
} from "../../../store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUserNameById,
  getUsersList,
} from "../../../store/user/users.store";
import {
  getOpenObjectPageId,
  getOpenObjectPageOpenState,
} from "../../../store/object/open-object-page.store";
import SuccessCancelFormButtons from "../../common/forms/footer-buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import HeaderWithCloseButton from "../../common/page-titles/header-with-close-button";

const initialState = {
  objectId: "",
  status: "",
  cloudLink: "",
  curatorComment: "",
};

const CreatePresentation = React.memo(({ onClose, setConfettiActive }) => {
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
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(presentationSchema),
  });

  const data = watch();
  const watchObjectId = watch("objectId");
  const cloudLink = watch("cloudLink");

  const objectPageId = useSelector(getOpenObjectPageId());
  const isObjectPage = useSelector(getOpenObjectPageOpenState());
  const statusToBeAgreedId = "654wqeg3469y9dfsd82dd334"; // статус "На согласовании"

  const users = useSelector(getUsersList());
  const currentUserName = useSelector(getUserNameById(currentUserId));
  const curatorUser = users?.find((user) => user?.role === "CURATOR");
  const curatorName = useSelector(getUserNameById(curatorUser?._id));
  const curatorEmail = curatorUser?.email;

  const selectedObject = objects?.find((obj) => obj?._id === watchObjectId);
  const addressObject = useSelector(getObjectAddressById(selectedObject?._id));

  const toSend = {
    from_name: "Грядка",
    to_name: curatorName,
    to_email: curatorEmail,
    object_address: addressObject,
    created_manager: currentUserName,
    cloud_link: cloudLink,
    reply_to: "ridge-crm@mail.ru",
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    if (data.objectId && curatorName && addressObject && cloudLink) {
      const presentationNewData = {
        ...data,
        cloudLink: data.cloudLink,
        objectId: data.objectId,
        status: statusToBeAgreedId,
      };

      dispatch<any>(createPresentation(presentationNewData))
        .then(() => {
          onClose();
          setConfettiActive(true);
          toast.success("Презентация успешно создана!");
          // send(
          //   "service_yldzorr",
          //   "template_z0ijagp",
          //   toSend,
          //   "eLap4LxTXi9SlRBQh"
          // ).then(
          //   (result) => {
          //     console.log(result.text);
          //   },
          //   (error) => {
          //     console.log(error.text);
          //   }
          // );
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
    if (isObjectPage) {
      setValue<any>("objectId", objectPageId);
    }
  }, [objectPageId]);

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
      />
      <LoaderFullWindow
        color={colors.grey[600]}
        size={75}
        isLoading={isLoading}
      />
    </>
  );
});

export default CreatePresentation;
