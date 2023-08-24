import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.post("/movie", async (req, res) => {
	const title = req.body.title;

	try {
		const response = await axios.get(
			`https://netflix54.p.rapidapi.com/search/`,
			{
				params: {
					query: `${title}`,
					offset: "0",
					limit_titles: "15",
					limit_suggestions: "3",
					lang: "en",
				},
				headers: {
					"X-RapidAPI-Key":
						[YOR_KEY],
					"X-RapidAPI-Host": "netflix54.p.rapidapi.com",
				},
			}
		);
		
		const results = response.data.titles;
		res.render("movie.ejs", { results: results });
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred.");
	}
});

app.listen(port, () => {
	console.log(`The port ${port} is being used.`);
});
