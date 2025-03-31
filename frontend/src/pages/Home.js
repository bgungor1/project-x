import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Oran Arşivi'ne Hoş Geldiniz
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Maç oranlarını analiz edin, benzer maçları bulun ve tahminlerinizi geliştirin
        </Typography>
        {!user && (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/register"
              sx={{ mr: 2 }}
            >
              Hemen Üye Ol
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/login"
            >
              Giriş Yap
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Maç Analizi
            </Typography>
            <Typography>
              Geçmiş maç verilerini analiz ederek, benzer maçları bulun ve oranları karşılaştırın.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              İstatistikler
            </Typography>
            <Typography>
              Detaylı maç istatistikleri ve performans verileri ile tahminlerinizi destekleyin.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Benzer Maçlar
            </Typography>
            <Typography>
              Aynı takımların geçmiş karşılaşmalarını bulun ve oranları karşılaştırın.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 