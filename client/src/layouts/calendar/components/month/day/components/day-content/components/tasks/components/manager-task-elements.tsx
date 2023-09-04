import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getUsersList } from "../../../../../../../../../../store/user/users.store";
import DividerStyled from "../../../../../../../../../../components/common/divider/divider-styled";

const ManagerTaskElements = ({ task }) => {
  const users = useSelector(getUsersList());
  const managerId = task?.managerId;
  const isManagerId = Boolean(managerId);

  const getManagerName = (managerId) => {
    const user = users?.find((user) => user._id === managerId);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;
    return result;
  };

  const getCuratorName = (curatorId) => {
    const user = users?.find((user) => user._id === curatorId);
    const result = `${user?.name.lastName} ${user?.name.firstName}`;
    return result;
  };

  return (
    <>
      {isManagerId && <DividerStyled />}
      {isManagerId ? (
        <Typography>
          <b>Менеджер:</b> {getManagerName(managerId)}
        </Typography>
      ) : null}
      {isManagerId ? (
        <Typography>
          <b>Куратор:</b> {getCuratorName(managerId)}
        </Typography>
      ) : null}
    </>
  );
};

export default ManagerTaskElements;
