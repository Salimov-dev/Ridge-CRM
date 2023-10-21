// libraries
import { useDispatch, useSelector } from "react-redux";
// components
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import {
  FormatPhone,
  UserAvatar,
} from "../../components/common/table/helpers/helpers";
// mock
import { gendersArray } from "../../mock/genders";
// store
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getUserNameById,
} from "../../store/user/users.store";
import { getUserStatusNameById } from "../../store/user/user-statuses.store";
// utils
import { FormatDate } from "../../utils/date/format-date";
import {
  setUpdateManagerId,
  setUpdateManagerOpenState,
} from "../../store/user/update-user.store";
import { AlignCenter } from "../../components/common/columns/styled";
import Loader from "../../components/common/loader/loader";
import RedirectButton from "../../components/common/buttons/redirect-button";
import {
  loadOpenObjectPageOpenState,
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../store/object/open-object-page.store";
import { getObjectById } from "../../store/object/objects.store";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { getPresentationStatusNameById } from "../../store/presentation/presentation-status.store";
import { getPresentationById } from "../../store/presentation/presentations.store";
import { setUpdatePresentationId, setUpdatePresentationOpenState } from "../../store/presentation/update-presentation.store";

export const presentationsColumns = [
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
      const isObjectPage = useSelector(loadOpenObjectPageOpenState());
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
      const presentation = useSelector(getPresentationById(presentationId))
      const currentUserId = useSelector(getCurrentUserId())
      const isAuthorEntity = useSelector(
        getIsUserAuthorThisEntity(currentUserId, presentation)
      );

      const handleClick = () => {
        dispatch<any>(setUpdatePresentationId(presentationId));
        dispatch<any>(setUpdatePresentationOpenState(true));
      };

      return (
        <MultiColorContainedButton
          text="Править"
          fontColor="white"
          background="SaddleBrown"
          backgroudHover="Chocolate"
          onClick={handleClick}
          disabled={!isAuthorEntity}
        />
      );
    },
  },
];