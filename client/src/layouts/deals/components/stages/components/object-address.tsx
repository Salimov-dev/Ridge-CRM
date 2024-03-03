import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import OpenPageElementIconButton from "@components/common/buttons/icons buttons/open-page-element.button-icon";
import { getObjectAddressById } from "@store/object/objects.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const ObjectAddress = ({ obj, onClick }) => {
  const objectAddress = useSelector(getObjectAddressById(obj?._id));

  return (
    <Component>
      <Typography variant="h6">{objectAddress}</Typography>
      <OpenPageElementIconButton onClick={onClick} color="black" />
    </Component>
  );
};

export default ObjectAddress;
