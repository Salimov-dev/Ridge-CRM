import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// MUI
import { Box, styled } from "@mui/material";
// components
import Loader from "../../loader/loader";
// yandex map
import { Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import target from "../../../../assets/map/target.png";
import target_cluster from "../../../../assets/map/target_cluster.png";
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

const ItemsOnMap = ({
  items,
  baloon,
  hintContent,
  center,
  mapZoom,
  isLoading,
  onClick,
}) => {
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

    const handleDocumentClick = (event) => {
      if (!el.contains(event.target) && !mount.contains(event.target)) {
        setActivePortal(false);
      }
    };

    useEffect(() => {
      const ymapsBalloonCloseButton = document.querySelector(
        ".ymaps-2-1-79-balloon__close-button"
      );

      if (ymapsBalloonCloseButton) {
        const closeBalloon = () => {
          setActivePortal(false);
        };

        ymapsBalloonCloseButton.addEventListener("click", closeBalloon);

        document.addEventListener("click", handleDocumentClick);

        return () => {
          ymapsBalloonCloseButton.removeEventListener("click", closeBalloon);
          document.removeEventListener("click", handleDocumentClick);
        };
      }
    });

    if (!mount) return null;

    return createPortal(children, el);
  };

  useEffect(() => {
    const ymapsBalloonCloseButton = document.querySelector(
      ".ymaps-2-1-79-balloon__close-button"
    );

    if (ymapsBalloonCloseButton) {
      const closeBalloon = () => {
        setActivePortal(false);
      };

      ymapsBalloonCloseButton.addEventListener("click", closeBalloon);

      return () => {
        ymapsBalloonCloseButton.removeEventListener("click", closeBalloon);
      };
    }
  });

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
          <Clusterer
            options={{
              clusterIcons: [
                {
                  href: target_cluster,
                  size: [50, 50],
                  offset: [-25, -25],
                },
              ],
              groupByCoordinates: false,
            }}
          >
            {items?.map((item) => (
              <Placemark
                key={item._id}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: target,
                  iconImageSize: [40, 40],
                  iconImageOffset: [-20, -40],
                }}
                geometry={
                  item.location?.latitude && item.location?.longitude
                    ? [item.location.latitude, item.location.longitude]
                    : null
                }
                properties={{
                  hintContent: hintContent(item),
                  balloonContent: '<div id="baloon" class="baloon"></div>',
                }}
                onClick={() => {
                  onClick(item._id);
                  setTimeout(() => {
                    setActivePortal(true);
                  }, 0);
                }}
              />
            ))}
          </Clusterer>
        </Map>
      ) : (
        <Loader />
      )}
      {activePortal && <Portal getHTMLElementId="baloon">{baloon}</Portal>}
    </MapContainer>
  );
};

export default ItemsOnMap;
