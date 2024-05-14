// libraries
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import PageDialogs from "@components/common/dialog/page-dialogs";
import TabsStyled from "@components/common/tabs/tabs-styled";
import tabsObjectInfoPage from "./tabs/tabs.object-info";
// utils
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";
// types
import { IDialogPagesState } from "src/types/dialog-pages/dialog-pages-state.interface";
import { IObject } from "@interfaces/object/object.interface";
// initial-states
import { dialogePagesState } from "@initial-states/dialog-pages-state/dialog-pages.state";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleCurator
} from "@store/user/users.store";
import DialogPages from "@dialogs/dialog-pages";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;
interface ObjectInfoPageProps {
  object: IObject;
}

const ObjectInfoPage: FC<ObjectInfoPageProps> = ({ state, object }) => {
  const [stateDialogPages, setStateDialogPages] =
    useState<IDialogPagesState>(dialogePagesState);

  const objectId = object?._id;
  const objects = useSelector(getObjectsList());
  const actualUsersList = getActualUsersList(objects);

  const currentUserId = useSelector(getCurrentUserId());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  // const currentUserObjects = useSelector(getCurrentUserObjects());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const actualObjects = isCurrentUserRoleCurator ? currentUserObjects : objects;

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
      <DialogPages
        users={actualUsersList}
        state={stateDialogPages}
        setState={setStateDialogPages}
        objects={actualObjects}
      />
    </Component>
  );
};

export default ObjectInfoPage;
