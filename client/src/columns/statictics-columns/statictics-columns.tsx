import "dayjs/locale/ru";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import customParseFormat from "dayjs/plugin/customParseFormat";
// components
import TableCellStatisticsColumns from "./components/table-cell.statictics-columns";
import { useTableHeader } from "@hooks/statictics/use-table-statistics-header";
// utils
import { getWeeklyObjects } from "@utils/objects/get-weekly-objects";
import { getWeeklyPresentations } from "@utils/presentations/get-weekly-presentations";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getPresentationsList } from "@store/presentation/presentations.store";
import { getContactsList } from "@store/contact/contact.store";
import { getWeeklyContacts } from "@utils/contacts/get-weekly-contacts";
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import { AlignCenter } from "@components/common/columns/styled";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import { Typography } from "@mui/material";

dayjs.extend(customParseFormat);
dayjs.locale("ru");

const generateMonthHeaders = () => {
  const currentMonth = dayjs();
  const monthHeaders = [];

  for (let i = 0; i < 6; i++) {
    const month = currentMonth.subtract(i, "month");
    const monthHeader = month.locale("ru").format("MMMM");
    monthHeaders.push({
      accessorFn: (row) => row,
      header: monthHeader,
      cell: () => {
        const objects = useSelector(getObjectsList());
        const presentations = useSelector(getPresentationsList());
        const contacts = useSelector(getContactsList());

        // объекты
        const currentMonthObjects = objects.filter((object) => {
          return dayjs(object.created_at).month() === month.month();
        });
        const objectQuantity = currentMonthObjects;

        // презентации
        const currentMonthPresentations = presentations?.filter(
          (presentation) => {
            return dayjs(presentation.created_at).month() === month.month();
          }
        );
        const presentationsQuantity = currentMonthPresentations;

        // контакты
        const currentMonthContacts = contacts?.filter((contact) => {
          return dayjs(contact.created_at).month() === month.month();
        });
        const contactsQuantity = currentMonthContacts;

        return (
          <TableCellStatisticsColumns
            objects={objectQuantity}
            contacts={contactsQuantity}
            presentations={presentationsQuantity}
          />
        );
      }
    });
  }

  return monthHeaders;
};

export const staticticsColumns = [
  {
    header: "Результат",
    columns: [
      {
        accessorKey: "_id",
        header: "Менеджер",
        enableSorting: false,
        footer: <Typography variant="h3">Итого</Typography>,
        cell: (info) => {
          const userId = info.getValue();
          const { avatarSrc, isLoading } = useGetUserAvatar(userId);
          const getAvatarSrc = () => {
            return isLoading ? null : avatarSrc;
          };
          return (
            <AlignCenter>
              <UserNameWithAvatar
                userId={userId}
                avatarSrc={getAvatarSrc()}
                isLoading={isLoading}
              />
            </AlignCenter>
          );
        }
      },
      {
        accessorFn: (row) => row,
        header: "Позиция",
        enableSorting: false,
        footer: () => {
          return <TableCellStatisticsColumns onlyTitle={true} />;
        },
        cell: () => {
          return <TableCellStatisticsColumns onlyTitle={true} />;
        }
      },
      {
        accessorFn: (row) => row,
        header: "ИТОГО",
        enableSorting: false,
        footer: () => {
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          const currentMonth = dayjs();
          const sixMonthsAgo = currentMonth.subtract(6, "month");

          // объекты
          const currentMonthObjects = objects?.filter((object) => {
            const objectDate = dayjs(object.created_at);
            return (
              objectDate.isAfter(sixMonthsAgo) &&
              objectDate.isBefore(currentMonth)
            );
          });

          // презентации
          const currentMonthPresentations = presentations?.filter(
            (presentation) => {
              const presentationDate = dayjs(presentation.created_at);
              return (
                presentationDate.isAfter(sixMonthsAgo) &&
                presentationDate.isBefore(currentMonth)
              );
            }
          );

          // контакты
          const currentMonthContacts = contacts?.filter((contact) => {
            const contactDate = dayjs(contact.created_at);
            return (
              contactDate.isAfter(sixMonthsAgo) &&
              contactDate.isBefore(currentMonth)
            );
          });

          return (
            <TableCellStatisticsColumns
              objects={currentMonthObjects}
              contacts={currentMonthContacts}
              presentations={currentMonthPresentations}
            />
          );
        },
        cell: (info) => {
          const currentMonth = dayjs();
          const sixMonthsAgo = currentMonth.subtract(6, "month");
          const user = info.getValue();
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          // объекты
          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );
          const currentMonthObjects = currentUserObjects?.filter((object) => {
            const objectDate = dayjs(object.created_at);
            return (
              objectDate.isAfter(sixMonthsAgo) &&
              objectDate.isBefore(currentMonth)
            );
          });

          // презентации
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );
          const currentMonthPresentations = currentUserPresentations?.filter(
            (presentation) => {
              const presentationDate = dayjs(presentation.created_at);
              return (
                presentationDate.isAfter(sixMonthsAgo) &&
                presentationDate.isBefore(currentMonth)
              );
            }
          );

          // контакты
          const currentUserContacts = contacts?.filter(
            (cont) => cont?.userId === user?._id
          );
          const currentMonthContacts = currentUserContacts?.filter(
            (contact) => {
              const contactDate = dayjs(contact.created_at);
              return (
                contactDate.isAfter(sixMonthsAgo) &&
                contactDate.isBefore(currentMonth)
              );
            }
          );

          return (
            <TableCellStatisticsColumns
              objects={currentMonthObjects}
              contacts={currentMonthContacts}
              presentations={currentMonthPresentations}
            />
          );
        }
      }
    ]
  },

  {
    header: "ПОСЛЕДНИЕ 4 НЕДЕЛИ", // Заголовок текущего месяца
    columns: [
      {
        // 4 неделя
        accessorFn: (row) => row,
        header: (() => {
          return useTableHeader(3);
        })(),
        enableSorting: false,
        size: 30,
        footer: () => {
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          const currentDate = dayjs();
          const endOPreviousWeek = currentDate
            .subtract(3, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");
          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          // объекты
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            objects
          );

          // презентации
          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            presentations
          );

          // контакты
          const weeklyContacts = getWeeklyContacts(
            formattedStartDate,
            formattedEndDate,
            contacts
          );

          return (
            <TableCellStatisticsColumns
              objects={weeklyObjects}
              contacts={weeklyContacts}
              presentations={weeklyPresentations}
            />
          );
        },
        cell: (info) => {
          const user = info.getValue();
          const currentDate = dayjs();
          const endOPreviousWeek = currentDate
            .subtract(3, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          // объекты
          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );

          // презентации
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );
          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            currentUserPresentations
          );

          // контакты
          const currentUserContacts = contacts?.filter(
            (pres) => pres?.userId === user?._id
          );
          const weeklyContacts = getWeeklyContacts(
            formattedStartDate,
            formattedEndDate,
            currentUserContacts
          );

          return (
            <TableCellStatisticsColumns
              objects={weeklyObjects}
              contacts={weeklyContacts}
              presentations={weeklyPresentations}
            />
          );
        }
      },
      {
        // 3 неделя
        accessorFn: (row) => row,
        header: (() => {
          return useTableHeader(2);
        })(),
        enableSorting: false,
        size: 30,
        footer: () => {
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          const currentDate = dayjs();
          const endOPreviousWeek = currentDate
            .subtract(2, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");
          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          // объекты
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            objects
          );

          // презентации
          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            presentations
          );

          // контакты
          const weeklyContacts = getWeeklyContacts(
            formattedStartDate,
            formattedEndDate,
            contacts
          );
          return (
            <TableCellStatisticsColumns
              objects={weeklyObjects}
              contacts={weeklyContacts}
              presentations={weeklyPresentations}
            />
          );
        },
        cell: (info) => {
          const currentDate = dayjs();

          const endOPreviousWeek = currentDate
            .subtract(2, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          const user = info.getValue();
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          // объекты
          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );

          // презентации
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );
          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            currentUserPresentations
          );

          // контакты
          const currentUserContacts = contacts?.filter(
            (pres) => pres?.userId === user?._id
          );
          const weeklyContacts = getWeeklyContacts(
            formattedStartDate,
            formattedEndDate,
            currentUserContacts
          );

          return (
            <TableCellStatisticsColumns
              objects={weeklyObjects}
              contacts={weeklyContacts}
              presentations={weeklyPresentations}
            />
          );
        }
      },
      {
        // предыдущая неделя
        accessorFn: (row) => row,
        header: (() => {
          return useTableHeader(1);
        })(),
        enableSorting: false,
        size: 30,
        footer: () => {
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          const currentDate = dayjs();
          const endOPreviousWeek = currentDate
            .subtract(1, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");
          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          // объекты
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            objects
          );

          // презентации
          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            presentations
          );

          // контакты
          const weeklyContacts = getWeeklyContacts(
            formattedStartDate,
            formattedEndDate,
            contacts
          );

          return (
            <TableCellStatisticsColumns
              objects={weeklyObjects}
              contacts={weeklyContacts}
              presentations={weeklyPresentations}
            />
          );
        },
        cell: (info) => {
          const currentDate = dayjs();

          const endOPreviousWeek = currentDate
            .subtract(1, "week")
            .endOf("week");
          const startOPreviousWeek = endOPreviousWeek.subtract(6, "day");

          const formattedStartDate = startOPreviousWeek.format("YYYY-MM-DD");
          const formattedEndDate = endOPreviousWeek.format("YYYY-MM-DD");

          const user = info.getValue();
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          // объекты
          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );
          const weeklyObjects = getWeeklyObjects(
            formattedStartDate,
            formattedEndDate,
            currentUserObjects
          );

          // презентации
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );
          const weeklyPresentations = getWeeklyPresentations(
            formattedStartDate,
            formattedEndDate,
            currentUserPresentations
          );

          // контакты
          const currentUserContacts = contacts?.filter(
            (cont) => cont?.userId === user?._id
          );
          const weeklyContacts = getWeeklyContacts(
            formattedStartDate,
            formattedEndDate,
            currentUserContacts
          );

          return (
            <TableCellStatisticsColumns
              objects={weeklyObjects}
              contacts={weeklyContacts}
              presentations={weeklyPresentations}
            />
          );
        }
      },
      {
        // текущая неделя
        accessorFn: (row) => row,
        header: (() => {
          const currentDate = dayjs();
          const startOfWeek = currentDate.startOf("week");
          const endOfWeek = currentDate.endOf("week").day(0);
          const formattedDate = `${startOfWeek.format(
            "DD.MM"
          )} - ${endOfWeek.format("DD.MM")}`;
          return formattedDate;
        })(),
        enableSorting: false,
        size: 30,
        footer: () => {
          const objects = useSelector(getObjectsList());
          const presentations = useSelector(getPresentationsList());
          const contacts = useSelector(getContactsList());

          const currentDate = dayjs();
          const startOfWeek = currentDate.startOf("week");
          const endOfWeek = currentDate.endOf("week").day(0);

          // объекты
          const weeklyObjects = getWeeklyObjects(
            startOfWeek,
            endOfWeek,
            objects
          );

          // презентации
          const weeklyPresentations = getWeeklyPresentations(
            startOfWeek,
            endOfWeek,
            presentations
          );

          // контакты
          const weeklyContacts = getWeeklyContacts(
            startOfWeek,
            endOfWeek,
            contacts
          );

          return (
            <TableCellStatisticsColumns
              objects={weeklyObjects}
              contacts={weeklyContacts}
              presentations={weeklyPresentations}
              isLastWeek={true}
            />
          );
        },
        cell: (info) => {
          const currentDate = dayjs();
          const startOfWeek = currentDate.startOf("week");
          const endOfWeek = currentDate.endOf("week").day(0);

          const user = info.getValue();
          const objects = useSelector(getObjectsList());
          const contacts = useSelector(getContactsList());
          const presentations = useSelector(getPresentationsList());

          // объекты
          const currentUserObjects = objects?.filter(
            (obj) => obj?.userId === user?._id
          );
          const weeklyObjects = getWeeklyObjects(
            startOfWeek,
            endOfWeek,
            currentUserObjects
          );

          // презентации
          const currentUserPresentations = presentations?.filter(
            (pres) => pres?.userId === user?._id
          );
          const weeklyPresentations = getWeeklyPresentations(
            startOfWeek,
            endOfWeek,
            currentUserPresentations
          );

          // контакты
          const currentUserContacts = contacts?.filter(
            (cont) => cont?.userId === user?._id
          );
          const weeklyContacts = getWeeklyContacts(
            startOfWeek,
            endOfWeek,
            currentUserContacts
          );

          return (
            <TableCellStatisticsColumns
              objects={weeklyObjects}
              contacts={weeklyContacts}
              presentations={weeklyPresentations}
              isLastWeek={true}
            />
          );
        }
      }
    ]
  },
  {
    header: "ПОСЛЕДНИЕ 6 МЕСЯЦЕВ",
    columns: generateMonthHeaders()
  }
];
