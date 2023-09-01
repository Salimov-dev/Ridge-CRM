import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// components
import ObjectPageBaloon from "../../UI/maps/object-page-baloon";
import Header from "./header/header";
import Loader from "../../common/loader/loader";
import ObjectInfo from "./object-info/object-info";
import FooterButtons from "./footer-buttons/footer-buttons";
import ItemOnMap from "../../common/map/item-on-map/item-on-map";
// store
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "../../../store/object/objects.store";

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const object = useSelector(getObjectById(objectId));
  const isLoading = useSelector(getObjectsLoadingStatus());

  const address = `${object?.location?.city}, ${object?.location?.address}`;
  const latitude = object?.location?.latitude || null;
  const longitude = object?.location?.longitude || null;
  const mapZoom = object?.location?.zoom || null;
  const center = [latitude, longitude];

  return (
    <Box>
      <Header object={object} isLoading={isLoading} />
      <ItemOnMap
        mapZoom={mapZoom}
        hintContent={address}
        center={center}
        baloon={<ObjectPageBaloon object={object} />}
        isLoading={isLoading}
      />
      {!isLoading ? (
        <ObjectInfo object={object} isLoading={isLoading} />
      ) : (
        <Loader />
      )}
      <FooterButtons objectId={objectId._id} isLoading={isLoading} />
    </Box>
  );
};

export default ObjectPage;