import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
// components
import OpenPageElementIconButton from "../button-icons/open-page-element.button-icon";
import { AlignCenter } from "../../../styled/styled-columns";
// store
import { getObjectsList } from "@store/object/objects.store";

const Component = styled(Box)`
  display: flex;
  alignitems: center;
  justify-content: center;
`;

const AnyObjectTableEntity = ({ object, onOpenObjectPage }) => {
  const objectsList = useSelector(getObjectsList());
  const objectId = object?._id;

  const getObjectName = (objectId) => {
    const foundObject = objectsList?.find((item) => item._id === objectId);
    if (foundObject) {
      const fullAddress = `${foundObject.city}, ${foundObject.address}`;
      return fullAddress;
    }
    return null;
  };

  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
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
    </AlignCenter>
  );
};

export default AnyObjectTableEntity;
