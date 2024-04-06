import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import Loader from "@common/loader/loader";
import ButtonsPanel from "../buttons-panel/buttons-panel";
import AutocompleteStyled from "@common/inputs/autocomplete-styled";
// store
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import { updateObject } from "@store/object/objects.store";
// schemas
import { objectPageStatusSchema } from "@schemas/object/object-page-status.schema";

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
  onOpenCreatePresentationPage,
  isAuthorEntity = true
}) => {
  const [statusChanged, setStatusChanged] = useState(false);
  const dispatch = useDispatch();
  const objectStatuses = useSelector(getObjectsStatusList());
  const sortedObjectStatuses = orderBy(objectStatuses, "name", ["asc"]);

  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: object,
    mode: "onChange",
    resolver: yupResolver(objectPageStatusSchema)
  });

  const watchStatus = watch("status");
  const objectStatus = object?.status;

  useEffect(() => {
    if (!watchStatus) {
      toast.error("Статус не может быть пустым значением");
      return;
    }
    if (watchStatus !== objectStatus) {
      setStatusChanged(true);
    } else {
      setStatusChanged(false);
    }
  }, [watchStatus, objectStatus]);

  const newData = { ...object, status: watchStatus };

  useEffect(() => {
    if (statusChanged) {
      dispatch<any>(updateObject({ newData: newData }));
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
        onOpenCreatePresentationPage={onOpenCreatePresentationPage}
        isEdit={isEdit}
        isAuthorEntity={isAuthorEntity}
      />
    </Component>
  ) : (
    <Loader />
  );
};

export default Footer;
