import { Route, Routes } from "react-router-dom";
import Main from "../layouts/main/main";
import SignUp from "../layouts/sigup/signup";
import RequireAuth from "../layouts/users/components/require-auth";
import Objects from "../layouts/objects/objects";
import ObjectsDatabase from "../layouts/objects-database/objects-database";
import Statictics from "../layouts/statistics/statistics";
import Meetings from "../layouts/meetings/meetings";
import Calendar from "../layouts/calendar/calendar";
import Deals from "../layouts/deals/deals";
import Presentations from "../layouts/presentations/presentations";
import Users from "../layouts/users/users";
import Profile from "../layouts/profile/profile";
import UpdateProfile from "../components/pages/user/update-profile";
import NoMatchRoute from "../components/common/rout/no-match";
import { getCurrentUserId, getIsUserCurator } from "../store/user/users.store";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="auth" element={<SignUp />} />
      <Route
        path="objects/*"
        element={
          <RequireAuth>
            <Objects />
          </RequireAuth>
        }
      />
      <Route
        path="objectsdatabase/*"
        element={
          <RequireAuth>
            <ObjectsDatabase />
          </RequireAuth>
        }
      />
      <Route
        path="statictics/*"
        element={
          <RequireAuth>
            <Statictics />
          </RequireAuth>
        }
      />
      <Route
        path="meetings/*"
        element={
          <RequireAuth>
            <Meetings />
          </RequireAuth>
        }
      />
      <Route
        path="calendar/*"
        element={
          <RequireAuth>
            <Calendar />
          </RequireAuth>
        }
      />
      <Route
        path="deals/*"
        element={
          <RequireAuth>
            <Deals />
          </RequireAuth>
        }
      />
      <Route
        path="presentations/*"
        element={
          <RequireAuth>
            <Presentations />
          </RequireAuth>
        }
      />
      {isCurator && (
        <Route
          path="users/*"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
      )}
      <Route path="profile" element={<Profile />}>
        <Route
          path=":userId?/profileUpdate"
          element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<NoMatchRoute />} />
    </Routes>
  );
}
