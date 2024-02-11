import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// layouts
import Main from "@layouts/main/main";
import RequireAuth from "@layouts/users/components/require-auth";
import Objects from "@layouts/objects/objects";
import ObjectsDatabase from "@layouts/objects-database/objects-database";
import Statictics from "@layouts/statistics/statistics";
import Meetings from "@layouts/meetings/meetings";
import Calendar from "@layouts/calendar/calendar";
import Deals from "@layouts/deals/deals";
import Presentations from "@layouts/presentations/presentations";
import Users from "@layouts/users/users";
import Profile from "@layouts/profile/profile";
// components
import UpdateProfile from "@components/pages/user/update-profile";
import NoMatchRoute from "@components/common/rout/no-match";
// store
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";

export default function AppRoutes() {
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const routes = [
    { id: 1, path: "objects/*", element: <Objects /> },
    { id: 2, path: "objectsdatabase/*", element: <ObjectsDatabase /> },
    { id: 3, path: "statictics/*", element: <Statictics /> },
    { id: 4, path: "meetings/*", element: <Meetings /> },
    { id: 5, path: "calendar/*", element: <Calendar /> },
    { id: 6, path: "deals/*", element: <Deals /> },
    {
      id: 7,
      path: "users/*",
      element: isCurator ? <Users /> : <NoMatchRoute />
    },
    { id: 8, path: "profile/*", element: <Profile /> },
    { id: 9, path: ":userId?/presentations", element: <Presentations /> },
    { id: 10, path: ":userId?/profileUpdate", element: <UpdateProfile /> }
  ];

  return (
    <Routes>
      <Route path="*" element={<NoMatchRoute />} />
      <Route path="/" element={<Main />} />
      <Route path="auth/*" element={<Main />} />

      {routes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={<RequireAuth>{route.element}</RequireAuth>}
        />
      ))}
    </Routes>
  );
}
