const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const jwt = require('jsonwebtoken');

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gizli-anahtar');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Lütfen giriş yapın' });
  }
};

// Tüm maçları getir
router.get('/', async (req, res) => {
  try {
    const { league, date, team } = req.query;
    let query = {};

    if (league) query.league = league;
    if (date) query.date = new Date(date);
    if (team) {
      query.$or = [
        { homeTeam: team },
        { awayTeam: team }
      ];
    }

    const matches = await Match.find(query).sort({ date: -1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Benzer maçları bul
router.get('/similar', async (req, res) => {
  try {
    const { homeTeam, awayTeam, league } = req.query;
    
    const matches = await Match.find({
      $or: [
        { homeTeam, awayTeam },
        { homeTeam: awayTeam, awayTeam: homeTeam }
      ],
      league: league || { $exists: true }
    }).sort({ date: -1 });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Maç detaylarını getir
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Maç bulunamadı' });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Yeni maç ekle (sadece admin)
router.post('/', auth, async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

module.exports = router; 