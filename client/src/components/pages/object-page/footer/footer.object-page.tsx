import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
import { Box, styled } from "@mui/material";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import AutocompleteStyled from "@common/inputs/autocomplete-styled";
import ButtonsPanelObjectPage from "../buttons-panel/buttons-panel.object-page";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// schemas
import { objectPageStatusSchema } from "@schemas/object/object-page-status.schema";
// store
import { getObjectsStatusList } from "@store/object-params/object-status.store";
import { updateObject } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";

interface ObjectPageProps {
  object: IObject | null;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const FooterObjectPage: FC<ObjectPageProps> = ({
  object,
  setState
}): JSX.Element => {
  const dispatch = useDispatch();
  const [statusChanged, setStatusChanged] = useState(false);

  const currentUserId = useSelector(getCurrentUserId());
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

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
    resolver: yupResolver<any>(objectPageStatusSchema)
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

  useEffect(() => {
    const newData = { ...object, status: watchStatus };

    if (statusChanged) {
      dispatch<any>(updateObject({ newData: newData }));
    }
  }, [watchStatus, statusChanged]);

  useEffect(() => {
    setValue<any>("status", objectStatus);
  }, [objectStatus]);

  return (
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
      <ButtonsPanelObjectPage object={object} setState={setState} />
    </Component>
  );
};

export default FooterObjectPage;
