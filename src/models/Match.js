const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  league: {
    type: String,
    required: true
  },
  odds: {
    home: {
      type: Number,
      required: true
    },
    draw: {
      type: Number,
      required: true
    },
    away: {
      type: Number,
      required: true
    }
  },
  result: {
    homeScore: Number,
    awayScore: Number,
    winner: String // 'home', 'away', 'draw'
  },
  statistics: {
    possession: {
      home: Number,
      away: Number
    },
    shots: {
      home: Number,
      away: Number
    },
    shotsOnTarget: {
      home: Number,
      away: Number
    }
  }
}, {
  timestamps: true
});

// Benzer maçları bulmak için index
matchSchema.index({ homeTeam: 1, awayTeam: 1, date: 1 });

module.exports = mongoose.model('Match', matchSchema); 