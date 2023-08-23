// libraries
import { Box, styled } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import ButtonsBlock from "./components/buttons-block";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import {
  getMeetingLoadingStatus,
  getMeetingsList,
} from "../../store/meetings.store";
import { groupedColumns } from "./table/columns";
import Loader from "../../components/common/loader/loader";
import Map from "./components/map";
import FiltersPanel from "./components/filter-panel";
import { getUsersList } from "../../store/users.store";
import { getMeetingStatusesList } from "../../store/meeting-status.store";
import { getMeetingTypesList } from "../../store/meeting-types.store";
import useSearchMeeting from "../../hooks/use-search-meeting";

const MapContainer = styled(Box)`
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
  background-color: gray;
`;

const initialState = {
  startDate: null,
  endDate: null,
  selectedUsers: [],
  selectedStatuses: [],
  selectedTypes: [],
};

const Meetings = () => {
  const meetings = useSelector(getMeetingsList());
  const isLoading = useSelector(getMeetingLoadingStatus());
  const users = useSelector(getUsersList());
  const statuses = useSelector(getMeetingStatusesList());
  const types = useSelector(getMeetingTypesList());

  const columns = groupedColumns;

  const localStorageState = JSON.parse(
    localStorage.getItem("search-meetings-data")
  );

  const { register, watch, setValue, reset } = useForm({
    defaultValues: localStorageState || initialState,
    mode: "onBlur",
  });

  const data = watch();

  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const searchedMeetings = useSearchMeeting({
    meetings,
    data,
  });

  const getActualUsersList = () => {
    const filteredUsers = meetings?.map((meet) => meet?.userId);
    const formatedUsersArray = filteredUsers?.filter((user) => user !== "");

    const uniqueUsers = [...new Set(formatedUsersArray)];

    const actualUsersArray = uniqueUsers?.map((id) => {
      const foundObject = users?.find((user) => user._id === id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: `${foundObject.name.lastName} ${foundObject.name.firstName}`,
          }
        : null;
    });

    const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

    return sortedUsers;
  };

  const getActualStatusesList = () => {
    const filteredStatuses = meetings?.map((meet) => meet?.status);
    const formatedStatusesArray = filteredStatuses?.filter(
      (status) => status !== ""
    );

    const uniqueStatuses = [...new Set(formatedStatusesArray)];

    const actualStatusesArray = uniqueStatuses?.map((id) => {
      const foundObject = statuses?.find((status) => status._id === id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: foundObject.name,
          }
        : null;
    });

    const sortedStatuses = orderBy(actualStatusesArray, ["name"], ["asc"]);

    return sortedStatuses;
  };

  const getActuaTypesList = () => {
    const filteredTypes = meetings?.map((meet) => meet?.meetingType);
    const formatedTypesArray = filteredTypes?.filter((type) => type !== "");
    const uniqueTypes = [...new Set(formatedTypesArray)];

    const actualTypesArray = uniqueTypes?.map((id) => {
      const foundObject = types?.find((type) => type._id === id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: foundObject.name,
          }
        : null;
    });

    const sortedTypes = orderBy(actualTypesArray, ["name"], ["asc"]);

    return sortedTypes;
  };

  useEffect(() => {
    localStorage.setItem("search-meetings-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("search-meetings-data", JSON.stringify(initialState));
  }, []);

  return (
    <Box>
      <LayoutTitle title="Встречи" />

      <ButtonsBlock
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
      />

      <MapContainer>
        {!isLoading ? <Map searchedMeetings={meetings} /> : <Loader />}
      </MapContainer>

      <FiltersPanel
        data={data}
        register={register}
        setValue={setValue}
        isLoading={isLoading}
        usersList={getActualUsersList()}
        statusesList={getActualStatusesList()}
        typesList={getActuaTypesList()}
      />

      <BasicTable
        items={searchedMeetings}
        itemsColumns={columns}
        isLoading={isLoading}
        sortingColumn="date"
      />
    </Box>
  );
};

export default Meetings;
