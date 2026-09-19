const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URL || 'mongodb://db:27017/notesdb');

const Note = mongoose.model('Note', { text: String });

app.get('/api/notes', async (req,res) => res.json(await Note.find()));
app.post('/api/notes', async (req,res) => {
  const n = await Note.create({ text: req.body.text });
  res.json(n);
});
app.delete('/api/notes/:id', async (req,res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ok:true});
});

app.listen(80, () => console.log('Notes app on 80'));
