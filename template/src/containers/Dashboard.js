import React from 'react'
import { useSelector } from 'react-redux'

import { Menu as MenuIcon } from '@material-ui/icons'
import { Typography, AppBar, Toolbar, IconButton, createMuiTheme, CssBaseline } from '@krowdy-ui/core'
import { ThemeProvider } from '@krowdy-ui/styles'

import MaterialTheme from 'utils/MaterialTheme'

export default function Dashboard({ children }) {
  const style = useSelector(({ theme }) => theme.style)

  return (
    <ThemeProvider theme={createMuiTheme(MaterialTheme[style])}>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton aria-label='Menu' color='inherit'>
            <MenuIcon />
          </IconButton>
          <Typography color='inherit' variant='h5'>
            crassa-krowdy-ui
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </ThemeProvider>
  )
}
