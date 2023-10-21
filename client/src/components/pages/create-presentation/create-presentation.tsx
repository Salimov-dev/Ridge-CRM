// libraries
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, styled } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import AddPresentationForm from "../../common/forms/presentation/add-presentation-form";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
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
  result: "",
  status: "",
  cloudLink: "",
  curatorComment: "",
};

const Component = styled(Box)`
  width: 100%;
`;

const CreatePresentation = ({ onClose, setConfettiActive }) => {
  const dispatch = useDispatch();

  const objectPageId = useSelector(getOpenObjectPageId());
  const objects = useSelector(getObjectsList());

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
      status: "654wqeg3469y9dfsd82dd334",
    };

    dispatch<any>(createPresentation(presentationNewData))
      .then(() => onClose())
      .then(() => setConfettiActive(true));
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
        background="SaddleBrown"
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
