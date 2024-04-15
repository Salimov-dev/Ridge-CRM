// libraries
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// components
import BasicTable from "@components/common/table/basic-table";
import HeaderLayout from "@components/common/page-headers/header-layout";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import MeetingsLayoutFiltersPanel from "@components/UI/filters-panels/meetings-layout/meetings-layout.filters-panel";
import ButtonsMeetingsLayout from "./components/buttons.meetings-layout";
import MeetingBalloon from "@components/UI/maps/meeting-balloon";
import { meetingsLayoutInitialState } from "@components/UI/filters-panels/meetings-layout/meetings-layout-initial-state.filters-panel";
// hooks
import useSearchMeeting from "@hooks/meeting/use-search-meeting";
// columns
import { meetingsColumns } from "@columns/meetings.columns";
// utils
import sortingByDateAndTime from "@utils/other/sorting-by-date-and-time";
// store
import {
  getMeetingById,
  getMeetingLoadingStatus,
  getMeetingsList
} from "@store/meeting/meetings.store";

const MeetingsLayout = React.memo(() => {
  const [selectedBalloon, setSelectedBalloon] = useState([]);
  const [stateDialogPages, setStateDialogPages] = useState({
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
    defaultValues: !!localStorageState
      ? formatedState
      : meetingsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  const meetingsList = useSelector(getMeetingsList());
  const selectedMeeting = useSelector(getMeetingById(selectedBalloon));
  const searchedMeetings = useSearchMeeting(meetingsList, data);
  const sortedMeetings = sortingByDateAndTime(searchedMeetings);

  const isLoading = useSelector(getMeetingLoadingStatus());
  const isDialogPage = false;

  const handleChangeSelectedBalloon = (meetingId) => {
    setSelectedBalloon(meetingId);
  };

  useEffect(() => {
    localStorage.setItem("search-meetings-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-meetings-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-meetings-data",
        JSON.stringify(meetingsLayoutInitialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Встречи" />
      <ButtonsMeetingsLayout
        data={data}
        reset={reset}
        setState={setStateDialogPages}
      />
      <ItemsOnMap
        items={searchedMeetings}
        onClick={handleChangeSelectedBalloon}
        isLoading={isLoading}
        baloon={
          <MeetingBalloon
            meeting={selectedMeeting}
            setState={setStateDialogPages}
          />
        }
      />
      <MeetingsLayoutFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
      />
      <BasicTable
        items={sortedMeetings}
        itemsColumns={meetingsColumns(setStateDialogPages, isDialogPage)}
        isLoading={isLoading}
      />
      <PageDialogs
        state={stateDialogPages}
        setState={setStateDialogPages}
        videoTitle="Как пользоваться страницей со Встречами"
        videoSrc="https://www.youtube.com/embed/ywwSfkQ6McY"
      />
    </ContainerStyled>
  );
});

export default MeetingsLayout;
