import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import Header from "./header/header";
import ObjectInfo from "./object-info/object-info";
import Footer from "./footer/footer";
import ItemOnMap from "@common/map/item-on-map/item-on-map";
// store
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
} from "@store/user/users.store";

const ObjectPage = React.memo(
  ({ objectId, onClose, onEdit, onOpenCreatePresentationPage }) => {
    const object = useSelector(getObjectById(objectId));
    const currentUserId = useSelector(getCurrentUserId());
    const isLoading = useSelector(getObjectsLoadingStatus());
    const isAuthorEntity = useSelector(
      getIsUserAuthorThisEntity(currentUserId, object)
    );

    const address = `${object?.city}, ${object?.address}`;
    const latitude = object?.latitude || null;
    const longitude = object?.longitude || null;
    const mapZoom = object?.zoom || null;
    const center = [latitude, longitude];

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
          objectId={objectId}
          isLoading={isLoading}
          isAuthorEntity={isAuthorEntity}
        />
        <Footer
          object={object}
          onClose={onClose}
          onEdit={onEdit}
          isEdit={true}
          onOpenCreatePresentationPage={onOpenCreatePresentationPage}
          isLoading={isLoading}
          isAuthorEntity={isAuthorEntity}
        />
      </Box>
    );
  }
);

export default ObjectPage;
