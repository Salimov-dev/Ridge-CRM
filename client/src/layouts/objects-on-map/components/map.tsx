import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import dayjs from "dayjs";
// Icons
import target_cluster from "../assets/target_cluster.png";
import target from "../assets/target.png";
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
import { makeDigitSeparator } from "../../../utils/make-digit-separator";

const Component = styled(Box)`
  // width: 99%;
  height: 500px;
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
  const getUserName = (id) => {
    return users?.find((u) => u._id === id)?.name;
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
    });

    for (let i = 0; i < searchedObjects?.length; i++) {
      geoObjects[i] = new ymaps.Placemark(
        [objects[i].location.latitude, objects[i].location.longitude],
        {
          hintContent: [objects[i].location.city, objects[i].location.address],
          clusterCaption: `${dayjs(objects[i].date).format("DD.MM.YYYY")}`,
          balloonContent: `
                <div>
                <div style={{marginBottom:'10px'}}><a class="btn btn-warning btn-sm" href=/objects/${
                  objects[i]._id
                }>Перейти в объект</a></div>
                <div><strong>Статус:</strong> ${getStatus(
                  objects[i].status
                )}</div>
                    <div><strong>Город:</strong> ${
                      objects[i].location.city
                    }</div>
                    <div><strong>Адрес:</strong> ${
                      objects[i].location.address
                    }</div>
                    <div><strong>Менеджер:</strong> ${getUserName(
                      objects[i].userId
                    )}</div>
                    <hr/>
                    <div><strong>Общая площадь:</strong> ${makeDigitSeparator(
                      objects[i].estateOptions.totalSquare
                    )}м²</div>
                    <div><strong>Площадь аренды:</strong> ${makeDigitSeparator(
                      objects[i].estateOptions.rentSquare
                    )}м²</div>
                    <div><strong>Сумма аренды:</strong> ${makeDigitSeparator(
                      objects[i].estateOptions.rentPrice
                    )}руб.</div>
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
                    <hr/>
                    <div><strong>Описание:</strong> ${
                      objects[i].description.fullDescription
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
