const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
	const rawData = fs.readFileSync('./prisma/data.json');
	const patterns = JSON.parse(rawData);

	// Prepare the data with stringified matrices
	const preparedData = patterns.map(item => ({
		...item,
		matrix: JSON.stringify(item.matrix)
	}));

	console.log(`🚀 Seeding ${preparedData.length} patterns...`);

	await prisma.canvasPattern.createMany({
		data: preparedData
	});

	console.log('✅ Seeding complete');
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
