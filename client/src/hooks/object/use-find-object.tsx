import { useEffect, useState } from "react";

const useFindObject = () => {
  const [findedObject, setFindedObject] = useState({});
  const isEmptyFindedObject = Object.keys(findedObject).length === 0;

  const init = () => {
    const myMap = new ymaps.Map(
      "findObject",
      {
        center: [59.927702320754996, 30.337777413480463],
        zoom: 12,
        controls: ["searchControl", "zoomControl", "rulerControl"],
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

    let myPlacemark;

    myMap.events.add("click", (e) => {
      const coords = e.get("coords");

      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      } else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);

        myPlacemark.events.add("dragend", () => {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });

    const createPlacemark = (coords) => {
      return new ymaps.Placemark(
        coords,
        {
          iconCaption: "поиск...",
        },
        {
          preset: "islands#violetDotIconWithCaption",
          draggable: true,
        }
      );
    };

    const getAddress = (coords) => {
      myPlacemark.properties.set("iconCaption", "поиск...");
      ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);

        myPlacemark.properties.set({
          iconCaption: [
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(", "),
          balloonContent: firstGeoObject.getAddressLine(),
        });
        setFindedObject(firstGeoObject.properties.getAll());
      });
    };
  };

  const getCity = () => {
    if (isEmptyFindedObject) {
      return null;
    }
    const addressComponents =
      findedObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components ||
      [];

    const localityObject = addressComponents.find(
      (item) => item.kind === "locality"
    );
    if (localityObject) {
      return localityObject.name;
    }

    const lastAreaObject = addressComponents.reduce((last, current) => {
      if (current.kind === "area") {
        return current;
      }
      return last;
    }, null);
    if (lastAreaObject) {
      return lastAreaObject.name;
    }

    return null;
  };

  const getAddress = () => {
    if (isEmptyFindedObject) {
      return null;
    }
    return findedObject.name;
  };

  const getLatitudeCoordinates = () => {
    const [firstPoint, secondPoint] = findedObject?.boundedBy || [];
    const latitudeSum = (firstPoint?.[0] || 0) + (secondPoint?.[0] || 0);
    return latitudeSum / 2;
  };

  const getLongitudeCoordinates = () => {
    const [firstPoint, secondPoint] = findedObject?.boundedBy || [];
    const longitudeSum = (firstPoint?.[1] || 0) + (secondPoint?.[1] || 0);
    return longitudeSum / 2;
  };

  useEffect(() => {
    ymaps.ready(init);
  }, []);

  return {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  };
};

export default useFindObject;