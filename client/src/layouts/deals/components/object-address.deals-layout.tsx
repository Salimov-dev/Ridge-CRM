import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import OpenPageElementIconButton from "@components/common/button-icons/open-page-element.button-icon";
// store
import { getObjectAddressById } from "@store/object/objects.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`;

const DealObjectAddress = ({ obj, onClick }) => {
  const objectAddress = useSelector(getObjectAddressById(obj?._id));

  return (
    <Component>
      <Typography variant="h6">{objectAddress}</Typography>
      <OpenPageElementIconButton
        title="Открыть объект"
        width="20px"
        color="black"
        colorHover="blue"
        onClick={onClick}
      />
    </Component>
  );
};

export default DealObjectAddress;
