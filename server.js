app.get('/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    res.send(`Viewing service projects for category ID: ${categoryId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});