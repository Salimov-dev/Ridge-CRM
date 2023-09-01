import { useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const useSearchObject = ({ objects, data }) => {
  const searchedObjects = useMemo(() => {
    let array = objects;

    if (data?.address?.length) {
      array = array?.filter((obj) =>
        obj.location.address.toLowerCase().includes(data.address.toLowerCase())
      );
    }

    if (data?.phone?.length) {
      array = array?.filter((obj) =>
        String(obj.contact.phone).includes(data?.phone)
      );
    }

    if (data?.name?.length) {
      array = array?.filter((obj) =>
        obj?.contact.name.toLowerCase().includes(data?.name.toLowerCase())
      );
    }

    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses.includes(obj.status)
      );
    }

    if (data.selectedMetro?.length) {
      array = array?.filter((obj) =>
        data.selectedMetro.includes(obj.location.metro)
      );
    }

    if (data.onlyWithPhone) {
      array = array?.filter((obj) => obj.contact.phone !== null);
    }

    // Фильтр для выбранных районов и городов
    if (data.selectedDistricts?.length) {
      array = array?.filter((item) =>
        data.selectedDistricts.includes(item.location.district)
      );

      // Обновляем список выбранных городов на основе отфильтрованных районов
      const filteredCities = data.selectedDistricts?.reduce(
        (cities, district) => {
          return cities.concat(
            array
              ?.filter((item) => item.location?.district === district)
              .map((item) => item.location?.city)
          );
        },
        []
      );

      // Фильтруем города исходя из списка отфильтрованных городов
      if (data.selectedCities?.length) {
        array = array?.filter((item) =>
          filteredCities?.includes(item.location.city)
        );
      } else {
        array = array?.filter((item) =>
          data.selectedDistricts?.includes(item.location.district)
        );
      }
    } else if (data.selectedCities?.length) {
      array = array?.filter((item) =>
        data.selectedCities?.includes(item.location?.city)
      );
    }

    if (data.selectedUsers?.length) {
      array = array?.filter((item) =>
        data.selectedUsers?.includes(item?.userId)
      );
    }

    if (data.selectedCurrentRenters?.length) {
      array = array?.filter((item) =>
        data.selectedCurrentRenters?.includes(item?.estateOptions.currentRenters)
      );
    }

    if (data.selectedEstateTypes?.length) {
      array = array?.filter((item) =>
        data.selectedEstateTypes?.includes(item?.estateOptions.estateTypes)
      );
    }
    
    if (data.selectedObjectTypes?.length) {
      array = array?.filter((item) =>
        data.selectedObjectTypes?.includes(item?.estateOptions.objectTypes)
      );
    }

    if (data.startDate && data.endDate) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");

      array = array?.filter((item) => {
        const itemDate = dayjs(item.created_at);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (data.startDate) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((item) => dayjs(item.created_at) >= selectedDate);
    } else if (data.endDate) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((item) => dayjs(item?.created_at) <= endDate);
    }

    return array;
  }, [data, objects]);

  return searchedObjects;
};

export default useSearchObject;
