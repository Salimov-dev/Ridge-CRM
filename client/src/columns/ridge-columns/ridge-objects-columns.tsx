import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";
// MUI
import { Box, Button, Tooltip, Typography } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// components
import EmptyTd from "../../components/common/columns/empty-td";
import { AlignCenter } from "../../components/common/columns/styled";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import Flags from "../../components/common/columns/flags";
import {
  FormatDistrict,
  FormatMetro,
  FormatPhone,
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
                <Flags
                  tasks={tasks}
                  lastContacts={lastContacts}
                  taskBackgroundColor="ForestGreen"
                />
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
      {
        accessorKey: "estateOptions.cadastralNumber",
        header: "Кадастровый №",
        cell: (info) => {
          const cadastralNumber = info.getValue();
          return cadastralNumber?.length ? (
            <AlignCenter>{cadastralNumber}</AlignCenter>
          ) : (
            <AlignCenter>-</AlignCenter>
          );
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
                  <CloudDoneIcon sx={{color: "white"}}/>
                </Button>
              </Tooltip>
            </AlignCenter>
          ) : (
            <AlignCenter>
              <Tooltip title="Облако отсутствует" placement="top-start" arrow>
                <CloudOffIcon sx={{color: "white"}}/>
              </Tooltip>
            </AlignCenter>
          );
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
      {
        accessorKey: "comment",
        header: "Комментарий",
        cell: (info) => {
          const comment = info.getValue();
          const isLongComment = comment && comment.split("\n").length > 2;
          const truncatedComment = isLongComment
            ? comment.slice(0, 90) + "..."
            : comment;
          return comment ? (
            <Typography>{truncatedComment}</Typography>
          ) : (
            <EmptyTd />
          );
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
