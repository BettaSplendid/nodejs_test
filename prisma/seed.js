// import { PrismaClient, Prisma } from '@prisma/client';

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
var json_file = require('../inventory.json');

async function main() {
    for (var p of json_file.articles) {
        console.log(p)
        await prisma.articles.create({
            data: p,
        });
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })