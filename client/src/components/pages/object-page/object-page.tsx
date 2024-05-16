import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import ObjectInfo from "./object-info/object-info.page";
import ItemOnMap from "@common/map/item-on-map/item-on-map";
import HeaderObjectPage from "./header/header.object-page";
import FooterObjectPage from "./footer/footer.object-page";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import {
  getObjectById,
  getObjectsLoadingStatus
} from "@store/object/objects.store";

interface ObjectPageProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ObjectPage: FC<ObjectPageProps> = React.memo(
  ({ state, setState }): JSX.Element => {
    const objectId = state?.objectId;
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
        <HeaderObjectPage object={object} setState={setState} />
        <ItemOnMap
          mapZoom={mapZoom}
          hintContent={address}
          center={center}
          isLoading={isLoading}
        />
        <ObjectInfo object={object} state={state} />
        <FooterObjectPage object={object} setState={setState} />
      </Box>
    );
  }
);

export default ObjectPage;
