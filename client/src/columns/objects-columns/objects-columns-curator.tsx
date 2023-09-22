import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { Box, Button, Tooltip, Typography } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// utils
import { FormatDate } from "../../utils/date/format-date";
// components
import Flags from "../../components/common/columns/flags";
import { AlignCenter } from "../../components/common/columns/styled";
import EmptyTd from "../../components/common/columns/empty-td";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import {
  FormatDistrict,
  FormatManagerName,
  FormatMetro,
  FormatObjectStatus,
  FormatPhone,
} from "../../components/common/table/helpers/helpers";
// store
import { getLastContactsByObjectId } from "../../store/last-contact/last-contact.store";
import { getTasksByObjectId } from "../../store/task/tasks.store";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../store/object/open-object-page.store";
import {
  getMeetingsByObjectId,
  getObjectMeetingsList,
} from "../../store/meeting/meetings.store";

export const objectsColumnsCurator = [
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
          const meetings = useSelector(getObjectMeetingsList(objectId));
          const tasks = useSelector(getTasksByObjectId(objectId));
          const lastContacts = useSelector(getLastContactsByObjectId(objectId));
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
                <Typography>{object?.location?.address}</Typography>
                <Flags
                  meetings={meetings}
                  tasks={tasks}
                  lastContacts={lastContacts}
                />
              </Box>
            );
          } else return null;
        },
      },
    ],
  },
  {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "contact.phone",
        header: "Телефон",
        cell: (info) => {
          const phone = info.getValue();
          return phone ? (
            <AlignCenter>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                {FormatPhone(phone)}
              </Typography>
            </AlignCenter>
          ) : (
            <EmptyTd />
          );
        },
      },
      {
        accessorKey: "contact.name",
        header: "Имя",
        cell: (info) => {
          const name = info.getValue();
          return name ? <AlignCenter>{name}</AlignCenter> : <EmptyTd />;
        },
      },
    ],
  },
  {
    header: "Последние контакты",
    columns: [
      {
        accessorFn: (row) => row,
        header: "Встреча",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const objectMeetings = useSelector(getMeetingsByObjectId(objectId));
          const isObjectMeetings = Boolean(objectMeetings?.length);
          const sortedObjectMeetings = orderBy(
            objectMeetings,
            ["date"],
            ["asc"]
          );
          const lastMeeting =
            sortedObjectMeetings[sortedObjectMeetings?.length - 1];
          const dateOfLastMeeting = FormatDate(lastMeeting?.date);

          return isObjectMeetings ? (
            <AlignCenter>{dateOfLastMeeting}</AlignCenter>
          ) : (
            <AlignCenter>-</AlignCenter>
          );
        },
      },
      {
        accessorFn: (row) => row,
        header: "Звонок",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const lastContacts = useSelector(getLastContactsByObjectId(objectId));
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
    header: "Другое",
    columns: [
      {
        accessorKey: "userId",
        header: "Менеджер",
        cell: (info) => {
          const userId = info.getValue();
          return <AlignCenter>{FormatManagerName(userId)}</AlignCenter>;
        },
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          return <AlignCenter>{FormatObjectStatus(status)}</AlignCenter>;
        },
      },
      {
        accessorKey: "cloudLink",
        header: "Облако",
        cell: (info) => {
          const cloudLink = info.getValue();

          const handleOpenCloud = () => {
            const cloudLink = info.getValue();

            if (cloudLink) {
              window.open(cloudLink, "_blank"); // Открывает ссылку в новой вкладке браузера
            }
          };
          return cloudLink?.length ? (
            <AlignCenter>
              <Tooltip title="Открыть облако" placement="top-start" arrow>
                <Button onClick={handleOpenCloud}>
                  <CloudDoneIcon />
                </Button>
              </Tooltip>
            </AlignCenter>
          ) : (
            <AlignCenter>
              <Tooltip title="Облако отсутствует" placement="top-start" arrow>
                <CloudOffIcon />
              </Tooltip>
            </AlignCenter>
          );
        },
      },
      {
        accessorKey: "_id",
        header: "Объект",
        enableSorting: false,
        cell: (info) => {
          const objectId = info.getValue();
          const dispatch = useDispatch();

          const handleClick = () => {
            dispatch(setOpenObjectPageId(objectId));
            dispatch(setOpenObjectPageOpenState(true));
          };

          return (
            <MultiColorContainedButton
              background="seaGreen"
              backgroudHover="green"
              fontColor="white"
              text="Открыть"
              onClick={handleClick}
            />
          );
        },
      },
    ],
  },
];
