// libraries
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Tooltip, Typography } from "@mui/material";
// components
import { AlignCenter } from "@components/common/columns/styled";
import RedirectButton from "@components/common/buttons/redirect-button";
import ButtonStyled from "@components/common/buttons/button-styled";
import UserNameWithAvatar from "@components/common/table/helpers/user-name-with-avatar";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// icons
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// utils
import { FormatDate } from "@utils/date/format-date";
// store
import { getObjectById } from "@store/object/objects.store";
import { getPresentationStatusNameById } from "@store/presentation/presentation-status.store";
import { getPresentationById } from "@store/presentation/presentations.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
} from "@store/user/users.store";

export const presentationsColumns = (
  handleOpenObjectPage,
  handleOpenUpdatePresentationPage,
  isDialogPage,
  isCurator
) => {
  let columns = [];

  const firstColumns = {
    accessorKey: "created_at",
    header: "Дата",
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    },
  };

  const objectColumn = {
    accessorKey: "objectId",
    header: "Объект презентации",
    cell: (info) => {
      const objectId = info.getValue();
      const object = useSelector(getObjectById(objectId));
      const fullAddress = `${object?.location.city}, ${object?.location.address}`;

      return objectId ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {fullAddress}
          {!isDialogPage && objectId ? (
            <RedirectButton
              text="Открыть"
              color="neutral"
              onClick={() => handleOpenObjectPage(objectId)}
            />
          ) : null}
        </Box>
      ) : (
        <AlignCenter>-</AlignCenter>
      );
    },
  };

  const managerColumns = {
    accessorKey: "userId",
    header: "Менеджер",
    cell: (info) => {
      const userId = info.getValue();
      const { avatarSrc, isLoading } = useGetUserAvatar(userId);
      const getAvatarSrc = () => {
        return isLoading ? null : avatarSrc;
      };
      return (
        <UserNameWithAvatar
          userId={userId}
          avatarSrc={getAvatarSrc()}
          isLoading={isLoading}
        />
      );
    },
  };

  const otherColumn = [
    {
      accessorKey: "status",
      header: "Статус рассмотрения",
      cell: (info) => {
        const status = info.getValue();
        const name = useSelector(getPresentationStatusNameById(status));
        return <AlignCenter>{name}</AlignCenter>;
      },
    },
    {
      accessorKey: "curatorComment",
      header: "Комментарий Куратора",
      cell: (info) => {
        const curatorComment = info.getValue();
        return curatorComment ? (
          curatorComment
        ) : (
          <Typography sx={{ fontStyle: "italic" }}>
            Дождитесь итогов согласования
          </Typography>
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
                <CloudDoneIcon sx={{ color: "white" }} />
              </Button>
            </Tooltip>
          </AlignCenter>
        ) : (
          <AlignCenter>
            <Tooltip title="Облако отсутствует" placement="top-start" arrow>
              <CloudOffIcon sx={{ color: "white" }} />
            </Tooltip>
          </AlignCenter>
        );
      },
    },
    {
      accessorKey: "_id",
      header: "",
      cell: (info) => {
        const dispatch = useDispatch();
        const presentationId = info.getValue();
        const presentation = useSelector(getPresentationById(presentationId));
        const currentUserId = useSelector(getCurrentUserId());
        const isAuthorEntity = useSelector(
          getIsUserAuthorThisEntity(currentUserId, presentation)
        );

        return (
          <AlignCenter>
            <ButtonStyled
              title="Править"
              style="PRESENTATION"
              disabled={!isAuthorEntity}
              onClick={() => handleOpenUpdatePresentationPage(presentationId)}
            />
          </AlignCenter>
        );
      },
    },
  ];

  if (isCurator) {
    columns = [firstColumns, objectColumn, managerColumns, ...otherColumn];
  } else {
    columns = [firstColumns, objectColumn, ...otherColumn];
  }

  return columns;
};
