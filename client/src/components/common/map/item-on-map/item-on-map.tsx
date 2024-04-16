// MUI
import { Box, styled } from "@mui/material";
// components
import Loader from "@components/common/loader/loader";
// yandex map
import { Map, Placemark } from "@pbe/react-yandex-maps";
import target from "@assets/map/target.png";
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

const ItemOnMap = ({ hintContent, center, mapZoom, isLoading }) => {
  return (
    <MapContainer>
      {!isLoading ? (
        <Map
          style={{ width: "100%" }}
          defaultState={{
            center: center,
            zoom: mapZoom,
            controls: ["zoomControl", "searchControl"]
          }}
          modules={[
            "geoObject.addon.hint",
            "control.ZoomControl",
            "control.SearchControl"
          ]}
          options={{
            suppressMapOpenBlock: true
          }}
        >
          <Placemark
            modules={["geoObject.addon.hint"]}
            options={{
              iconLayout: "default#image",
              iconImageHref: target,
              iconImageSize: [40, 40],
              iconImageOffset: [-20, -40]
            }}
            geometry={center}
            properties={{
              hintContent: hintContent
            }}
          />
        </Map>
      ) : (
        <Loader />
      )}
    </MapContainer>
  );
};

export default ItemOnMap;
