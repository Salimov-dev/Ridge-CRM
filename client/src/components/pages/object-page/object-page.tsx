import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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
import { getOpenObjectPageId } from "../../../store/object/open-object-page.store";
import {
  setUpdateObjectId,
  setUpdateObjectOpenState,
} from "../../../store/object/update-object.store";

const ObjectPage = ({ onClose }) => {
  const objectId = useSelector(getOpenObjectPageId());
  const object = useSelector(getObjectById(objectId));
  const isLoading = useSelector(getObjectsLoadingStatus());
  console.log("object", object);
  

  const address = `${object?.location?.city}, ${object?.location?.address}`;
  const latitude = object?.location?.latitude || null;
  const longitude = object?.location?.longitude || null;
  const mapZoom = object?.location?.zoom || null;
  const center = [latitude, longitude];

  const dispatch = useDispatch();

  const handleOpenEditObject = () => {
    dispatch(setUpdateObjectId(objectId));
    dispatch(setUpdateObjectOpenState(true));
  };

  return (
    <Box>
      <Header
        object={object}
        isLoading={isLoading}
        onClose={onClose}
        onEdit={handleOpenEditObject}
      />
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
      <FooterButtons
        isLoading={isLoading}
        onClose={onClose}
        onEdit={handleOpenEditObject}
      />
    </Box>
  );
};

export default ObjectPage;
