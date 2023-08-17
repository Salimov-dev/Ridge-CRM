import { useEffect, useState } from "react";

const useFindObject = () => {
  const [findedObject, setFindedObject] = useState({});
  const isEmptyFindedObject = Object.keys(findedObject).length;

  function init() {
    var myPlacemark,
      myMap = new ymaps.Map(
        "findObject",
        {
          center: [59.927702320754996, 30.337777413480463],
          zoom: 12,
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

    // Слушаем клик на карте.
    myMap.events.add("click", function (e) {
      var coords = e.get("coords");

      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      }
      // Если нет – создаем.
      else {
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark.events.add("dragend", function () {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
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
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
      myPlacemark.properties.set("iconCaption", "поиск...");
      ymaps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);

        myPlacemark.properties.set({
          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(", "),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine(),
        });
        setFindedObject(firstGeoObject.properties.getAll());
      });
    }
  }

  const getCity = () => {
    if (!isEmptyFindedObject) {
      return null;
    }
    let objectToFind =
      findedObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components;
    const localityObject = objectToFind?.filter((item) => {
      if (item.kind === "locality") return item.name;
    });
    const result = Object.assign({}, ...localityObject);
    return result?.name;
  };

  const getAddress = () => {
    if (!isEmptyFindedObject) {
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
