import { Box, Typography } from "@mui/material";
import { FormatManagerName } from "../../../components/common/table/helpers/helpers";
import { FormatDate } from "../../../utils/format-date";
import { FormatTime } from "../../../utils/format-time";
import { useSelector } from "react-redux";
import { getObjectById } from "../../../store/objects.store";
import TableOpenButton from "../../../components/common/buttons/table-open-button";
import { getMeetingStatusNameById } from "../../../store/meeting-status.store";
import { getMeetingTypeNameById } from "../../../store/meeting-types.store";

export const groupedColumns = [
  {
    accessorKey: "date",
    header: "Дата",
    cell: (info) => {
      const date = info.getValue();
      return FormatDate(new Date(date));
    },
  },
  {
    accessorKey: "time",
    header: "Время",
    cell: (info) => {
      const time = info.getValue();
      return FormatTime(new Date(time));
    },
  },
  {
    accessorKey: "location",
    header: "Место",
    cell: (info) => {
      const location = info.getValue();
      return (
        <Typography>
          {location.city}, {location.address}
        </Typography>
      );
    },
  },
  {
    accessorKey: "meetingType",
    header: "Тип",
    cell: (info) => {
      const type = info.getValue();      
      const name = useSelector(getMeetingTypeNameById(type))
      return name;
    },
  },
  {
    accessorKey: "objectId",
    header: "Объект встречи",
    cell: (info) => {
      const objectId = info.getValue();
      const object = useSelector(getObjectById(objectId));
      const result = `${object?.location.city}, ${object?.location.address}`;

      return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
          {result}{" "}
          <TableOpenButton
            id={objectId}
            nav={`/objects/${objectId}`}
            text="Перейти"
            color="neutral"
          />
        </Box>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: (info) => {
      const status = info.getValue();
      const name = useSelector(getMeetingStatusNameById(status))
      return name;
    },
  },

  {
    accessorKey: "userId",
    header: "Инициатор",
    cell: (info) => {
      const userId = info.getValue();
      return FormatManagerName(userId);
    },
  },
 
  {
    accessorKey: "comment",
    header: "Комментарий",
    cell: (info) => {
      const comment = info.getValue();
      return comment;
    },
  },

  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: (info) => {
      const date = info.getValue();
      return FormatDate(new Date(date));
    },
  },
  {
    accessorKey: "_id",
    header: "",
    cell: (info) => {
      const meetingId = info.getValue();

      return <TableOpenButton id={meetingId} text="Править" />;
    },
  },
];
