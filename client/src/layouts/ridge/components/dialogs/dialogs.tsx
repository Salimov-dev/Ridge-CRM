import ObjectFromRidgeCreatePageDialog from "../../../../components/UI/dialogs/ridge-objects/object-from-ridge-create-page-dialog";
import RidgeObjectCreatePageDialog from "../../../../components/UI/dialogs/ridge-objects/ridge-object-create-page-dialog";
import RidgeObjectUpdatePageDialog from "../../../../components/UI/dialogs/ridge-objects/ridge-object-update-page-dialog";
import RidgeTaskUpdateDialog from "../../../../components/UI/dialogs/ridge-tasks/ridge-task-update-dialog";

const Dialogs = () => {
  return (
    <>
      <RidgeTaskUpdateDialog />
      <RidgeObjectUpdatePageDialog />
      <RidgeObjectCreatePageDialog />
      <ObjectFromRidgeCreatePageDialog />
    </>
  );
};

export default Dialogs;
