import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useMemo } from "react";
import { getObjectsList } from "../../store/object/objects.store";
import { useSelector } from "react-redux";

const useSearchPresentation = (presentations, data) => {
  const objects = useSelector(getObjectsList());

  const searchedPresentations = useMemo(() => {
    let array = presentations;

    const searchObjectsByAddress = (objects, searchTerm) => {
      return objects.filter((obj) => {

        if (obj) {
          const fullAddress = `${obj.city}, ${obj.address}`;
          return fullAddress.toLowerCase().includes(searchTerm);
        }
        return false;
      });
    };

    if (data?.objectAddress?.length && Array.isArray(array)) {
      const searchTerm = data.objectAddress.toLowerCase();

      // Фильтруем объекты по адресу
      const objectsWithMatchingAddress = searchObjectsByAddress(
        objects,
        searchTerm
      );

      // Затем фильтруем презентации по объектам
      array = array.filter((pres) => {
        return objectsWithMatchingAddress.some(
          (obj) => obj._id === pres.objectId
        );
      });
    }

    if (data?.curatorComment?.length && Array.isArray(array)) {
      array = array.filter((pres) =>
        pres.curatorComment
          ?.toLowerCase()
          .includes(data.curatorComment?.toLowerCase())
      );
    }

    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses.includes(obj.status)
      );
    }

    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers?.includes(obj?.userId));
    }

    if (data.startDate && data.endDate) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");

      array = array?.filter((obj) => {
        const objDate = dayjs(obj.created_at);
        return objDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (data.startDate) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((obj) => dayjs(obj.created_at) >= selectedDate);
    } else if (data.endDate) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((obj) => dayjs(obj?.created_at) <= endDate);
    }

    return array;
  }, [data, presentations]);

  return searchedPresentations;
};

export default useSearchPresentation;
