import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// components
import Header from "./header/header";
import ObjectInfo from "./object-info/object-info";
import FooterButtons from "./footer-buttons/footer-buttons";
import ItemOnMap from "../../common/map/item-on-map/item-on-map";
// store
import { getOpenObjectPageId } from "../../../store/object/open-object-page.store";
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "../../../store/object/objects.store";
import {
  setUpdateObjectId,
  setUpdateObjectOpenState,
} from "../../../store/object/update-object.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
} from "../../../store/user/users.store";
import React from "react";

const ObjectPage = React.memo(({ objectId, onClose, onEdit }) => {
  const dispatch = useDispatch();
  // const objectId = useSelector(getOpenObjectPageId());
  const object = useSelector(getObjectById(objectId));
  const isLoading = useSelector(getObjectsLoadingStatus());

  const currentUserId = useSelector(getCurrentUserId());
  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, object)
  );

  const address = `${object?.location?.city}, ${object?.location?.address}`;
  const latitude = object?.location?.latitude || null;
  const longitude = object?.location?.longitude || null;
  const mapZoom = object?.location?.zoom || null;
  const center = [latitude, longitude];

  const handleOpenEditObject = () => {
    dispatch<any>(setUpdateObjectId(objectId));
    dispatch<any>(setUpdateObjectOpenState(true));
  };



  return (
    <Box>
      <Header
        object={object}
        onClose={onClose}
        onEdit={onEdit}
        isLoading={isLoading}
        isEdit={true}
        isAuthorEntity={isAuthorEntity}
      />
      <ItemOnMap
        mapZoom={mapZoom}
        hintContent={address}
        center={center}
        isLoading={isLoading}
      />
      <ObjectInfo
        object={object}
        isLoading={isLoading}
        isAuthorEntity={isAuthorEntity}
      />
      <FooterButtons
        object={object}
        onClose={onClose}
        onEdit={handleOpenEditObject}
        isEdit={true}
        isLoading={isLoading}
        isAuthorEntity={isAuthorEntity}
      />
    </Box>
  );
});

export default ObjectPage;
