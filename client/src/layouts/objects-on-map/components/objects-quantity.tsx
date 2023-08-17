import { styled, Typography, Box } from "@mui/material";
import Loader from "../../../components/common/loader/loader";

const ObjectsQuantity = styled(Box)`
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
`;

const ObjectQuantity = ({ isLoading, newSearchedObj }) => {
  return (
    <ObjectsQuantity>
      <Typography variant="h5" sx={{ whiteSpace: "nowrap" }}>
        Всего объектов:
      </Typography>
      {!isLoading ? (
        <Typography variant="h5">{newSearchedObj?.length}</Typography>
      ) : (
        <Loader width="50px" />
      )}
      <Typography variant="h5">шт.</Typography>
    </ObjectsQuantity>
  );
};

export default ObjectQuantity;
