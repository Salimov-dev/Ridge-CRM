// libraries
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import XLSX from "xlsx/dist/xlsx.full.min.js";
// components
import MeetingBaloon from "../../components/UI/maps/meeting-baloon";
import MeetingsFiltersPanel from "../../components/UI/filters-panels/meetings-filters-panel";
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import CreateMeetingButton from "../../components/UI/dialogs/buttons/create-meeting-button";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import MeetingUpdateDialog from "../../components/UI/dialogs/meetings/meeting-update-dialog";
import MeetingCreateDialog from "../../components/UI/dialogs/meetings/meeting-create-dialog";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
// hooks
import useSearchMeeting from "../../hooks/meeting/use-search-meeting";
// icons
import target from "../../assets/map/target_meeting.png";
import targetCluster from "../../assets/map/targeMeeting_cluster.png";
// columns
import { meetingsColumns } from "../../columns/meetings-columns/meetings-columns";
import { meetingsCuratorColumns } from "../../columns/meetings-columns/meetings-columns-curator";
// store
import { getMeetingStatusesList } from "../../store/meeting/meeting-status.store";
import { getMeetingTypesList } from "../../store/meeting/meeting-types.store";
import {
  getMeetingById,
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../store/user/users.store";

const initialState = {
  meetingsActivity: "",
  result: "",
  selectedUsers: [],
  selectedStatuses: [],
  selectedTypes: [],
  startDate: null,
  endDate: null,
};

const Meetings = () => {
  const [selectedMeetingBaloon, setSelectedMeetingBaloon] = useState(null);

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
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const columns = isCurator ? meetingsCuratorColumns : meetingsColumns;
  const meetings = useSelector(getMeetingsList());
  const meetingStatuses = useSelector(getMeetingStatusesList());
  const meetingsTypes = useSelector(getMeetingTypesList());
  const selectedMeeting = useSelector(getMeetingById(selectedMeetingBaloon));
  const searchedMeetings = useSearchMeeting(meetings, data);
  const sortedMeetings = orderBy(searchedMeetings, ["date"], ["asc"]);

  const isLoading = useSelector(getMeetingLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

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
        reset={reset}
        isInputEmpty={isInputEmpty}
        initialState={initialState}
        button={<CreateMeetingButton />}
      />
      <ItemsOnMap
        items={searchedMeetings}
        onClick={setSelectedMeetingBaloon}
        baloon={<MeetingBaloon meeting={selectedMeeting} />}
        isLoading={isLoading}
        target={target}
        targetCluster={targetCluster}
      />
      <MeetingsFiltersPanel
        data={data}
        meetings={meetings}
        statuses={meetingStatuses}
        types={meetingsTypes}
        register={register}
        setValue={setValue}
        isCurator={isCurator}
        isLoading={isLoading}
      />
      <BasicTable
        items={sortedMeetings}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <MeetingCreateDialog />
      <MeetingUpdateDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Meetings;
