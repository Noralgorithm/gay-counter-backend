import { Socket, io } from 'socket.io-client'
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../server.interfaces'
import { Response } from '../gay-counter/domain/response.interface'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3002', {
    auth: {
      token: 'jesusmelelacasco.com'
    }
  }
)

socket.on('connect', () => {
  console.log('Connected to server!')
})

socket.on('sendedPlayers', (res: Response) => {
  console.log(res)
})

socket.on('sendedHistory', (res: Response) => {
  console.log(res)
})

socket.on('updatedCounter', (res: Response) => {
  console.log(res)
})

socket.on('sendedCount', (res: Response) => {
  console.log(res)
})

socket.on('sendedRanking', (res: Response) => {
  console.log('RANKING => ', res)
})

/* setTimeout(() => {
  [
    {
      "id": 1,
      "name": "Salcedinho",
      "score": 10,
      "img": "https://estaticos-cdn.sport.es/clip/b3cbc755-bae9-482e-bfaa-314b9990f4cf_alta-libre-aspect-ratio_default_0.jpg",
      "updatedAt": "ago"
    },
    {
      "id": 2,
      "name": "Rouses",
      "score": 12,
      "img": "https://i.ytimg.com/vi/H9SKnK8mvy0/maxresdefault.jpg",
      "updatedAt": "ago"
    },
    {
      "id": 3,
      "name": "Nora",
      "score": 42,
      "img": "https://somoskudasai.com/wp-content/uploads/2021/03/portada_evangelion-67.jpg",
      "updatedAt": "ago"
    },
    {
      "id": 4,
      "name": "Meows",
      "score": 31,
      "img": "https://www.teameevee.com/wp-content/uploads/2022/11/meowscarada-797x1024.png",
      "updatedAt": "ago"
    },
    {
      "id": 5,
      "name": "Yisusinho",
      "score": 999,
      "img": "https://i1.sndcdn.com/avatars-000778198936-ccrt1j-t500x500.jpg",
      "updatedAt": "ago"
    },
    {
      "id": 6,
      "name": "Vector",
      "score": 41,
      "img": "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F001%2F468%2F202%2Fb02.jpg",
      "updatedAt": "ago"
    },
    {
      "id": 7,
      "name": "Chocobola",
      "score": 41,
      "img": "https://samasa.es/2737-large_default/conguitos-chocobolas-.jpg",
      "updatedAt": "ago"
    },
    {
      "id": 8,
      "name": "Vilma",
      "score": 41,
      "img": "https://diariocriterio.com/storage/2023/02/Vilma-1024x683.jpg",
      "updatedAt": "ago"
    },
    {
      "id": 9,
      "name": "Pan",
      "score": 40,
      "img": "https://gourmetdemexico.com.mx/wp-content/uploads/2018/05/sandwich-de-queso-portada.jpg",
      "updatedAt": "ago"
    }
  ].forEach(player => socket.emit('createPlayer', player.name, player.img))
  
}, 1000)
 */

setTimeout(() => {
  socket.emit('incrementCounter', 3, 4)
}, 1000)
