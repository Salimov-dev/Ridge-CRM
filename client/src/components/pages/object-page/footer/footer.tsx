import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import Loader from "@common/loader/loader";
import ButtonsPanel from "../buttons-panel/buttons-panel";
import AutocompleteStyled from "@common/inputs/autocomplete-styled";
// store
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import { updateObject } from "@store/object/objects.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const Footer = ({
  object,
  onClose,
  onEdit,
  isEdit,
  isLoading,
  isAuthorEntity = true,
}) => {
  const dispatch = useDispatch();
  const objectStatuses = useSelector(getObjectsStatusList());
  const sortedObjectStatuses = orderBy(objectStatuses, "name", ["asc"]);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: object,
    mode: "onChange",
  });

  const watchStatus = watch("status");
  const objectStatus = object?.status;

  const [statusChanged, setStatusChanged] = useState(false);

  useEffect(() => {
    if (watchStatus !== objectStatus) {
      setStatusChanged(true);
    } else {
      setStatusChanged(false);
    }
  }, [watchStatus, objectStatus]);

  useEffect(() => {
    if (statusChanged) {
      dispatch<any>(updateObject({ ...object, status: watchStatus }));
    }
  }, [watchStatus, statusChanged]);

  useEffect(() => {
    setValue<any>("status", objectStatus);
  }, [objectStatus]);

  return !isLoading ? (
    <Component>
      <AutocompleteStyled
        label="Изменить статус объекта"
        register={register}
        name="status"
        width="300px"
        options={sortedObjectStatuses}
        value={watchStatus ?? ""}
        setValue={setValue}
        watchItemId={watchStatus}
        errors={errors?.status}
        disabled={!isAuthorEntity}
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

export default Footer;