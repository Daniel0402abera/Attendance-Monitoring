import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import PositionPage from 'src/pages/position';
import { useAuth } from 'src/context/AuthContext';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const VotePage = lazy(() => import('src/pages/vote'));
export const TeamPage = lazy(() => import('src/pages/team'));
export const TimeSheetPage = lazy(() => import('src/pages/timesheet'));
export const ApproveTimeSheetPage = lazy(() => import('src/pages/approve-timeshet'));
export const UserPage = lazy(() => import('src/pages/user'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const userRole = localStorage.getItem('role');

  const allRoutes = [
    {
      path: '/',
      element: <LoginPage />,
      index: true,
    },
    {
      element: isAuthenticated && (userRole === 'ADMIN' || userRole === 'USER' || userRole ==='MANAGER') ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <LoginPage />
      ),
      children: [
        { path: '/dashboard', element: <IndexPage /> },
        { path: '/dashboard/position', element: <PositionPage /> },
        { path: '/dashboard/Voting_list', element: <VotePage /> },
        { path: '/dashboard/team', element: <TeamPage /> },
        { path: '/dashboard/timesheet', element: <TimeSheetPage /> },
        {path: '/dashboard/approve-timesheet',element:<ApproveTimeSheetPage/>},
        { path: '/dashboard/user', element: <UserPage /> },
      ],
    },
    // {
    //   element: isAuthenticated && userRole === 'USER' ? (
    //     <DashboardLayout>
    //       <Suspense>
    //         <Outlet />
    //       </Suspense>
    //     </DashboardLayout>
    //   ) : (
    //     <Navigate to="/404" replace />
    //   ),
    //   children: [{ path: '/dashboard/Voting_list', element: <VotePage /> }],
    // },
    {
      path: '404',
      element: <Page404 />,
    },
  ];

  // Filter routes based on user role
  const filteredRoutes = allRoutes.filter((route) => 
    // Include only routes without roles or with matching user roles
     !route.roles || route.roles.includes(userRole)
  );

  const routes = useRoutes(filteredRoutes);

  return routes;
}
