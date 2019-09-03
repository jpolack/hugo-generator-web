import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

function HomeView() {
  return (
    <Box display="flex" flex={1} alignItems="center" justifyContent="center">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box p={4}>
          <Typography variant="h4" color="primary">Generate your Hugo webpage with one click</Typography>
        </Box>
        <Box>
          <Button color="primary" variant="outlined">
            <Link href="/generate" target="_blank" style={{ textDecoration: 'none' }}>Download now</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HomeView;
