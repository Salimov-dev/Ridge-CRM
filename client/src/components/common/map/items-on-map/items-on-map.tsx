import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// MUI
import { Box, styled } from "@mui/material";
// components
import Loader from "../../../common/loader/loader";
// yandex map
import { Map, Placemark } from "@pbe/react-yandex-maps";
import target from "../../../../assets/map/target.png";
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
}) => {
  const [activePortal, setActivePortal] = useState(false);

  const Portal = ({ children, getHTMLElementId }) => {
    // находим искомый HTML по id
    const mount = document.getElementById(getHTMLElementId);
    // создаём свой div
    const el = document.createElement("div");

    useEffect(() => {
      // добавляем свой див к искомому элементу
      if (mount) mount.appendChild(el);
      return () => {
        // удаляем элемент от искомого при завершении компоненты
        if (mount) mount.removeChild(el);
      };
    }, [el, mount]);

    // отменяем отрисовку при отсутствии искомого элемента
    if (!mount) return null;
    // собственно, пририсовываем React-элемент в div к искомому HTML
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
              balloonContent: '<div id="baloon" class="baloon"></div>',
            }}
            onClick={() => {
              // ставим в очередь промисов, чтобы сработало после отрисовки балуна
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

export default ItemsOnMap;
