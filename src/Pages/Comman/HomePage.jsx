import * as React from 'react';
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import heroImg from '../../../public/assets/images/hero-image.png'
import heroImg2x from '../../../public/assets/images/hero-image.png'
import heroImg3x from '../../../public/assets/images/hero-image.png'
import AnimkidIc from '../../../public/assets/images/fish.svg'

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box component="main">
        <Box className='hero-section' sx={{ py: 6 }}>
          <Container maxWidth="lg">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item sm={6}>
                <Typography component="h1" variant="h1">
                  Masterclass of Crypto trading in 2023
                </Typography>
                <Typography component="h5" variant="h5">
                  NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists.
                </Typography>
                <Button variant="contained" startIcon={<RocketLaunchOutlinedIcon />}>
                  Get Started
                </Button>

                <Grid item container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item sm={4}>
                    <Typography component="h3" variant="h3">
                      240k+
                    </Typography>
                    <Typography component="p" variant="body2" >
                      Total Sale
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography component="h3" variant="h3">
                      100k+
                    </Typography>
                    <Typography component="p" variant="body2" >
                      Auctions
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography component="h3" variant="h3">
                      240k+
                    </Typography>
                    <Typography component="p" variant="body2" >
                      Artists
                    </Typography>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item sm={6}>
                <Box className='hero-card-img'>
                  <img
                    src={heroImg}
                    srcSet={`${heroImg} 1x, ${heroImg2x} 2x, ${heroImg3x} 3x`}
                    alt="Hero image"
                    loading="lazy"
                  />
                  <Box className='hero-card-content'>
                    <Typography component="h4" variant="h4">
                      Space Walking
                    </Typography>
                    <Box className='hero-card-animkid'>
                      <img
                        src={AnimkidIc}
                        alt="Animkid"
                        loading="lazy"
                      />
                      Aminkid
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
          cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
          at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
          Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
          numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
          asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
          assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
          soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
          ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
          Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
          delectus quo eius exercitationem tempore. Delectus sapiente, provident
          corporis dolorum quibusdam aut beatae repellendus est labore quisquam
          praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
          deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
          fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
          recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
          debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
          praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
          voluptate iure labore, repellendus beatae quia unde est aliquid dolor
          molestias libero. Reiciendis similique exercitationem consequatur, nobis
          placeat illo laudantium! Enim perferendis nulla soluta magni error,
          provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
          iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
          reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
          cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
          consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
          Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
        </Typography>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Home;