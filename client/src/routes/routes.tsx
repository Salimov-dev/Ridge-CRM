import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// protected routes
import RequireAuth from "@routes/components/require-auth";
import RequireActiveLicense from "@routes/components/require-active-license";
// layouts
import Users from "@layouts/users/users.layout";
import ObjectsLayout from "@layouts/objects/objects.layout";
import MeetingsLayout from "@layouts/meetings/meetings.layout";
import MainLayout from "@layouts/main/main.layout";
import DealsLayout from "@layouts/deals/deals.layout";
import ContactsLayout from "@layouts/contacts/contacts.layout";
import CalendarLayout from "@layouts/calendar/calendar.layout";
import ObjectsDatabaseLayout from "@layouts/objects-database/objects-database.layout";
import ProfileLayout from "@layouts/profile/profile.layout";
import StaticticsLayout from "@layouts/statistics/statistics.layout";
import PresentationsLayout from "@layouts/presentations/presentations";
import CompaniesLayout from "@layouts/companies/companies.layout";
import CallbackLayout from "@layouts/callback/callback.layout";
// components
import UpdateProfile from "@components/pages/profile/update-profile";
import NoMatchPageRoute from "@components/common/route/no-match-page.route";
import EmailActivated from "@components/pages/email-activated/email-activated.page";
import RecoveryPassword from "@components/pages/password/recovery-password/recovery-password.page";
import SetupPassword from "@components/pages/password/setup-password/setup-password.page";
import ResultPaymentPage from "@components/pages/payment/result-payment.page";
import RequireUserRoleCurator from "./components/require-user-role-curator";
// store
import { getIsLoggedIn } from "@store/user/users.store";

export default function AppRoutes() {
  const isLoggedIn = useSelector(getIsLoggedIn());

  const routes = [
    { id: 1, path: "objects/*", element: <ObjectsLayout /> },
    { id: 2, path: "objectsdatabase/*", element: <ObjectsDatabaseLayout /> },
    { id: 3, path: "statictics/*", element: <StaticticsLayout /> },
    { id: 4, path: "meetings/*", element: <MeetingsLayout /> },
    { id: 5, path: "calendar/*", element: <CalendarLayout /> },
    { id: 6, path: "deals/*", element: <DealsLayout /> },
    { id: 7, path: "profile/*", element: <ProfileLayout /> },
    { id: 8, path: ":userId?/presentations", element: <PresentationsLayout /> },
    { id: 9, path: ":userId?/profileUpdate", element: <UpdateProfile /> },
    { id: 10, path: "contacts/*", element: <ContactsLayout /> },
    { id: 11, path: "companies/*", element: <CompaniesLayout /> },
    { id: 12, path: "callback/*", element: <CallbackLayout /> },
    { id: 13, path: "activate/:link", element: <EmailActivated /> }
  ];

  return (
    <Routes>
      <Route path="*" element={<NoMatchPageRoute />} />
      <Route
        path="/"
        element={isLoggedIn ? <ObjectsLayout /> : <MainLayout />}
      />
      <Route
        path="auth/*"
        element={isLoggedIn ? <ObjectsLayout /> : <MainLayout />}
      />
      <Route path="password/*" element={<NoMatchPageRoute />} />
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
            <RequireUserRoleCurator>
              <Users />
            </RequireUserRoleCurator>
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
