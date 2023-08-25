import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import dayjs from "dayjs";
// Icons
import target_cluster from "../../../assets/map/target_cluster.png";
import target from "../../../assets/map/target.png";
// store
import {
  getObjectStatusLoading,
  getObjectsStatusList,
} from "../../../store/object-status.store";
import { getUsersList } from "../../../store/users.store";
import { getObjectsList } from "../../../store/objects.store";
import { getWorkingPositionsList } from "../../../store/working-position.store";
import { getSidebarCollapsState } from "../../../store/sidebar-collaps-state.store";
// utils
import { enterPhoneFormat } from "../../../utils/enter-phone-format";
import { FormatDate } from "../../../utils/format-date";

const Component = styled(Box)`
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
`;

const Map = ({ searchedObjects }) => {
  const objects = useSelector(getObjectsList());
  const statuses = useSelector(getObjectsStatusList());
  const users = useSelector(getUsersList());
  const positions = useSelector(getWorkingPositionsList());
  const isLoading = useSelector(getObjectStatusLoading());

  const sidebarCollapsedStatus = useSelector(getSidebarCollapsState());
  const collapsLocalStorageSet = JSON.parse(
    localStorage.getItem("sidebar-collaps-state")
  );
  const [isCollapsed, setIsCollapsed] = useState(collapsLocalStorageSet);

  const getStatus = (id) => {
    return statuses?.find((s) => s._id === id)?.name;
  };
  const getManagerName = (id) => {
    const user = users?.filter((user) => user._id === id);
    const userObject = Object.assign({}, ...user);
    const userName = `${userObject.name?.lastName} ${userObject.name?.firstName} `;

    return userName;
  };

  const getPosition = (id) => {
    if (!id) {
      return "";
    }
    return positions?.find((p) => p._id === id)?.name;
  };

  let mapObjects = null;
  let geoObjects = [];

  function showObjects() {
    mapObjects = new ymaps.Map("map__objects", {
      center: [59.930320630519155, 30.32906024941998],
      zoom: 11,
      controls: ["searchControl",  "zoomControl", "rulerControl"]
    });

    for (let i = 0; i < searchedObjects?.length; i++) {
      
      geoObjects[i] = new ymaps.Placemark(
        [objects[i].location.latitude, objects[i].location.longitude],
        {
          hintContent: [objects[i].location.city, objects[i].location.address],
          clusterCaption: `${dayjs(objects[i].created_at).format("DD.MM.YYYY")}`,
          balloonContent: `
                <div>
                <div><strong>Дата:</strong> ${dayjs(
                  objects[i].created_at
                ).format("DD.MM.YY")}</div>
                <div><strong>Статус:</strong> ${getStatus(
                  objects[i].status
                )}</div>
                    <div><strong>Город:</strong> ${
                      objects[i].location.city
                    }</div>
                    <div><strong>Адрес:</strong> ${
                      objects[i].location.address
                    }</div>
                    <div><strong>Менеджер:</strong> ${getManagerName(
                      objects[i]?.userId
                    )}</div>
                    <hr/>
                    <div><strong>Контакт:</strong> ${
                      objects[i].contact.name
                    }</div>
                    <div><strong>Позиция:</strong> ${getPosition(
                      objects[i].contact.position
                    )}</div>
                    <div><strong>Телефон:</strong> ${enterPhoneFormat(
                      objects[i].contact.phone
                    )}</div> 
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
