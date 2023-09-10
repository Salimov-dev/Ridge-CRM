import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";
import { Box, Typography } from "@mui/material";
// components
import EmptyTd from "../../components/common/columns/empty-td";
import { AlignCenter } from "../../components/common/columns/styled";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import Flags from "../../components/common/columns/flags";
import {
  FormatDistrict,
  FormatMetro,
} from "../../components/common/table/helpers/helpers";
// utils
import { FormatDate } from "../../utils/date/format-date";
// store
import { getRidgeObjectStatusNameById } from "../../store/ridge-object/ridge-object-status.store";
import { getRidgeLastContactsByObjectId } from "../../store/ridge-last-contact/last-ridge-contact.store";
import { getRidgeTasksByObjectId } from "../../store/ridge-task/ridge-tasks.store";
import {
  setUpdateRidgeObjectId,
  setUpdateRidgeObjectOpenState,
} from "../../store/ridge-object/update-ridge-object.store";

export const ridgeObjectsColumns = [
  {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    },
  },
  {
    header: "Расположение объекта",
    columns: [
      {
        accessorKey: "location.city",
        header: "Город",
        cell: (info) => {
          const city = info.getValue();
          return city;
        },
      },
      {
        accessorKey: "location.district",
        header: "Район",
        cell: (info) => {
          const district = info.getValue();
          return <AlignCenter>{FormatDistrict(district)}</AlignCenter>;
        },
      },
      {
        accessorKey: "location.metro",
        header: "Метро",
        cell: (info) => {
          const metro = info.getValue();
          return metro ? (
            <AlignCenter>{FormatMetro(metro)}</AlignCenter>
          ) : (
            <EmptyTd />
          );
        },
      },
      {
        accessorFn: (row) => row,
        header: "Адрес",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const address = object?.location?.address;

          const tasks = useSelector(getRidgeTasksByObjectId(objectId));
          const lastContacts = useSelector(
            getRidgeLastContactsByObjectId(objectId)
          );

          if (objectId) {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <Typography>{address}</Typography>
                <Flags tasks={tasks} lastContacts={lastContacts} />
              </Box>
            );
          } else return null;
        },
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          const name = useSelector(getRidgeObjectStatusNameById(status));
          return <AlignCenter>{name}</AlignCenter>;
        },
      },
    ],
  },
  {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "findedContacts",
        header: "Найденные контакты",
        cell: (info) => {
          const contacts = info.getValue();
          return contacts ? <Typography>{contacts}</Typography> : <EmptyTd />;
        },
      },
      {
        accessorKey: "comment",
        header: "Комментарий",
        cell: (info) => {
          const comment = info.getValue();
          return comment ? <Typography>{comment}</Typography> : <EmptyTd />;
        },
      },
      {
        accessorFn: (row) => row,
        header: "Звонок",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const lastContacts = useSelector(
            getRidgeLastContactsByObjectId(objectId)
          );
          const sortedLastContacts = orderBy(lastContacts, "date", ["desc"]);
          const isSortedLastContacts = Boolean(sortedLastContacts?.length);

          const dateLastContact = () => {
            if (isSortedLastContacts) {
              const date = FormatDate(sortedLastContacts[0]?.date);
              return date;
            } else {
              return null;
            }
          };

          return isSortedLastContacts ? (
            <AlignCenter>{dateLastContact()}</AlignCenter>
          ) : (
            <EmptyTd />
          );
        },
      },
    ],
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const objectId = info.getValue();
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch(setUpdateRidgeObjectId(objectId));
        dispatch(setUpdateRidgeObjectOpenState(true));
      };
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <MultiColorContainedButton
            text="Открыть"
            fontColor="white"
            background="purple"
            backgroudHover="darkOrchid"
            onClick={handleClick}
          />
        </Box>
      );
    },
  },
];
