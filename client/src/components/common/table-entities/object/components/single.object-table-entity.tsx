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
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getObjectsList } from "@store/object/objects.store";

interface SingleObjectTableEntityProps {
  object?: IObject | null;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const Component = styled(Box)`
  display: flex;
  alignitems: center;
  justify-content: center;
`;

const SingleObjectTableEntity: FC<SingleObjectTableEntityProps> = ({
  object,
  setState
}): JSX.Element => {
  const objectId = object?._id;
  const objectsList = useSelector(getObjectsList());
  const { handleOpenObjectPage } = objectsDialogsState({ setState });

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
      {objectId ? (
        <Component key={objectId}>
          {getObjectName(objectId)}
          <OpenPageElementIconButton
            title="Открыть объект"
            heightButton="20px"
            onClick={() => handleOpenObjectPage(objectId)}
          />
        </Component>
      ) : (
        <EmptyTd />
      )}
    </AlignCenter>
  );
};

export default SingleObjectTableEntity;
