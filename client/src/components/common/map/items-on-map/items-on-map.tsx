import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, styled } from "@mui/material";
// components
import Loader from "../../loader/loader";
// yandex map
import targetDefault from "@assets/map/target.png";
import {
  Map,
  Placemark,
  Clusterer,
  FullscreenControl
} from "@pbe/react-yandex-maps";
import target_cluster from "@assets/map/target_cluster.png";
// styles
import "./styles.css";
import { citiesArray } from "@data/cities";

const MapContainer = styled(Box)`
  height: 350px;
  display: flex;
  background: gray;
  margin-bottom: 20px;
`;

const ItemsOnMap = ({
  items,
  baloon,
  isLoading,
  onClick,
  target = targetDefault,
  targetCluster = target_cluster
}) => {
  const [activePortal, setActivePortal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const center = [citiesArray[1].longitude, citiesArray[1].latitude];
  // const center = [55.755167662127775, 37.61892916430014];
  // const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;
  const clustererInstanceRef = useRef(null);

  const handleFullscreenClick = () => {
    setIsFullscreen(!isFullscreen);
  };

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
    <MapContainer sx={{ width: !isFullscreen ? "100%" : "calc(100% - 86px)" }}>
      {!isLoading ? (
        <Map
          width="100%"
          height="100%"
          defaultState={{
            center: center,
            zoom: mapZoom,
            controls: ["zoomControl", "searchControl"]
          }}
          modules={[
            "geoObject.addon.balloon",
            "geoObject.addon.hint",
            "control.ZoomControl",
            "control.SearchControl",
            "clusterer.addon.balloon"
          ]}
        >
          <FullscreenControl
            options={{
              float: "right"
            }}
            onClick={handleFullscreenClick}
          />
          <Clusterer
            instanceRef={(ref) => (clustererInstanceRef.current = ref)}
            options={{
              suppressMapOpenBlock: true,
              clusterIcons: [
                {
                  href: targetCluster,
                  size: [50, 50],
                  offset: [-25, -25]
                }
              ],
              groupByCoordinates: false,
              hasBalloon: true
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
                  iconImageOffset: [-20, -40]
                }}
                geometry={
                  item.latitude && item.longitude
                    ? [item.latitude, item.longitude]
                    : null
                }
                properties={{
                  hintContent: `${item?.city}, ${item?.address}`,
                  balloonContentBody: '<div id="baloon" class="baloon"></div>',
                  clusterCaption: dayjs(item?.created_at).format("DD.MM.YY")
                }}
                onClick={() => {
                  setTimeout(() => {
                    onClick(item?._id);
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
