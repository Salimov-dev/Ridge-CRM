import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import OpenPageElementIconButton from "../buttons/icons buttons/open-page-element.button-icon";
import { AlignCenter } from "../columns/styled";
import { getObjectsList } from "@store/object/objects.store";

const ObjectTableEntity = ({ objects, onOpenObjectPage }) => {
  const objectsList = useSelector(getObjectsList());

  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {objects.map((object) => {
        const objectId = object.object;

        const getObjectName = (objectId) => {
          const findedObject = objectsList?.find(
            (item) => item._id === objectId
          );
          const fullAddress = `${findedObject?.city}, ${findedObject?.address}`;

          return fullAddress;
        };

        return (
          <Box
            key={objectId}
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {getObjectName(objectId)}
            <OpenPageElementIconButton
              title="Открыть контакт"
              containerWidth="10px"
              height="20px"
              heightButton="20px"
              width="16px"
              onClick={() => onOpenObjectPage(objectId)}
            />
          </Box>
        );
      })}
    </AlignCenter>
  );
};

export default ObjectTableEntity;
