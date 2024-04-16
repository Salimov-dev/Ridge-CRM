import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// protected routes
import RequireAuth from "@routes/components/require-auth";
import RequireActiveLicense from "@routes/components/require-active-license";
// layouts
import Objects from "@layouts/objects/objects.layout";
import ObjectsDatabase from "@layouts/objects-database/objects-database.layout";
import Statictics from "@layouts/statistics/statistics";
import Presentations from "@layouts/presentations/presentations";
import Users from "@layouts/users/users.layout";
import Profile from "@layouts/profile/profile.layout";
import Companies from "@layouts/companies/companies.layout";
import ObjectsLayout from "@layouts/objects/objects.layout";
import MeetingsLayout from "@layouts/meetings/meetings.layout";
import MainLayout from "@layouts/main/main.layout";
import DealsLayout from "@layouts/deals/deals.layout";
import ContactsLayout from "@layouts/contacts/contacts.layout";
import CalendarLayout from "@layouts/calendar/calendar.layout";
import Callback from "@layouts/callback/callback";
// components
import UpdateProfile from "@components/pages/user/update-profile";
import NoMatchRoute from "@components/common/rout/no-match";
import EmailActivated from "@components/pages/email-activated/email-activated";
import RecoveryPassword from "@components/pages/password/recovery-password";
import SetupPassword from "@components/pages/password/setup-password";
import ResultPaymentPage from "@components/pages/payment/result-payment";
// store
import { getIsLoggedIn } from "@store/user/users.store";
import ObjectsDatabaseLayout from "@layouts/objects-database/objects-database.layout";
import ProfileLayout from "@layouts/profile/profile.layout";

export default function AppRoutes() {
  const isLoggedIn = useSelector(getIsLoggedIn());

  const routes = [
    { id: 1, path: "objects/*", element: <ObjectsLayout /> },
    { id: 2, path: "objectsdatabase/*", element: <ObjectsDatabaseLayout /> },
    { id: 3, path: "statictics/*", element: <Statictics /> },
    { id: 4, path: "meetings/*", element: <MeetingsLayout /> },
    { id: 5, path: "calendar/*", element: <CalendarLayout /> },
    { id: 6, path: "deals/*", element: <DealsLayout /> },
    { id: 7, path: "profile/*", element: <ProfileLayout /> },
    { id: 8, path: ":userId?/presentations", element: <Presentations /> },
    { id: 9, path: ":userId?/profileUpdate", element: <UpdateProfile /> },
    { id: 10, path: "contacts/*", element: <ContactsLayout /> },
    { id: 11, path: "companies/*", element: <Companies /> },
    { id: 12, path: "callback/*", element: <Callback /> },
    { id: 13, path: "activate/:link", element: <EmailActivated /> }
  ];

  return (
    <Routes>
      <Route path="*" element={<NoMatchRoute />} />
      <Route path="/" element={isLoggedIn ? <Objects /> : <MainLayout />} />
      <Route
        path="auth/*"
        element={isLoggedIn ? <Objects /> : <MainLayout />}
      />
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
              <RequireActiveLicense>{route.element}</RequireActiveLicense>
            </RequireAuth>
          }
        />
      ))}
    </Routes>
  );
}
