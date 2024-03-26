import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
// components
import OpenPageElementIconButton from "../buttons/icons buttons/open-page-element.button-icon";
import { AlignCenter } from "../columns/styled";
import EmptyTd from "../columns/empty-td";
// store
import { getObjectById, getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId, getIsUserManager } from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  alignitems: center;
  justify-content: center;
`;

const ObjectTableEntity = ({ objects, onOpenObjectPage }) => {
  const objectsList = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isManager = useSelector(getIsUserManager(currentUserId));

  const currentUserObjects = objects?.filter((obj) => {
    const object = useSelector(getObjectById(obj.object));
    const result = object?.userId === currentUserId;
    return result;
  });

  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {(isManager ? currentUserObjects : objects)?.length ? (
        objects?.map((object) => {
          const objectId = object.object;

          const getObjectName = (objectId) => {
            const foundObject = objectsList?.find(
              (item) => item._id === objectId
            );
            if (foundObject) {
              const fullAddress = `${foundObject.city}, ${foundObject.address}`;
              return fullAddress;
            }
            return null;
          };

          return (
            getObjectName(objectId) && (
              <Component key={objectId}>
                {getObjectName(objectId)}
                <OpenPageElementIconButton
                  title="Открыть контакт"
                  height="20px"
                  heightButton="20px"
                  width="16px"
                  onClick={() => onOpenObjectPage(objectId)}
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

export default ObjectTableEntity;
