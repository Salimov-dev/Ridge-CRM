// libraries
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// components
import MeetingBaloon from "@components/UI/maps/meeting-baloon";
import MeetingsFiltersPanel from "@components/UI/filters-panels/meetings-filters-panel";
import BasicTable from "@components/common/table/basic-table";
import HeaderLayout from "@components/common/page-headers/header-layout";
import Buttons from "./components/buttons";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
// hooks
import useSearchMeeting from "@hooks/meeting/use-search-meeting";
// icons
import target from "@assets/map/target_meeting.png";
import targetCluster from "@assets/map/targeMeeting_cluster.png";
// columns
import { meetingsColumns } from "@columns/meetings.columns";
// utils
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getMeetingStatusesList } from "@store/meeting/meeting-status.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getIsUserManager
} from "@store/user/users.store";
import { getMeetingTypesList } from "@store/meeting/meeting-types.store";
import {
  getMeetingById,
  getMeetingLoadingStatus,
  getMeetingsList
} from "@store/meeting/meetings.store";

const initialState = {
  meetingsActivity: "",
  result: "",
  selectedUsers: [],
  selectedStatuses: [],
  selectedTypes: [],
  startDate: null,
  endDate: null,
  hiddenColumns: ["isDone"]
};

const Meetings = React.memo(() => {
  const [state, setState] = useState({
    selectedMeetingBaloon: null,
    objectPage: false,
    updatePage: false,
    createMeetingPage: false,
    updateMeetingPage: false,
    objectId: null,
    meetingId: "",
    videoPlayerPage: false
  });

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
      : null
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: !!localStorageState ? formatedState : initialState,
    mode: "onChange"
  });

  const data = watch();
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isManager = useSelector(getIsUserManager(currentUserId));

  const meetings = useSelector(getMeetingsList());

  const meetingStatuses = useSelector(getMeetingStatusesList());
  const meetingsTypes = useSelector(getMeetingTypesList());
  const selectedMeeting = useSelector(
    getMeetingById(state.selectedMeetingBaloon)
  );
  const searchedMeetings = useSearchMeeting(meetings, data);
  const sortedMeetings = sortingByDateAndTime(searchedMeetings);

  const isLoading = useSelector(getMeetingLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);
  const isDialogPage = false;

  const {
    handleOpenCreateMeetingPage,
    handleOpenUpdateMeetingPage,
    handleOpenObjectPage,
    handleOpenVideoPlayerPage
  } = useDialogHandlers(setState);

  const handleChangeSelectedMeetingBaloon = (meetingId) => {
    setState((prevState) => ({
      ...prevState,
      selectedMeetingBaloon: meetingId
    }));
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
    <ContainerStyled>
      <HeaderLayout title="Встречи" />
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateMeetingPage={handleOpenCreateMeetingPage}
        onOpenVideoPlayerPage={handleOpenVideoPlayerPage}
        isInputEmpty={isInputEmpty}
      />
      <ItemsOnMap
        items={searchedMeetings}
        onClick={handleChangeSelectedMeetingBaloon}
        baloon={
          <MeetingBaloon
            meeting={selectedMeeting}
            onOpenObjectPage={handleOpenObjectPage}
            onOpenUpdateMeetingPage={handleOpenUpdateMeetingPage}
          />
        }
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
        isManager={isManager}
        isLoading={isLoading}
      />
      <BasicTable
        items={sortedMeetings}
        itemsColumns={meetingsColumns(
          handleOpenUpdateMeetingPage,
          handleOpenObjectPage,
          isDialogPage,
          isCurator
        )}
        isLoading={isLoading}
      />
      <PageDialogs
        state={state}
        setState={setState}
        videoTitle="Как пользоваться страницей со Встречами"
        videoSrc="https://www.youtube.com/embed/ywwSfkQ6McY"
      />
    </ContainerStyled>
  );
});

export default Meetings;
