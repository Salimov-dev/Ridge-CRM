import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import dayjs from "dayjs";
// Icons
import target_cluster from "../assets/target_cluster.png";
import target from "../assets/target.png";
// store
import { getUsersList } from "../../../store/users.store";
import { getObjectsList } from "../../../store/objects.store";
import { getSidebarCollapsState } from "../../../store/sidebar-collaps-state.store";
import { getMeetingStatusesList } from "../../../store/meeting-status.store";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../../store/meetings.store";
import { getMeetingTypesList } from "../../../store/meeting-types.store";

const Component = styled(Box)`
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
`;

const Map = ({ searchedMeetings }) => {
  const objects = useSelector(getObjectsList());
  const meetings = useSelector(getMeetingsList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const statuses = useSelector(getMeetingStatusesList());
  const users = useSelector(getUsersList());
  const isLoading = useSelector(getMeetingLoadingStatus());

  const sidebarCollapsedStatus = useSelector(getSidebarCollapsState());
  const collapsLocalStorageSet = JSON.parse(
    localStorage.getItem("sidebar-collaps-state")
  );
  const [isCollapsed, setIsCollapsed] = useState(collapsLocalStorageSet);

  const getMeetingTypeName = (id) => {
    const filteredTypes = meetingTypes?.filter((type) => type?._id === id);
    if (filteredTypes && filteredTypes.length > 0) {
      const typeObject = Object.assign({}, ...filteredTypes);
      return typeObject?.name;
    }

    return null;
  };

  const getStatusName = (id) => {
    const filteredStatuses = statuses?.filter((status) => status?._id === id);

    if (filteredStatuses && filteredStatuses?.length > 0) {
      const statusObject = Object.assign({}, ...filteredStatuses);
      return statusObject?.name;
    }

    return null;
  };

  const getManagerName = (id) => {
    const user = users?.filter((user) => user._id === id);
    const userObject = Object.assign({}, ...user);
    const userName = `${userObject.name?.lastName} ${userObject.name?.firstName} `;

    return userName;
  };

  let mapObjects = null;
  let geoObjects = [];

  function showObjects() {
    mapObjects = new ymaps.Map("map__objects", {
      center: [59.930320630519155, 30.32906024941998],
      zoom: 11,
    });

    for (let i = 0; i < searchedMeetings?.length; i++) {
      geoObjects[i] = new ymaps.Placemark(
        [meetings[i]?.location?.latitude, meetings[i]?.location?.longitude],
        {
          hintContent: [
            meetings[i]?.location?.city,
            meetings[i]?.location?.address,
          ],
          clusterCaption: `${dayjs(meetings[i]?.date).format("DD.MM.YYYY")}`,
          balloonContent: `
                <div>
                <div><strong>Дата встречи:</strong> ${dayjs(
                  meetings[i].date
                ).format("DD.MM.YY")}</div>

                <div><strong>Время:</strong> ${dayjs(meetings[i]?.time).format("HH:mm")}</div>

                <div><strong>Адрес:</strong> ${meetings[i]?.location?.city} ${
                  meetings[i]?.location?.address
                }</div>

                <div><strong>Менеджер:</strong> ${getManagerName(
                  meetings[i]?.userId
                )}</div>

                <div><strong>Статус:</strong> ${getStatusName(
                  meetings[i]?.status
                )}</div>
                
                <div><strong>Тип:</strong> ${getMeetingTypeName(
                  meetings[i]?.meetingType
                )}</div>

                <div><strong>Комментарий:</strong> ${
                  meetings[i]?.comment || "-"
                }</div>
                </div>
            `,
        },
        {
          iconLayout: "default#image",
          iconImageHref: target,
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -40],
        }
      );
    }
    const clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: target_cluster,
          size: [50, 50],
          offset: [-25, -25],
        },
      ],
    });
    mapObjects.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
  }

  useEffect(() => {
    setIsCollapsed(sidebarCollapsedStatus);
  }, [sidebarCollapsedStatus]);

  useEffect(() => {
    if (!isLoading) {
      showObjects();
    }
    return () => {
      if (mapObjects) {
        mapObjects.destroy();
        mapObjects = null;
      }
    };
  }, [geoObjects, objects, isCollapsed]);

  return (
    <Component>
      <Box
        className={isCollapsed ? "collapsed" : ""}
        id="map__objects"
        style={{
          height: "100%",
          width: "100%",
          autoFitToViewport: "always",
        }}
      ></Box>
    </Component>
  );
};

export default Map;
