// libraries
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// components
import MeetingBaloon from "@components/UI/maps/meeting-baloon";
import MeetingsFiltersPanel from "@components/UI/filters-panels/meetings-filters-panel";
import BasicTable from "@components/common/table/basic-table";
import LayoutTitle from "@components/common/page-titles/layout-title";
import DialogStyled from "@components/common/dialog/dialog-styled";
import UpdateObject from "@components/pages/update-object/update-object";
import ObjectPage from "@components/pages/object-page/object-page";
import UpdateMeeting from "@components/pages/update-meeting/update-meeting";
import CreateMeeting from "@components/pages/create-meeting/create-meeting";
import Buttons from "./components/buttons";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
// hooks
import useSearchMeeting from "@hooks/meeting/use-search-meeting";
// icons
import target from "@assets/map/target_meeting.png";
import targetCluster from "@assets/map/targeMeeting_cluster.png";
// columns
import { meetingsColumns } from "@columns/meetings.columns";
// utils
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";
// store
import { getMeetingStatusesList } from "@store/meeting/meeting-status.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import { getMeetingTypesList } from "@store/meeting/meeting-types.store";
import {
  getMeetingById,
  getMeetingLoadingStatus,
  getMeetingsList,
} from "@store/meeting/meetings.store";

const initialState = {
  meetingsActivity: "",
  result: "",
  selectedUsers: [],
  selectedStatuses: [],
  selectedTypes: [],
  startDate: null,
  endDate: null,
};

const Meetings = React.memo(() => {
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

  const columns = meetingsColumns();
  const meetings = useSelector(getMeetingsList());
  const meetingStatuses = useSelector(getMeetingStatusesList());
  const meetingsTypes = useSelector(getMeetingTypesList());
  const selectedMeeting = useSelector(getMeetingById(selectedMeetingBaloon));
  const searchedMeetings = useSearchMeeting(meetings, data);
  const sortedMeetings = sortingByDateAndTime(searchedMeetings);

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

  const [state, setState] = useState({
    objectPage: false,
    updatePage: false,
    createMeetingPage: false,
    updateMeetingPage: false,
    objectId: null,
    meetingId: "",
  });

  // обновление стейта при создании встречи
  const handleOpenCreateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: true,
    }));
  };
  const handleCloseCreateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      createMeetingPage: false,
    }));
  };

  // обновление стейта при обновлении встречи
  const handleOpenUpdateMeetingPage = (meetingId) => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: true,
      meetingId: meetingId,
    }));
  };
  const handleCloseUpdateMeetingPage = () => {
    setState((prevState) => ({
      ...prevState,
      updateMeetingPage: false,
    }));
  };

  // обновление стейта при открытии страницы объекта
  const handleOpenObjectPage = (objectId) => {
    // console.log("objectId", objectId);

    setState((prevState) => ({
      ...prevState,
      objectPage: true,
      objectId: objectId,
    }));
  };
  const handleCloseObjectPage = () => {
    setState((prevState) => ({ ...prevState, objectPage: false }));
  };

  // обновление стейта при открытии страницы обновления объекта
  const handleOpenUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: true }));
  };
  const handleCloseUpdateObjectPage = () => {
    setState((prevState) => ({ ...prevState, updatePage: false }));
  };

  return (
    <>
      <LayoutTitle title="Встречи" />
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreateObjectPage={handleOpenCreateMeetingPage}
        isInputEmpty={isInputEmpty}
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

      <DialogStyled
        component={<CreateMeeting onClose={handleCloseCreateMeetingPage} />}
        maxWidth="lg"
        onClose={handleCloseCreateMeetingPage}
        open={state.createMeetingPage}
      />
      <DialogStyled
        component={
          <UpdateMeeting
            meetingId={state.meetingId}
            onClose={handleCloseUpdateMeetingPage}
          />
        }
        onClose={handleCloseUpdateMeetingPage}
        maxWidth="md"
        open={state.updateMeetingPage}
      />
      <DialogStyled
        component={
          <ObjectPage
            onClose={handleCloseObjectPage}
            onEdit={handleOpenUpdateObjectPage}
            objectId={state.objectId}
          />
        }
        onClose={handleCloseObjectPage}
        open={state.objectPage}
      />
      <DialogStyled
        component={
          <UpdateObject
            onClose={handleCloseUpdateObjectPage}
            objectId={state.objectId}
          />
        }
        onClose={handleCloseUpdateObjectPage}
        open={state.updatePage}
      />
    </>
  );
});

export default Meetings;
