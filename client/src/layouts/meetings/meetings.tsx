// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// components
import Baloon from "./map/baloon";
import FilterPanel from "./components/filter-panel";
import { meetingsColumns } from "./table/meetings-columns";
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import CreateMeeting from "../../components/pages/create-meeting/create-meeting";
import UpdateMeeting from "../../components/pages/update-meeting/update-meeting";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
// hooks
import useMeetings from "../../hooks/use-meetings";
import useSearchMeeting from "../../hooks/use-search-meeting";
// icons
import target from "../../assets/map/target_meeting.png";
import targetCluster from "../../assets/map/targeMeeting_cluster.png";
// store
import {
  getMeetingById,
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meeting/meetings.store";
import { setUpdateMeetingOpenState } from "../../store/meeting/update-meeting.store";

const initialState = {
  startDate: null,
  endDate: null,
  selectedUsers: [],
  selectedStatuses: [],
  selectedTypes: [],
};

const Meetings = () => {
  const [selectedBaloon, setSelectedBaloon] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const meetings = useSelector(getMeetingsList());
  const columns = meetingsColumns;
  const selectedMeeting = useSelector(getMeetingById(selectedBaloon));
  const isLoading = useSelector(getMeetingLoadingStatus());
  const localStorageState = JSON.parse(
    localStorage.getItem("search-meetings-data")
  );

  const {
    isOpenUpdate,
    center,
    mapZoom,
    handleOpenCreate,
    handleCloseCreate,
    handleCloseUpdate,
  } = useMeetings(setOpenCreate, setUpdateMeetingOpenState);

  const formatedState = {
    ...localStorageState,
    startDate: localStorageState?.startDate
      ? dayjs(localStorageState?.startDate)
      : null,
    endDate: localStorageState?.endDate
      ? dayjs(localStorageState?.endDate)
      : null,
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState) ? formatedState : initialState,
    mode: "onBlur",
  });

  const data = watch();
  const searchedMeetings = useSearchMeeting({
    meetings,
    data,
  });
  const sortedMeetings = orderBy(searchedMeetings, ["date"], ["asc"]);
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-meetings-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-meetings-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("search-meetings-data", JSON.stringify(data));
  }, [data]);

  return (
    <Box>
      <LayoutTitle title="Встречи" />

      <AddAndClearFiltersButton
        title="Добавить встречу"
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
        disabled={isLoading ? true : false}
        onOpen={handleOpenCreate}
      />

      <ItemsOnMap
        items={searchedMeetings}
        mapZoom={mapZoom}
        hintContent={(item) =>
          `${item?.location?.city}, ${item?.location?.address}`
        }
        center={center}
        onClick={setSelectedBaloon}
        baloon={<Baloon meeting={selectedMeeting} />}
        isLoading={isLoading}
        target={target}
        targetCluster={targetCluster}
      />

      <FilterPanel
        data={data}
        register={register}
        setValue={setValue}
        isLoading={isLoading}
      />

      <BasicTable
        items={sortedMeetings}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <DialogStyled
        component={<CreateMeeting onClose={handleCloseCreate} />}
        onClose={handleCloseCreate}
        open={openCreate}
      />

      <DialogStyled
        component={<UpdateMeeting onClose={handleCloseUpdate} />}
        onClose={handleCloseUpdate}
        open={isOpenUpdate}
        fullWidth={false}
      />
    </Box>
  );
};

export default Meetings;
