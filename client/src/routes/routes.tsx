import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// layouts
import Main from "@layouts/main/main";
import RequireAuth from "@layouts/users/components/require-auth";
import Objects from "@layouts/objects/objects.layout";
import ObjectsDatabase from "@layouts/objects-database/objects-database";
import Statictics from "@layouts/statistics/statistics";
import Meetings from "@layouts/meetings/meetings";
import Calendar from "@layouts/calendar/calendar";
import Deals from "@layouts/deals/deals";
import Presentations from "@layouts/presentations/presentations";
import Users from "@layouts/users/users";
import Profile from "@layouts/profile/profile";
import Contacts from "@layouts/contacts/contacts";
import Companies from "@layouts/companies/companies";
// components
import UpdateProfile from "@components/pages/user/update-profile";
import NoMatchRoute from "@components/common/rout/no-match";
import Loader from "@components/common/loader/loader";
// store
import {
  getCurrentUserId,
  getIsLoggedIn,
  getIsUserCurator,
  getUsersLoadingStatus
} from "@store/user/users.store";
import Callback from "@layouts/callback/callback";
import EmailActivated from "@components/pages/email-activated/email-activated";
import RecoveryPassword from "@components/pages/password/recovery-password";
import SetupPassword from "@components/pages/password/setup-password";
import ResultPaymentPage from "@components/pages/payment/result-payment";
import RequireActiveLicense from "@layouts/users/components/require-active-license";
import ObjectsLayout from "@layouts/objects/objects.layout";

export default function AppRoutes() {
  const currentUserId = useSelector(getCurrentUserId());
  const isUserLoading = useSelector(getUsersLoadingStatus());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isLoggedIn = useSelector(getIsLoggedIn());

  const routes = [
    { id: 1, path: "objects/*", element: <ObjectsLayout /> },
    { id: 2, path: "objectsdatabase/*", element: <ObjectsDatabase /> },
    { id: 3, path: "statictics/*", element: <Statictics /> },
    { id: 4, path: "meetings/*", element: <Meetings /> },
    { id: 5, path: "calendar/*", element: <Calendar /> },
    { id: 6, path: "deals/*", element: <Deals /> },
    // {
    //   id: 7,
    //   path: "users/*",
    //   element: !isUserLoading ? (
    //     isCurator ? (
    //       <Users />
    //     ) : (
    //       <NoMatchRoute />
    //     )
    //   ) : (
    //     <Loader size={50} />
    //   )
    // },
    { id: 8, path: "profile/*", element: <Profile /> },
    { id: 9, path: ":userId?/presentations", element: <Presentations /> },
    { id: 10, path: ":userId?/profileUpdate", element: <UpdateProfile /> },
    { id: 11, path: "contacts/*", element: <Contacts /> },
    { id: 12, path: "companies/*", element: <Companies /> },
    { id: 13, path: "callback/*", element: <Callback /> },
    { id: 14, path: "activate/:link", element: <EmailActivated /> }
    // { id: 14, path: "payment", element: <ResultPaymentPage /> }
  ];

  return (
    <Routes>
      <Route path="*" element={<NoMatchRoute />} />
      <Route path="/" element={isLoggedIn ? <Objects /> : <Main />} />
      <Route path="auth/*" element={isLoggedIn ? <Objects /> : <Main />} />
      <Route path="password/*" element={<NoMatchRoute />} />
      <Route path="password/recovery/:link" element={<RecoveryPassword />} />
      <Route path="payment/*" element={<ResultPaymentPage />} />
      <Route
        path="password/setup-password/:email?/:link"
        element={<SetupPassword />}
      />
      <Route
        path="Users/*"
        element={
          <RequireAuth>
            <Users />
          </RequireAuth>
        }
      />

      {routes.map((route) => (
        <Route
          key={route.id}
          path={route.path}
          element={
            <RequireAuth>
              {/* {route.element} */}
              <RequireActiveLicense>{route.element}</RequireActiveLicense>
            </RequireAuth>
          }
        />
      ))}
    </Routes>
  );
}
