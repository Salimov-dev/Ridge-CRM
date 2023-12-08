// libraries
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Tooltip, Typography } from "@mui/material";
// components
import { AlignCenter } from "../../components/common/columns/styled";
import RedirectButton from "../../components/common/buttons/redirect-button";
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
// utils
import { FormatDate } from "../../utils/date/format-date";
// icons
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// store
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getUserDataById,
} from "../../store/user/users.store";
import {
  getOpenObjectPageOpenState,
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../store/object/open-object-page.store";
import { getObjectById } from "../../store/object/objects.store";
import { getPresentationStatusNameById } from "../../store/presentation/presentation-status.store";
import { getPresentationById } from "../../store/presentation/presentations.store";
import {
  setUpdatePresentationId,
  setUpdatePresentationOpenState,
} from "../../store/presentation/update-presentation.store";
import UserNameWithAvatar from "../../components/common/table/helpers/user-name-with-avatar";
import useGetUserAvatar from "../../hooks/user/use-get-user-avatar";

export const presentationsCuratorColumns = [
  {
    accessorKey: "created_at",
    header: "Дата",
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    },
  },
  {
    accessorKey: "objectId",
    header: "Объект презентации",
    cell: (info) => {
      const objectId = info.getValue();
      const object = useSelector(getObjectById(objectId));
      const fullAddress = `${object?.location.city}, ${object?.location.address}`;
      const isObjectPage = useSelector(getOpenObjectPageOpenState());
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch<any>(setOpenObjectPageId(objectId));
        dispatch<any>(setOpenObjectPageOpenState(true));
      };

      return objectId ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {fullAddress}
          {!isObjectPage && objectId ? (
            <RedirectButton
              text="Открыть"
              color="neutral"
              onClick={handleClick}
            />
          ) : null}
        </Box>
      ) : (
        <AlignCenter>-</AlignCenter>
      );
    },
  },
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
    accessorKey: "userId",
    header: "Менеджер",
    cell: (info) => {
      const userId = info.getValue();
      const getAvatarSrc = () => {
        const { avatarSrc, isLoading } = useGetUserAvatar(userId);
        return isLoading ? null : avatarSrc;
      };
      return <UserNameWithAvatar userId={userId}  avatarSrc={getAvatarSrc()} isLoading={isLoading}/>;
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

      const handleClick = () => {
        dispatch<any>(setUpdatePresentationId(presentationId));
        dispatch<any>(setUpdatePresentationOpenState(true));
      };

      return isAuthorEntity ? (
        <MultiColorContainedButton
          text="Править"
          fontColor="white"
          background="SaddleBrown"
          backgroudHover="Chocolate"
          onClick={handleClick}
        />
      ) : (
        <MultiColorContainedButton
          text="Согласовать"
          fontColor="white"
          background="Brown"
          backgroudHover="Maroon"
          onClick={handleClick}
        />
      );
    },
  },
];
