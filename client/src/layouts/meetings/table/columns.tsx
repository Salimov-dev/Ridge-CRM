import { FormatManagerName } from "../../../components/common/table/helpers/helpers";
import { FormatDate } from "../../../utils/format-date";
import { FormatTime } from "../../../utils/format-time";

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
          const time = info.getValue();
          return <span>Здесь место</span>;
        },
      },
      {
        accessorKey: "objectId",
        header: "Объект встречи",
        cell: (info) => {
          const objectId = info.getValue();
          return objectId;
        },
      },
      {
        accessorKey: "userId",
        header: "Менеджер",
        cell: (info) => {
          const userId = info.getValue();
          return FormatManagerName(userId);
        },
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          return status;
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
 
];
