// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// components
import MeetingBaloon from "../../components/UI/maps/meeting-baloon";
import MeetingsFiltersPanel from "../../components/UI/filters-panels/meetings-filters-panel";
import { meetingsColumns } from "../../columns/meetings-columns/meetings-columns";
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import DialogStyled from "../../components/common/dialog/dialog-styled";
import CreateMeeting from "../../components/pages/create-meeting/create-meeting";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page";
import MeetingUpdateDialog from "../../components/UI/dialogs/meetings/meeting-update-dialog";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
// hooks
import useSearchMeeting from "../../hooks/meeting/use-search-meeting";
// icons
import target from "../../assets/map/target_meeting.png";
import targetCluster from "../../assets/map/targeMeeting_cluster.png";
// store
import {
  getMeetingById,
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meeting/meetings.store";

const initialState = {
  startDate: null,
  endDate: null,
  selectedUsers: [],
  selectedStatuses: [],
  selectedTypes: [],
  selectedDoneMeetTypes: [],
};

const Meetings = () => {
  const [selectedMeetingBaloon, setSelectedMeetingBaloon] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const meetings = useSelector(getMeetingsList());
  const columns = meetingsColumns;
  const selectedMeeting = useSelector(getMeetingById(selectedMeetingBaloon));
  const isLoading = useSelector(getMeetingLoadingStatus());

  const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;
  const localStorageState = JSON.parse(
    localStorage.getItem("search-meetings-data")
  );

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
  const searchedMeetings = useSearchMeeting(meetings, data);
  const sortedMeetings = orderBy(searchedMeetings, ["date"], ["asc"]);
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    localStorage.setItem("search-meetings-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-meetings-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-meetings-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

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
        onClick={setSelectedMeetingBaloon}
        baloon={<MeetingBaloon meeting={selectedMeeting} />}
        isLoading={isLoading}
        target={target}
        targetCluster={targetCluster}
      />

      <MeetingsFiltersPanel
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

      <MeetingUpdateDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Meetings;
