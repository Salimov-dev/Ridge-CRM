// Librares
import { useEffect } from "react";
import dayjs from "dayjs";
// Styles
import "./styles.css";
// Icons
import target from "./assets/target.png";
import { useSelector } from "react-redux";
// store
import { getObjectStatusNameById } from "../../../store/object-status.store";
import { getWorkingPositionNameById } from "../../../store/working-position.store";

const ObjectsOnMap = ({ object }) => {
  const latitude = object?.location.latitude;
  const longitude = object?.location.longitude;
  const mapZoom = object?.location.zoom;
  const date = object?.location.date;
  const city = object?.location.city;
  const address = object?.location.address;
  const contactName = object?.contact.name;
  const contactPhone = object?.contact.phone;
  const contactPosition = useSelector(
    getWorkingPositionNameById(object?.contact.position)
  );
  const status = useSelector(getObjectStatusNameById(object?.status));

  const center = [latitude, longitude];
  const zoom = mapZoom;

  let mapObjOnPage = null;

  function showObjOnMap() {
    if (!mapObjOnPage) {
      mapObjOnPage = new ymaps.Map("map-obj", {
        center: center,
        zoom: zoom,
      });
    }

    const placeMark = new ymaps.Placemark(
      center,
      {
        hintContent: `${city}: ${address}`,
        balloonContent: `
            <div>
                <div><strong>Дата добавления:</strong> ${dayjs(date).format(
                  "DD.MM.YYYY"
                )}</div>
                <div><strong>Город:</strong> ${city}</div>
                <div><strong>Адрес:</strong> ${address}</div>
                <div><strong>Статус:</strong> ${status}</div>
                <div><strong>Контактное лицо:</strong> ${contactName}</div>
                <div><strong>Позиция:</strong> ${contactPosition}</div>
                <div><strong>Телефон:</strong> ${contactPhone}</div>
            </div>
        `,
      },
      {
        iconLayout: "default#image",
        iconImageHref: target,
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40],
      }
    );

    mapObjOnPage.geoObjects.add(placeMark);
  }

  useEffect(() => {
    if (latitude && longitude && zoom) {
      ymaps.ready(showObjOnMap);
    }

    return () => {
      if (mapObjOnPage) {
        mapObjOnPage.destroy();
        mapObjOnPage = null;
      }
    };
  }, [latitude, longitude]);

  return <div id="map-obj" className="mapObject__container"></div>;
};

export default ObjectsOnMap;
