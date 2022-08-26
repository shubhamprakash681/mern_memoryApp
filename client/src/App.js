import './App.scss';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import logo from './images/logo.svg'
import Posts from './Components/Posts/Posts';
import Form from './Components/Form/Form';

import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getPosts } from './actions/postsAction'

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])

  return (
    <>
      {/* {console.log(getPosts())} */}
      <Container maxWidth='xl' >
        <AppBar position='static' color='inherit' className='appbar' >
          <Typography variant='h2' align='center' className='heading' >
            Memories
            <img src={logo} alt='LogoImg' className='logo' ></img>
          </Typography>

        </AppBar>
        <Grow in >
          <Container>
            <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} >

              <Grid item xs={12} sm={7} >
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4} >
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>

            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  )
}

export default App;
