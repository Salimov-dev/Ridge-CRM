// libraries
import { send } from "emailjs-com";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
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
import {
  getObjectAddressById,
  getObjectsList,
} from "../../../store/object/objects.store";
import { createPresentation } from "../../../store/presentation/presentations.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUserNameById,
  getUsersList,
} from "../../../store/user/users.store";
import transformObjectsForSelect from "../../../utils/objects/transform-objects-for-select";

const initialState = {
  objectId: "",
  status: "",
  cloudLink: "",
  curatorComment: "",
};

const CreatePresentation = React.memo(({ onClose, setConfettiActive }) => {
  const dispatch = useDispatch();
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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(presentationSchema),
  });

  const data = watch();
  const watchObjectId = watch("objectId");
  const cloudLink = watch("cloudLink");

  const isFullValid = isValid && Boolean(watchObjectId?.length);
  const statusToBeAgreedId = "654wqeg3469y9dfsd82dd334"; // статус "На согласовании"

  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "",
    to_email: "",
    object_address: "",
    created_manager: "",
    cloud_link: "",
    reply_to: "",
  });

  const users = useSelector(getUsersList());
  const currentUserName = useSelector(getUserNameById(currentUserId));
  const curatorUser = users?.find((user) => user?.role === "CURATOR");
  const curatorName = useSelector(getUserNameById(curatorUser?._id));
  const curatorEmail = curatorUser?.email;

  const selectedObject = objects?.find((obj) => obj?._id === watchObjectId);
  const address = useSelector(getObjectAddressById(selectedObject?._id));

  const onSubmit = (data) => {
    setIsLoading(true);
    if (data.objectId && curatorName && address && cloudLink) {
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
          send(
            "service_yldzorr",
            "template_z0ijagp",
            toSend,
            "eLap4LxTXi9SlRBQh"
          ).then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
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
    setToSend({
      from_name: "test Ridge",
      to_name: curatorName,
      // to_email: curatorEmail,
      to_email: "ruspb1987@gmail.com",
      created_manager: currentUserName,
      object_address: address,
      cloud_link: cloudLink,
      reply_to: "ridge-crm@mail.ru",
    });
  }, [data]);

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
});

export default CreatePresentation;
