// usei o express pra criar e configurar meu servidor
const express = require ('express')
const server = express()

//criamos uma variavel aqui e apagamos o restante que estava no index e deixamos somente 1 como modelo.

const ideas = [
    {
        img:'https://image.flaticon.com/icons/svg/2729/2729007.svg',
        title:'Cursos de Programação',
        category: 'Estudo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        url: 'https://rocketseat.com.br'

    },
    {
        img:'https://image.flaticon.com/icons/svg/2729/2729005.svg',
        title:'Exercícios',
        category: 'Saúde',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        url: 'https://rocketseat.com.br'

    },
    {
        img:'https://image.flaticon.com/icons/svg/2729/2729027.svg',
        title:'Meditação',
        category: 'Mentalidade',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        url: 'https://rocketseat.com.br'

    },
    {
        img:'https://image.flaticon.com/icons/svg/2729/2729032.svg',
        title:'Karaokê',
        category: 'Diversão em Familia',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        url: 'https://rocketseat.com.br'

    },
]

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static('public'))


//configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
    express: server,
    noCache: true, //variavel boolean
})


//crie uma rota /
//e capturo o pedido do cliente para responder

// rota  mudar render quando utliza NUNJUCKS , (NPM I nunjucks)

 /*  tanto faz incluir o let ou nao   for ( let idea of ideas) {a)*/ 
//foi trocado a variavel const por let pois a  const não pode variar.
server.get('/', function(req, res) {
   
        const reversedIdeas = [...ideas].reverse()

        let lastIdeas = []
         for (idea of reversedIdeas) {
            if (lastIdeas.length < 2 ) {
                lastIdeas.push(idea)
            }
        }
        
        return res.render( 'index.html', {ideas: lastIdeas } )
})

server.get('/ideias', function(req, res) {

    const reversedIdeas = [...ideas].reverse()

    return res.render('ideias.html', { ideas: reversedIdeas})
})




// server.get('/', function(req, res) {
//     return res.sendFile(__dirname + '/index.html')
// })

// server.get('/ideias', function(req, res) {
//     return res.sendFile(__dirname + '/ideias.html')
// })

//liguei meu servidor na porta 3000 
server.listen(3000)

