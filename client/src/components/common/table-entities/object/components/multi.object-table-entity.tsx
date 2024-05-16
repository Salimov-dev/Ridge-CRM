import { Dispatch, FC, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import OpenPageElementIconButton from "@components/common/button-icons/open-page-element.button-icon";
import EmptyTd from "@components/common/columns/empty-td";
// dialogs
import objectsDialogsState from "@dialogs/dialog-handlers/objects.dialog-handlers";
// styled
import { AlignCenter } from "@styled/styled-columns";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getObjectById, getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

interface MultiObjectsTableEntityProps {
  objects?: { object: string }[] | null;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  alignitems: center;
  justify-content: center;
`;

const MultiObjectsTableEntity: FC<MultiObjectsTableEntityProps> = ({
  objects,
  setState
}): JSX.Element => {
  const currentUserId = useSelector(getCurrentUserId());
  const objectsList = useSelector(getObjectsList());
  const { handleOpenObjectPage } = objectsDialogsState({ setState });
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  const currentUserObjects = objects?.filter((obj) => {
    const object = useSelector(getObjectById(obj.object));
    const result = object?.userId === currentUserId;
    return result;
  });

  const getObjectName = (objectId: string) => {
    const foundObject = objectsList?.find((item) => item._id === objectId);
    if (foundObject) {
      const fullAddress = `${foundObject.city}, ${foundObject.address}`;
      return fullAddress;
    }
    return null;
  };
  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {(isCurrentUserRoleManager ? currentUserObjects : objects)?.length ? (
        objects?.map((object) => {
          const objectId = object.object;

          return (
            getObjectName(objectId) && (
              <Component key={objectId}>
                {getObjectName(objectId)}
                <OpenPageElementIconButton
                  title="Открыть объект"
                  heightButton="20px"
                  onClick={() => handleOpenObjectPage(objectId)}
                />
              </Component>
            )
          );
        })
      ) : (
        <EmptyTd />
      )}
    </AlignCenter>
  );
};

export default MultiObjectsTableEntity;
