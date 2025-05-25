const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/canvasState', async (req, res) => {
	const { matrix, centerPointState } = req.body;

	if (!matrix || centerPointState === undefined) {
		return res.status(400).json({ error: 'matrix and centerPointState are required' });
	}

	try {
		// Search for a pattern that matches
		const pattern = await prisma.canvasPattern.findFirst({
			where: {
				matrix: JSON.stringify(matrix),
				centerPointState: centerPointState,
			},
		});

		if (pattern) {
			res.json({
				isMatch: true,
				title: pattern.title,
				description: pattern.description,
				mainColor: pattern.mainColor,
			});
		} else {
			res.json({
				isMatch: false,
				title: "Unknown Spell",
				description: "The given drawing does not match any known spell.",
				mainColor: "rgb(255, 0, 0)",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
