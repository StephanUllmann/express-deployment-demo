export default function errorHandler(err, _req, res, _next) {
  console.log(err);
  res.status(err.statusCode || 500).json({ error: err.message });
}
