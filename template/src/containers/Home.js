import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@krowdy-ui/styles'
import { Button, Fab, Switch, Typography, List, ListItemText, ListItem } from '@krowdy-ui/core'
import {
  AccessAlarm as AccessAlarmIcon,
  ThreeDRotation as ThreeDRotationIcon
} from '@material-ui/icons'

import themeDucks from 'reducers/theme'
import productsDucks from 'reducers/products'
import { useComponentWillMount } from 'lib/hooks'
import logo from 'sources/img/logo.svg'

const { updateTheme } = themeDucks.creators
const { getProducts } = productsDucks.creators

const useStyles = makeStyles({
  '@keyframes appLogoSpin': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  },
  appContainer: {
    textAlign: 'center'
  },
  appHeader: {
    alignItems     : 'center',
    backgroundColor: '#282c34',
    color          : 'white',
    display        : 'flex',
    flexDirection  : 'column',
    fontSize       : 'calc(10px + 2vmin)',
    justifyContent : 'center',
    minHeight      : '100vh'
  },
  appLink: {
    color: '#61dafb'
  },
  appLogo: {
    animation: '$appLogoSpin infinite 20s linear',
    height   : '40vmin'
  }
})

export default function Home() {
  const [ loaded, setLoaded ] = useState(false)
  const dispatch = useDispatch()

  const style = useSelector(({ theme }) => theme.style)
  const products = useSelector(({ products }) => products.items)

  const classes = useStyles()

  useComponentWillMount(() => {
    dispatch(getProducts())
  })

  useEffect(() => {
    setLoaded(true)
  }, [])

  const _handleChangeTheme = () => {
    dispatch(updateTheme(style === 'ligth' ? 'dark' : 'ligth'))
  }

  return (
    <div>
      <Switch
        checked={style === 'ligth'}
        color='primary'
        onChange={_handleChangeTheme} />
      <Button>Default</Button>
      <Button color='primary'>Primary</Button>
      <Button color='secondary'>Secondary</Button>
      <Button disabled>Disabled</Button>
      <Button href='#text-buttons'>Link</Button>
      <Button color='primary' variant='contained'>
        Primary
      </Button>
      <Button color='secondary' variant='contained'>
        Secondary
      </Button>
      <Fab color='primary' variant='round'>
        <AccessAlarmIcon />
      </Fab>
      <Fab aria-label='Edit' color='secondary'>
        <ThreeDRotationIcon />
      </Fab>
      <Fab aria-label='Delete' variant='extended'>
        <ThreeDRotationIcon />
        Extended
      </Fab>
      <input
        accept='image/*' id='flat-button-file' multiple
        style={{ display: 'none' }} type='file' />
      <label htmlFor='flat-button-file'>
        <Button component='span'>Upload</Button>
      </label>
      <div className={classes.appContainer}>
        <header className={classes.appHeader}>
          {
            loaded && <img alt='logo' className={classes.appLogo} src={logo} />
          }
          <Typography color='inherit' variant='h5'>
            Edit <code>src/containers/Home.js</code> and save to reload.
          </Typography>
          <a
            className={classes.appLink}
            href='https://github.com/ghondar/crassa'
            rel='noopener noreferrer'
            target='_blank'>
              crassa v0.9.24
          </a>
          <List>
            {
              products.map((product, index) => (
                <ListItem key={index}>
                  <ListItemText primary={product.name} />
                </ListItem>
              ))
            }
          </List>
        </header>
      </div>
    </div>
  )
}
