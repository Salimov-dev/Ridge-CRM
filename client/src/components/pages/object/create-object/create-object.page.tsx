// libraries
import React, { FC, useState } from "react";
// dialogs
import DialogPages from "@dialogs/dialog-pages";
// components
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import ContentCreateObjectPage from "./components/content.create-object-page";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";

interface CreateObjectProps {
  onClose: () => void;
}

const CreateObject: FC<CreateObjectProps> = React.memo(({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  return (
    <>
      <ContentCreateObjectPage
        onClose={onClose}
        setIsLoading={setIsLoading}
        setStateDialogPages={setStateDialogPages}
      />
      <LoaderFullWindow isLoading={isLoading} />
      <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
    </>
  );
});

export default CreateObject;
