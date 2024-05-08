import "dayjs/locale/ru";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useMemo } from "react";
import { useSelector } from "react-redux";
// interfaces
import { IPresentation } from "@interfaces/presentation/presentation.interface";
import { IObject } from "@interfaces/object/object.interface";
// store
import { getObjectsList } from "@store/object/objects.store";

type IData = Record<string, string | string[] | null>;

interface IUseSearchPresentation {
  presentations: IPresentation[];
  data: IData;
}

const useSearchPresentation = ({
  presentations,
  data
}: IUseSearchPresentation) => {
  const objects: IObject[] = useSelector(getObjectsList());

  const searchedPresentations = useMemo<IPresentation[]>(() => {
    let array = presentations;

    // ПОИСК ПО АДРЕСУ ОБЪЕКТА ИЗ ПРЕЗЕНТАЦИИ
    if (data?.objectAddress?.length && typeof data.objectAddress === "string") {
      const searchObjectsByAddress = (
        objects: IObject[],
        searchTerm: string
      ) => {
        return objects?.filter((obj) => {
          if (obj) {
            const fullAddress = `${obj.city}, ${obj.address}`;
            return fullAddress.toLowerCase().includes(searchTerm);
          }
          return false;
        });
      };

      const searchTerm = data.objectAddress.toLowerCase();

      // Фильтруем объекты по адресу
      const objectsWithMatchingAddress = searchObjectsByAddress(
        objects,
        searchTerm
      );

      // Затем фильтруем презентации по объектам
      array = array?.filter((pres) => {
        return objectsWithMatchingAddress.some(
          (obj) => obj._id === pres.objectId
        );
      });
    }

    // ПОИСК ПО КОММЕНТАРИЮ КУР
    if (data?.curatorComment?.length) {
      array = array.filter((pres) => {
        const searchQuery =
          typeof data.curatorComment === "string" ? data.curatorComment : "";
        pres.curatorComment?.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // ФИЛЬТРАЦИЯ ПО СТАТУСУ ПРЕЗЕНТАЦИИ
    if (data.selectedStatuses?.length) {
      array = array?.filter((pres) =>
        data.selectedStatuses?.includes(pres.status)
      );
    }

    // ФИЛЬТРАЦИЯ ПО МЕНЕДЖЕРУ, создавшему презентацию
    if (data.selectedUsers?.length) {
      array = array?.filter((pres) =>
        data.selectedUsers?.includes(pres?.userId)
      );
    }

    // ФИЛЬТРАЦИЯ ПО ДАТЕ СОЗДАНИЯ ПРЕЗЕНТАЦИИ
    const startDate = dayjs(data.startDate as string);
    const endDate = dayjs(data.endDate as string).endOf("day");

    if (data.startDate && data.endDate) {
      array = array?.filter((obj) => {
        const objectCreatedDate = dayjs(obj.created_at);
        return (
          objectCreatedDate.isAfter(startDate) &&
          objectCreatedDate.isBefore(endDate)
        );
      });
    } else if (data.startDate) {
      array = array?.filter((obj) => dayjs(obj.created_at) >= startDate);
    } else if (data.endDate) {
      array = array?.filter((obj) => dayjs(obj?.created_at) <= endDate);
    }

    return array;
  }, [data, presentations]);

  const sortedSearchedPresentations = useMemo<IPresentation[]>(() => {
    return orderBy(searchedPresentations, ["created_at"], ["desc"]);
  }, [searchedPresentations]);

  return { searchedPresentations: sortedSearchedPresentations };
};

export default useSearchPresentation;
