import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// data
import { citiesArray } from "@data/cities";
// store
import { getCurrentUserData, getCurrentUserId } from "@store/user/users.store";
import {
  getUserLicensesByUserId,
  updateUserLicense
} from "@store/user/user-license.store";

const useFindObject = () => {
  const dispatch = useDispatch();

  const [findedObject, setFindedObject] = useState({});
  const [errors, setErrors] = useState([]);

  const isEmptyFindedObject = Object.keys(findedObject).length === 0;
  const currentUser = useSelector(getCurrentUserData());
  const userCity = citiesArray.find((city) => city._id === currentUser?.city);
  const center = [userCity?.longitude, userCity?.latitude];

  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));

  const init = () => {
    const myMap = new ymaps.Map(
      "findObject",
      {
        center: center,
        zoom: 12,
        controls: ["searchControl", "zoomControl", "rulerControl"]
      },
      {
        searchControlProvider: "yandex#search",
        suppressMapOpenBlock: true
      }
    );

    let myPlacemark;

    userLicense?.quantityClicksOnMap &&
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
          iconCaption: "поиск..."
        },
        {
          preset: "islands#violetDotIconWithCaption",
          draggable: true
        }
      );
    };

    const getAddress = (coords) => {
      myPlacemark.properties.set("iconCaption", "Определяем адрес...");
      ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        myPlacemark.properties.set({
          iconCaption: [
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ]
            .filter(Boolean)
            .join(", "),
          balloonContent: firstGeoObject.getAddressLine()
        });
        setFindedObject(firstGeoObject.properties.getAll());

        // Вызываем функцию для обратного геокодирования
        reverseGeocode(firstGeoObject.geometry.getCoordinates());
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

  const getDistrict = () => {
    const city = findedObject?.description;

    const district =
      findedObject.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
        ?.AdministrativeArea?.SubAdministrativeArea?.SubAdministrativeAreaName;
    return district ? district : city;
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

  useEffect(() => {
    if (Object.keys(findedObject).length !== 0) {
      const updatedUserLicense = {
        ...userLicense,
        quantityClicksOnMap: userLicense?.quantityClicksOnMap - 1
      };

      dispatch<any>(updateUserLicense(updatedUserLicense))
        .then(() => {})
        .catch((error) => {
          setErrors(error);
          toast.error(error);
        })
        .finally(() => {});
    }
  }, [findedObject]);

  return {
    getCity,
    getDistrict,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject
  };
};

export default useFindObject;
