// libraries
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import LastContactForm from "../../common/forms/last-contact-form/last-contact-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
// MUI
import { Box, styled } from "@mui/material";
// store
import { createTask } from "../../../store/task/tasks.store";
import { getOpenObjectPageId } from "../../../store/object/open-object-page.store";
import { createLastContact } from "../../../store/last-contact/last-contact.store";
// schema
import { lastContactSchema } from "../../../schemas/last-contact-schema";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import AddPresentationForm from "../../common/forms/presentation/add-presentation-form";
import { getObjectsList } from "../../../store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../../store/user/users.store";
import { presentationSchema } from "../../../schemas/presentation-schema";
import {
  createPresentation,
  getPresentationsList,
} from "../../../store/presentation/presentations.store";

const initialState = {
  objectId: "",
  result: "",
  status: "",
  cloudLink: "",
  curatorComment: "",
};

const Component = styled(Box)`
  width: 100%;
`;

const CreatePresentation = ({ onClose }) => {
  const dispatch = useDispatch();
  const objectPageId = useSelector(getOpenObjectPageId());

  const objects = useSelector(getObjectsList());
  const presList = useSelector(getPresentationsList());
  // console.log("presList", presList);

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  const actualObjects = isCurator ? objects : currentUserObjects;
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

  const onSubmit = (data) => {
    const presentationNewData = {
      cloudLink: data.cloudLink,
      objectId: data.objectId,
    };
    console.log("data", data);
    

    dispatch<any>(createPresentation(data))
    .then(() =>
      onClose()
    );
  };

  useEffect(() => {
    if (objectPageId) {
      setValue<any>("objectId", objectPageId);
    }
  }, [objectPageId]);

  return (
    <Component>
      <TitleWithCloseButton
        title="Добавить презентацию"
        onClose={onClose}
        background="Fuchsia"
        color="white"
      />
      <AddPresentationForm
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
    </Component>
  );
};

export default CreatePresentation;
