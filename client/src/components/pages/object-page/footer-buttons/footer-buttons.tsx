import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/loader/loader";
import ButtonsPanel from "../buttons-panel/buttons-panel";
import AutocompleteStyled from "../../../common/inputs/autocomplete-styled";
import { getObjectsStatusList } from "../../../../store/object/object-status.store";
import { updateObject } from "../../../../store/object/objects.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const FooterButtons = ({
  object,
  onClose,
  onEdit,
  isEdit,
  isLoading,
  isAuthorEntity = true,
}) => {
  const dispatch = useDispatch();
  const objectStatuses = useSelector(getObjectsStatusList());

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: object,
    mode: "onBlur",
  });

  const data = watch();

  const watchStatus = watch("status");

  useEffect(() => {
    dispatch<any>(updateObject(data));
  }, [watchStatus]);

  return !isLoading ? (
    <Component>
      <AutocompleteStyled
        label="Изменить статус объекта"
        register={register}
        name="status"
        width="300px"
        options={objectStatuses}
        value={watchStatus ?? ""}
        setValue={setValue}
        watchItemId={watchStatus}
        errors={errors?.status}
      />
      <ButtonsPanel
        object={object}
        onClose={onClose}
        onEdit={onEdit}
        negativeTitle="Закрыть"
        isEdit={isEdit}
        isAuthorEntity={isAuthorEntity}
      />
    </Component>
  ) : (
    <Loader />
  );
};

export default FooterButtons;
