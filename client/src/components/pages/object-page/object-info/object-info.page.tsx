// libraries
import { FC, useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
// components
import TabsStyled from "@components/common/tabs/tabs-styled";
import tabsObjectInfoPage from "./tabs/tabs.object-info";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { IObject } from "@interfaces/object/object.interface";
// dialogs
import DialogPages from "@dialogs/dialog-pages";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";

interface ObjectInfoPageProps {
  object: IObject | null;
  state: IDialogPagesState;
}

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfoPage: FC<ObjectInfoPageProps> = ({ state, object }) => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const objectId = object?._id;

  useEffect(() => {
    if (objectId) {
      setStateDialogPages((prevState) => ({
        ...prevState,
        objectId: objectId
      }));
    }
  }, []);

  return (
    <Component>
      <TabsStyled
        tabs={tabsObjectInfoPage({ object, state, setStateDialogPages })}
      />
      <DialogPages state={stateDialogPages} setState={setStateDialogPages} />
    </Component>
  );
};

export default ObjectInfoPage;
