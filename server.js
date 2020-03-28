// usei o express pra criar e configurar meu servidor
const express = require ('express')
const server = express()

const db = require ('./db')
//criamos uma variavel aqui e apagamos o restante que estava no index e deixamos somente 1 como modelo.

// const ideas = [
//     {
//         img:'https://image.flaticon.com/icons/svg/2729/2729007.svg',
//         title:'Cursos de Programação',
//         category: 'Estudo',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
//         url: 'https://rocketseat.com.br'

//     },
//     {
//         img:'https://image.flaticon.com/icons/svg/2729/2729005.svg',
//         title:'Exercícios',
//         category: 'Saúde',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
//         url: 'https://rocketseat.com.br'

//     },
//     {
//         img:'https://image.flaticon.com/icons/svg/2729/2729027.svg',
//         title:'Meditação',
//         category: 'Mentalidade',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
//         url: 'https://rocketseat.com.br'

//     },
//     {
//         img:'https://image.flaticon.com/icons/svg/2729/2729032.svg',
//         title:'Karaokê',
//         category: 'Diversão em Familia',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
//         url: 'https://rocketseat.com.br'

//     },
// ]

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static('public'))

// habilitar uso do req.body
server.use(express.urlencoded ({extended: true}))

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
    db.all (`SELECT * FROM ideas`, function(err, rows){
            if (err) {
            console.log(err)
               return  res.send('Erro no bando de Dados!')
         }

                const reversedIdeas = [...rows].reverse()

                let lastIdeas = []
                 for (idea of reversedIdeas) {
                    if (lastIdeas.length < 2 ) {
                        lastIdeas.push(idea)
                    }
                }
                
                return res.render( 'index.html', {ideas: lastIdeas } )
        })


               
            })
   
     

server.get('/ideias', function(req, res) {
    db.all (`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
       return  res.send('Erro no bando de Dados!')
     }
        const reversedIdeas = [...rows].reverse()

        return res.render('ideias.html', { ideas: reversedIdeas})
    })
  })


  server.post('/', function (req, res){
     //Criar a Tabela
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY  AUTOINCREMENT,
            image TEXT, 
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
         );
    
      ` )

    // Inserir dados na tabela
    const query=`

        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `         
            const values = [
              req.body.image, 
              req.body.title,
              req.body.category,
              req.body.description,
              req.body.link,          
            
            ]

            db.run(query, values, function(err) {
                if (err) {
                    console.log(err)
               return  res.send('Erro no bando de Dados!')
             }
                return res.redirect('/ideias')

            })

    // Deletar um dado da Tabela
    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
    //     if (err) return console.log(err)

    //     console.log("DELETEI", this)
    // })

    // Consultar dados na tabela
    db.all (`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })

  })



// server.get('/', function(req, res) {
//     return res.sendFile(__dirname + '/index.html')
// })

// server.get('/ideias', function(req, res) {
//     return res.sendFile(__dirname + '/ideias.html')
// })

//liguei meu servidor na porta 3000 
server.listen(3000)

