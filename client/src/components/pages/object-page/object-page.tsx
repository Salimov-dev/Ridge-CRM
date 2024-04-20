import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import Header from "./header/header";
import ObjectInfo from "./object-info/object-info.page";
import Footer from "./footer/footer";
import ItemOnMap from "@common/map/item-on-map/item-on-map";
// store
import {
  getObjectById,
  getObjectsLoadingStatus
} from "@store/object/objects.store";

const ObjectPage = React.memo(
  ({
    objectId,
    onClose,
    onOpenUpdateObjectPage,
    onOpenCreatePresentationPage,
    setState
  }) => {
    const object = useSelector(getObjectById(objectId));
    const isLoading = useSelector(getObjectsLoadingStatus());

    const address = `${object?.city}, ${object?.address}`;
    const latitude = object?.latitude || null;
    const longitude = object?.longitude || null;
    const mapZoom = object?.zoom || null;
    const center = [latitude, longitude];

    useEffect(() => {
      return () => {
        setState((prevState) => ({
          ...prevState,
          objectId: null
        }));
      };
    }, []);

    return (
      <Box>
        <Header
          object={object}
          onClose={onClose}
          onOpenUpdateObjectPage={onOpenUpdateObjectPage}
          onOpenCreatePresentationPage={onOpenCreatePresentationPage}
        />
        <ItemOnMap
          mapZoom={mapZoom}
          hintContent={address}
          center={center}
          isLoading={isLoading}
        />
        <ObjectInfo object={object} />
        <Footer
          object={object}
          onClose={onClose}
          onOpenUpdateObjectPage={onOpenUpdateObjectPage}
          onOpenCreatePresentationPage={onOpenCreatePresentationPage}
        />
      </Box>
    );
  }
);

export default ObjectPage;
