import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// layouts
import Main from "@layouts/main/main";
import SignUp from "@layouts/sigup/signup";
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
    { id: 0, path: "*", element: <NoMatchRoute /> },
    { id: 1, path: "/", element: <Main /> },
    { id: 1, path: "auth", element: <SignUp /> },
    { id: 1, path: "objects/*", element: <RequireAuth><Objects /></RequireAuth> },
    { id: 2, path: "objectsdatabase/*", element: <RequireAuth><ObjectsDatabase /></RequireAuth>},
    { id: 3, path: "statictics/*", element: <RequireAuth><Statictics /></RequireAuth>},
    { id: 4, path: "meetings/*", element: <RequireAuth><Meetings /></RequireAuth>},
    { id: 5, path: "calendar/*", element: <RequireAuth><Calendar /></RequireAuth>},
    { id: 6, path: "deals/*", element: <RequireAuth><Deals /></RequireAuth>},
    { id: 7, path: "users/*", element: isCurator ? <RequireAuth><Users /></RequireAuth> : <NoMatchRoute />},
    { id: 8, path: "profile/*", element: <RequireAuth><Profile /></RequireAuth>},
    { id: 9, path: ":userId?/presentations", element: <RequireAuth><Presentations /></RequireAuth>},
    { id: 10, path: ":userId?/profileUpdate", element: <RequireAuth><UpdateProfile /></RequireAuth>},
  ];

  return (
    <Routes>
      {routes.map((rout) => (
        <Route
          key={rout.id}
          path={rout.path}
          element={<RequireAuth>{rout.element}</RequireAuth>}
        />
      ))}
    </Routes>
  );
}
