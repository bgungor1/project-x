import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [similarMatches, setSimilarMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMatchDetails();
    fetchSimilarMatches();
  }, [id]);

  const fetchMatchDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL || 'https://your-render-app.onrender.com'}/api/matches/${id}`);
      setMatch(response.data);
    } catch (err) {
      setError('Maç detayları yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarMatches = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL || 'https://your-render-app.onrender.com'}/api/matches/similar?homeTeam=${match?.homeTeam}&awayTeam=${match?.awayTeam}`
      );
      setSimilarMatches(response.data.filter(m => m._id !== id));
    } catch (err) {
      console.error('Benzer maçlar yüklenirken hata:', err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!match) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">Maç bulunamadı</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {match.league}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center">
              {match.homeTeam}
            </Typography>
            {match.result && (
              <Typography variant="h3" align="center" color="primary">
                {match.result.homeScore}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center">
              {match.awayTeam}
            </Typography>
            {match.result && (
              <Typography variant="h3" align="center" color="primary">
                {match.result.awayScore}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Maç Bilgileri
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">
              Tarih: {new Date(match.date).toLocaleDateString('tr-TR')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1">
              Oranlar: {match.odds.home} - {match.odds.draw} - {match.odds.away}
            </Typography>
          </Grid>
          {match.result && (
            <Grid item xs={12} md={4}>
              <Typography variant="body1">
                Sonuç: {match.result.winner === 'home' ? match.homeTeam : 
                       match.result.winner === 'away' ? match.awayTeam : 'Berabere'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      {match.statistics && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            İstatistikler
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">
                Top Hakimiyeti: {match.statistics.possession.home}% - {match.statistics.possession.away}%
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">
                Şutlar: {match.statistics.shots.home} - {match.statistics.shots.away}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1">
                İsabetli Şutlar: {match.statistics.shotsOnTarget.home} - {match.statistics.shotsOnTarget.away}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {similarMatches.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Benzer Maçlar
          </Typography>
          <Grid container spacing={2}>
            {similarMatches.map((similarMatch) => (
              <Grid item xs={12} key={similarMatch._id}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body1">
                    {new Date(similarMatch.date).toLocaleDateString('tr-TR')} - {similarMatch.league}
                  </Typography>
                  <Typography variant="body1">
                    {similarMatch.homeTeam} {similarMatch.result?.homeScore} - {similarMatch.result?.awayScore} {similarMatch.awayTeam}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Oranlar: {similarMatch.odds.home} - {similarMatch.odds.draw} - {similarMatch.odds.away}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default MatchDetail; 