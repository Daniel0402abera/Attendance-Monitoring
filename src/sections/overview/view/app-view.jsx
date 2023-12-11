import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, Skeleton, InputLabel, FormControl, FormHelperText } from '@mui/material';

import { useGet } from 'src/service/useGet';

import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [positionId, setPositionId] = useState(1);
  const { data: user, isFetching: isFetchingUsers } = useGet('/api/v1/users');
  const { data: teams, isFetching: isFetchingTeams } = useGet('/api/v1/teams');
  const { data: manager, isFetching: isFetchingManager } = useGet('/api/v1/users?role=MANAGER');

  const TotalUser = user?.length;
  const TotalPosition = teams?.length;
  const TotalManager = manager?.length;

  // const transformedData = results?.map((item) => ({
  //   label: item?.candidateName,
  //   value: item?.voteCount,
  // }));

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back to Attendance DashBoard
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Team"
            total={isFetchingTeams ? 'loading...' : TotalPosition}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={isFetchingUsers ? 'Loading...' : TotalUser}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Candidates"
            total={isFetchingManager ? '' : TotalManager}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Locaation A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Location B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Location C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Position</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Position"
              value={positionId}
              onChange={(event) => setPositionId(event.target.value)}
            >
              {teams?.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select position to see latest position results</FormHelperText>
          </FormControl>
          <Skeleton variant="rounded" style={{ marginTop: '50px' }} width={700} height={300}>
              <AppCurrentVisits
                chart={{
                  series: [],
                }}
              />
            </Skeleton>
          {/* {false ? (
            <Skeleton variant="rounded" style={{ marginTop: '50px' }} width={700} height={300}>
              <AppCurrentVisits
                chart={{
                  series: [],
                }}
              />
            </Skeleton>
          ) : (
            <AppCurrentVisits
              title="Current Total Vote"
              chart={{
                series: transformedData,
              }}
            />
          )} */}
        </Grid>
      </Grid>
    </Container>
  );
}
