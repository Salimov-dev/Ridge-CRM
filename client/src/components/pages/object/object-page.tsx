import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, styled } from "@mui/material";
import Loader from "../../common/loader/loader";
// components
import ObjectsOnMap from "../../common/elements-on-map/objects-on-map";
import ObjectInfo from "./components/object-info";
import Header from "./components/header";
// store
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "../../../store/objects.store";

const Map = styled(Box)`
  width: 100%;
  height: 250px;
  flex: 5;
  display: flex;
  background: gray;
  margin-bottom: 10px;
`;

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const object = useSelector(getObjectById(objectId));
  const isLoading = useSelector(getObjectsLoadingStatus());

  return (
    <Box>
      <Header object={object} />
      <Map>{!isLoading ? <ObjectsOnMap object={object} /> : <Loader />}</Map>
      {!isLoading ? (
        <ObjectInfo object={object} isLoading={isLoading} />
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default ObjectPage;
