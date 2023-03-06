import express from "express";

const app = express();

const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];

app.get("/search", (req, res) => {
  const query = req.query.q
  const result = data.filter(item => item.name.includes(query));
  res.json(result);
});

app.listen(3000, () => {
  console.log("API server started on port 3000");
});

export default app