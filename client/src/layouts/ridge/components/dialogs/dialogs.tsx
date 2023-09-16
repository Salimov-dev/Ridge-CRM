import RidgeLastContactCreateDialog from "../../../../components/UI/dialogs/ridge-last-contacts/ridge-last-contact-create-dialog";
import RidgeLastContactUpdateDialog from "../../../../components/UI/dialogs/ridge-last-contacts/ridge-last-contact-update-dialog";
import ObjectFromRidgeCreatePageDialog from "../../../../components/UI/dialogs/ridge-objects/object-from-ridge-create-page-dialog";
import RidgeObjectCreatePageDialog from "../../../../components/UI/dialogs/ridge-objects/ridge-object-create-page-dialog";
import RidgeObjectUpdatePageDialog from "../../../../components/UI/dialogs/ridge-objects/ridge-object-update-page-dialog";
import RidgeTaskCreateDialog from "../../../../components/UI/dialogs/ridge-tasks/ridge-task-create-dialog";
import RidgeTaskUpdateDialog from "../../../../components/UI/dialogs/ridge-tasks/ridge-task-update-dialog";

const Dialogs = ({ objects, dateCreate, setDateCreate }) => {
  return (
    <>
      <RidgeTaskCreateDialog
        objects={objects}
        dateCreate={dateCreate}
        setDateCreate={setDateCreate}
      />
      <RidgeTaskUpdateDialog />

      <RidgeObjectCreatePageDialog />
      <RidgeObjectUpdatePageDialog />

      <ObjectFromRidgeCreatePageDialog />

      <RidgeLastContactCreateDialog />
      <RidgeLastContactUpdateDialog />
    </>
  );
};

export default Dialogs;