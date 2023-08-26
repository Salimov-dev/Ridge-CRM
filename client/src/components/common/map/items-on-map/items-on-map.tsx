import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// MUI
import { Box, styled } from "@mui/material";
// components
import Loader from "../../loader/loader";
// yandex map
import { Map, Placemark, Clusterer, ObjectManager } from "@pbe/react-yandex-maps";
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
  const MAP_DEFAULT_STATE = {
    center: [55.751574, 37.573856],
    zoom: 5
  };

  const features = items?.map(item => ({
    type: "Feature",
    id: item,
    geometry: {
      type: "Point",
      coordinates: item.location?.latitude && item.location?.longitude
      ? [item.location.latitude, item.location.longitude]
      : null,
    }
  }));
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
           <ObjectManager
          options={{
            clusterize: true,
            gridSize: 32,
          }}
          objects={{
            openBalloonOnClick: true,
            iconLayout: "default#image",
            iconImageHref: target,
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40],
          }}
          clusters={{
            preset: "islands#redClusterIcons",
          }}
          defaultFeatures={features}
          modules={["objectManager.addon.objectsBalloon"]}
        />
          {/* <Clusterer
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
            // onClick={ () => {
            //   // ставим в очередь промисов, чтобы сработало после отрисовки балуна
            //   setTimeout(() => { setActivePortal(true)}, 0)
            //   } } 
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
                  setTimeout(() => {
                    onClick(item?._id);
                    setActivePortal(true);
                  }, 0);
                }}
              />
            ))}
          </Clusterer> */}
        </Map>
      ) : (
        <Loader />
      )}
      {activePortal && <Portal getHTMLElementId="baloon">{baloon}</Portal>}
    </MapContainer>
  );
};

export default ItemsOnMap;
