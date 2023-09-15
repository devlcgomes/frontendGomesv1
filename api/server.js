const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api/cep/:streetName", async (req, res) => {
  const { streetName } = req.params;
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${streetName}/json/`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar CEP" });
  }
});

app.listen(port, () => {
  console.log(`Servidor intermediário está rodando na porta ${port}`);
});
