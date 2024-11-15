const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let topScores = []; // Хранилище для топов в памяти

// Обработка сохранения результата
app.post('/api/save-score', (req, res) => {
  const { name, score } = req.body;

  // Добавление нового результата в список
  topScores.push({ name, score });
  topScores.sort((a, b) => b.score - a.score);

  // Убираем результаты сверх топ-5
  if (topScores.length > 5) topScores.pop();

  res.json(topScores); // Отправляем обновленный список топов
});

// Обработка получения топов
app.get('/api/get-scores', (req, res) => {
  res.json(topScores); // Отправляем текущий список топов
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
