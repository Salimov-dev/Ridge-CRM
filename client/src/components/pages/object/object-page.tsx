import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
// components
import Loader from "../../common/loader/loader";
import ObjectInfo from "./components/object-info";
import Header from "./components/header";
import ItemOnMap from "../../common/map/item-on-map/item-on-map";
import Baloon from "./map/baloon";
// store
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "../../../store/objects.store";

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const object = useSelector(getObjectById(objectId));
  const isLoading = useSelector(getObjectsLoadingStatus());

  const latitude = object?.location?.latitude || null;
  const longitude = object?.location?.longitude || null;
  const mapZoom = object?.location?.zoom || null;
  const center = [latitude, longitude];
  const address = `${object?.location?.city}, ${object?.location?.address}`;

  return (
    <Box>
      <Header object={object} />
      <ItemOnMap
        items={object}
        mapZoom={mapZoom}
        hintContent={address}
        center={center}
        baloon={<Baloon object={object} />}
        isLoading={isLoading}
      />
      {!isLoading ? (
        <ObjectInfo object={object} isLoading={isLoading} />
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default ObjectPage;
