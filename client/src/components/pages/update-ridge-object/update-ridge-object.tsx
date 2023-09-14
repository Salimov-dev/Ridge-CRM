// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { orderBy } from "lodash";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import Loader from "../../common/loader/loader";
import RidgeObjectForm from "../../common/forms/ridge-object-form/ridge-object-form";
import ObjectTasks from "../object-page/object-info/components/object-tasks";
import ItemOnMap from "../../common/map/item-on-map/item-on-map";
import RidgeObjectBaloon from "../../UI/maps/ridge-object-baloon";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import RidgeLastContacts from "../../../layouts/ridge/components/ridge-last-contacts/ridge-last-contacts";
import CreateRidgeTasksButtons from "../../../layouts/ridge/components/create-ridge-tasks-buttons/create-ridge-tasks-buttons";
import CreateRidgeLastContactButton from "../../UI/dialogs/buttons/create-ridge-last-contact-button";
import { ridgeTasksColumnsDialog } from "../../../columns/ridge-tasks-columns/ridge-tasks-columns-dialog";
// schemas
import { ridgeObjectSchema } from "../../../schemas/ridge-object-schema";
// store
import { getUpdateRidgeObjectId } from "../../../store/ridge-object/update-ridge-object.store";
import { getRidgeTasksByObjectId } from "../../../store/ridge-task/ridge-tasks.store";
import {
  getRidgeObjectById,
  getRidgeObjectsLoadingStatus,
  removeRidgeObject,
  updateRidgeObject,
} from "../../../store/ridge-object/ridge-objects.store";
import { getRidgeLastContactsByObjectId } from "../../../store/ridge-last-contact/last-ridge-contact.store";
import { useConfirm } from "material-ui-confirm";

const UpdateRidgeObject = ({ onClose }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();

  const tasksColumns = ridgeTasksColumnsDialog;

  const objectId = useSelector(getUpdateRidgeObjectId());
  const tasks = useSelector(getRidgeTasksByObjectId(objectId));
  const object = useSelector(getRidgeObjectById(objectId));

  const lastContacts = useSelector(getRidgeLastContactsByObjectId(objectId));
  const sortedLastContacts = orderBy(lastContacts, ["date"], ["asc"]);

  const address = `${object?.location?.city}, ${object?.location?.address}`;
  const latitude = object?.location?.latitude || null;
  const longitude = object?.location?.longitude || null;
  const mapZoom = object?.location?.zoom || null;
  const center = [latitude, longitude];

  const isLoading = useSelector(getRidgeObjectsLoadingStatus());
  const isEditMode = objectId ? true : false;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: object,
    mode: "onBlur",
    resolver: yupResolver(ridgeObjectSchema),
  });
  const data = watch();

  const onSubmit = (data) => {
    dispatch(updateRidgeObject(data, objectId))
      .then(onClose())
      .then(toast.success("Объект успешно изменен!"));
  };

  const handleRemoveObject = (objectId) => {
    confirm({
      title: "Подтвердите удаление объекта с грядки",
      description: "Удалить объект с грядки безвозвратно?",
      cancellationButtonProps: { color: "error" },
      confirmationButtonProps: { color: "success" },
    })
      .then(() => {
        dispatch(removeRidgeObject(objectId))
          .then(onClose())
          .then(toast.success("Объект успешно удален с грядки!"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return object ? (
    <Box>
      <Header object={object} onClose={onClose} />
      <ItemOnMap
        mapZoom={mapZoom}
        hintContent={address}
        center={center}
        isLoading={isLoading}
      />
      <RidgeObjectForm
        data={data}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        watch={watch}
      />
      <ObjectTasks
        columns={tasksColumns}
        tasks={tasks}
        object={object}
        margin="20px 0"
        buttons={<CreateRidgeTasksButtons />}
      />
      <RidgeLastContacts
        lastContacts={sortedLastContacts}
        object={object}
        margin="20px 0"
        buttons={
          <CreateRidgeLastContactButton
            title="Добавить последний контакт"
            objectId={objectId}
          />
        }
      />
      <FooterButtons
        object={object}
        objectId={objectId}
        onClose={onClose}
        onUpdate={handleSubmit(onSubmit)}
        onRemove={handleRemoveObject}
        removeId={objectId}
        isValid={isValid}
        isEditMode={isEditMode}
        isRidgeObject={true}
      />
    </Box>
  ) : (
    <Loader />
  );
};

export default UpdateRidgeObject;
