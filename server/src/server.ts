import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHoursToStringToMinutes } from './utils/convert-hours-to-string'
import { convertMinutestoHoursString } from './utils/convert-minuts-to-hours'



const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    //log:['query']
})

// rota para listagem de games
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select:{
                    ads:true
                }
            }
        }
    })
    return response.json(games);
});

// rota para criação de anuncios
app.post('/games/:id/ads', async (request, response) =>{
    const gameId = request.params.id
    const body = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlayind: body.yearsPlayind,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursToStringToMinutes(body.hourStart),
            hourEnd: convertHoursToStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })
    return response.status(201).json([ad]);
});

// rota de anuncios por game
app.get('/games/:id/ads', async (request, response) => { 
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            yearsPlayind: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            creatdAt: 'desc'
        }
    })
    return response.json(ads.map(ad =>{
        return{
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutestoHoursString(ad.hourStart),
            hourEnd: convertMinutestoHoursString(ad.hourEnd)
        }
    }));
});

// rota de busca de discord  por anuncio
app.get('/ads/:id/discord', async (request, response) => { 
    const adId = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true
        },
        where: {
            id: adId
        }
    })
    return response.json({
        discord: ad.discord
    });
});

app.listen(3333)
