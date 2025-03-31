import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    league: '',
    team: '',
    date: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, [filters]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.league) params.append('league', filters.league);
      if (filters.team) params.append('team', filters.team);
      if (filters.date) params.append('date', filters.date);

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL || 'https://your-render-app.onrender.com'}/api/matches?${params}`);
      setMatches(response.data);
    } catch (err) {
      setError('Maçlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field) => (event) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleMatchClick = (matchId) => {
    navigate(`/matches/${matchId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Maç Listesi
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Lig</InputLabel>
              <Select
                value={filters.league}
                label="Lig"
                onChange={handleFilterChange('league')}
              >
                <MenuItem value="">Tümü</MenuItem>
                <MenuItem value="Süper Lig">Süper Lig</MenuItem>
                <MenuItem value="Premier Lig">Premier Lig</MenuItem>
                <MenuItem value="La Liga">La Liga</MenuItem>
                <MenuItem value="Bundesliga">Bundesliga</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Takım"
              value={filters.team}
              onChange={handleFilterChange('team')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Tarih"
              value={filters.date}
              onChange={handleFilterChange('date')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} md={6} lg={4} key={match._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {match.league}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {match.homeTeam} vs {match.awayTeam}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(match.date).toLocaleDateString('tr-TR')}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Oranlar: {match.odds.home} - {match.odds.draw} - {match.odds.away}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleMatchClick(match._id)}
                >
                  Detayları Gör
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MatchList; 