import { Dispatch, FC, SetStateAction, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import MeetingsLayoutFiltersPanel from "@components/UI/filters-panels/meetings-layout.filters-panel";
import MeetingBalloon from "@components/UI/maps/meeting-balloon/meeting-balloon";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import BasicTable from "@components/common/table/basic-table";
// columns
import { meetingsColumns } from "@columns/meetings.columns";
// hooks
import useSearchMeeting from "@hooks/meeting/use-search-meeting";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// store
import { getIsCurrentUserRoleManager } from "@store/user/users.store";
import { getMeetingLoadingStatus } from "@store/meeting/meetings.store";

type IData = Record<string, string | string[] | null>;

interface IMeetingsLayoutContent {
  data: IData;
  state: IDialogPagesState;
  register: UseFormRegister<IData>;
  setValue: UseFormSetValue<IData>;
  setStateDialogPages: Dispatch<SetStateAction<IDialogPagesState>>;
}

const MeetingsLayoutContent: FC<IMeetingsLayoutContent> = ({
  data,
  state,
  register,
  setValue,
  setStateDialogPages
}): JSX.Element => {
  const [selectedMeetingId, setSelectedMeetingId] = useState("");

  const { searchedMeetings } = useSearchMeeting({
    data
  });

  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isLoading = useSelector(getMeetingLoadingStatus());

  const handleChangeSelectedBalloon = (meetingId: string): void => {
    setSelectedMeetingId(meetingId);
  };

  return (
    <>
      <ItemsOnMap
        items={searchedMeetings}
        onClick={handleChangeSelectedBalloon}
        isLoading={isLoading}
        baloon={
          <MeetingBalloon
            meetingId={selectedMeetingId}
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
        items={searchedMeetings}
        itemsColumns={meetingsColumns({
          state: state,
          setState: setStateDialogPages,
          isCurrentUserRoleManager: isCurrentUserRoleManager
        })}
        isLoading={isLoading}
      />
    </>
  );
};

export default MeetingsLayoutContent;
