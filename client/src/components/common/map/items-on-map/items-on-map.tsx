import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// yandex map
import {
  Map,
  Placemark,
  Clusterer,
  FullscreenControl
} from "@pbe/react-yandex-maps";
import target_cluster from "@assets/map/target_cluster.png";
// components
import Loader from "../../loader/loader";
// styles
import "./styles.css";
// data
import { citiesArray } from "@data/cities";
// store
import { getCurrentUserData, getUsersList } from "@store/user/users.store";

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
  targetCluster = target_cluster
}) => {
  const [activePortal, setActivePortal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const usersList = useSelector(getUsersList());
  const currentUser = useSelector(getCurrentUserData());
  const userCity = citiesArray.find((city) => city._id === currentUser?.city);

  const center = [userCity?.longitude, userCity?.latitude];
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

  const getItemImageHref = (item) => {
    const itemUser = usersList?.find((user) => user._id === item?.userId);
    const userItemColor = itemUser?.color;

    // Преобразование компонента LocationIcon в base64
    const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="${userItemColor}" stroke="#141B2D" strokeWidth="2">
          <path d="M12 2c-4.97 0-9 4.03-9 9s9 13 9 13s9-8.45 9-13S16.97 2 12 2zM12 15c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4S14.21 15 12 15z"/>
        </svg>
      `;
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
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
                  iconImageHref: getItemImageHref(item),
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
