import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// MUI
import { Box, styled } from "@mui/material";
// components
import Loader from "../../loader/loader";
// yandex map
import targetDefault from "../../../../assets/map/target.png";
import { Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import target_cluster from "../../../../assets/map/target_cluster.png";
// styles
import "./styles.css";
import ObjectBaloon from "../../../UI/maps/object-baloon";

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
  target = targetDefault,
  targetCluster = target_cluster,
}) => {
  const [activePortal, setActivePortal] = useState(false);
  const clustererInstanceRef = useRef(null);

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
            "clusterer.addon.balloon",
          ]}
        >
          <Clusterer
            instanceRef={(ref) => (clustererInstanceRef.current = ref)}
            // onBalloonOpen={(e) => {
            //   console.log(e?.get("cluster")?.properties?.get("geoObjects"));
            // }}
            // onMouseEnter={(e) => {
            //   console.log("click");
              
            //   // e.get("target").options.set("balloonLayout", ObjectBaloon);
            //   // setActivePortal(false);
            // }}
            options={{
              clusterIcons: [
                {
                  href: targetCluster,
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
                  balloonContentBody: '<div id="baloon" class="baloon"></div>',
                  clusterCaption: dayjs(item?.created_at).format("DD.MM.YY"),
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
