const WebSocket = require('ws');
const server = new WebSocket.Server({port:'8080'})

const datasetlist = {}
const clients = {}
let setIntervalList = []

server.on('connection', (socket,request) => {
    clients[request.headers.origin] = socket;
    socket.on('message', message => {
        const usingList = JSON.parse(message.toString())
        for (const datasetId of usingList.data) {
            datasetlist[datasetId] = datasetlist[datasetId] ? 
            [...new Set([...datasetlist[datasetId], usingList.origin])] : [usingList.origin]
        }

        setIntervalList.forEach(clearInterval)
        setIntervalList = []

       for (const datasetId in datasetlist) {
        const polling = setInterval(() => {
            
            console.log(datasetId,'polling',)
            /*
                query dataset for client....
            */
            const data = 'data for client yeah'
            datasetlist[datasetId].forEach(origin => {
                clients[origin].send(`${datasetId} ${data}`)
            })
        }, 2000)

        setIntervalList.push(polling)
       }

    })
});



