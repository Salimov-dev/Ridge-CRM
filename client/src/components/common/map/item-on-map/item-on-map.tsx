import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// MUI
import { Box, styled } from "@mui/material";
// components
import Loader from "../../loader/loader";
// yandex map
import { Map, Placemark } from "@pbe/react-yandex-maps";
import target from "../../../../assets/map/target.png";
// styles
import "./styles.css";

const MapContainer = styled(Box)`
  width: 100%;
  height: 350px;
  flex: 5;
  display: flex;
  background: gray;
  margin-bottom: 20px;
`;

const ItemOnMap = ({ baloon="", hintContent, center, mapZoom, isLoading }) => {
  const [activePortal, setActivePortal] = useState(false);

  const Portal = ({ children, getHTMLElementId }) => {
    const mount = document.getElementById(getHTMLElementId);
    const el = document.createElement("div");

    useEffect(() => {
      if (mount) mount.appendChild(el);
      return () => {
        if (mount) mount.removeChild(el);
      };
    }, [el, mount]);

    return createPortal(children, el);
  };

  return (
    <MapContainer>
      {!isLoading ? (
        <Map
          style={{ width: "100%" }}
          defaultState={{
            center: center,
            zoom: mapZoom,
            controls: ["zoomControl", "searchControl"],
          }}
          modules={[
            "geoObject.addon.balloon",
            "geoObject.addon.hint",
            "control.ZoomControl",
            "control.SearchControl",
          ]}
        >
          <Placemark
            modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            options={{
              iconLayout: "default#image",
              iconImageHref: target,
              iconImageSize: [40, 40],
              iconImageOffset: [-20, -40],
            }}
            geometry={center}
            properties={{
              hintContent: hintContent,
              // balloonContentBody: '<div id="baloon" class="baloon"></div>',
            }}
            onClick={() => {
              setTimeout(() => {
                setActivePortal(true);
              }, 0);
            }}
          />
        </Map>
      ) : (
        <Loader />
      )}
      {activePortal && <Portal getHTMLElementId="baloon">{baloon}</Portal>}
    </MapContainer>
  );
};

export default ItemOnMap;
