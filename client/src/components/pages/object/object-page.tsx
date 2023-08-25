import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, styled } from "@mui/material";
// components
import Loader from "../../common/loader/loader";
import ObjectsOnMap from "../../common/elements-on-map/objects-on-map";
import ObjectInfo from "./components/object-info";
import Header from "./components/header";
// store
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "../../../store/objects.store";

const MapContainer = styled(Box)`
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
  background-color: gray;
`;

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const object = useSelector(getObjectById(objectId));
  const isLoading = useSelector(getObjectsLoadingStatus());

  return (
    <Box>
      <Header object={object} />
      <MapContainer>
        {!isLoading ? <Map searchedObjects={searchedObjects} /> : <Loader />}
      </MapContainer>
      {!isLoading ? (
        <ObjectInfo object={object} isLoading={isLoading} />
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default ObjectPage;
