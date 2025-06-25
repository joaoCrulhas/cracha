import * as React from 'react';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      data-cmp-name={'auth-layout'}
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'center',
        justifyContent: 'center',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
        <Box sx={{ p: 3 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'inline-block',
              fontSize: 0,
              textDecoration: 'none',
              color: 'inherit',
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flex: '1 1 auto',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box sx={{ width: '100%' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
