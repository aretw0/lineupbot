const Telegraf = require('telegraf');

const {
    Extra,
    Markup
} = require('telegraf');

const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://twitter.com/aretw0'),
    Markup.callbackButton('Apagar', 'delete')
])


const bot = new Telegraf(process.env.BOT_TOKEN)

const helpMsg = `Comandos:
/start - Inicia bot (obrigatórios em grupos)
/get x - Mostra Line-up do festival x
/available - Mostra os festivais disponíveis
/about - Mostra informação sobre o bot
/help - Mostra essas informações`

const inputErrMsg = `Você inseriu um festival indisponível ou desconhecido.
Se você quiser adicionar um entre em contato com o criador deste bot.`;

const aboutMsg = "Este bot foi criado por @aretw0.\nO código fonte e informação sobre contato podem ser encontrados no github https://github.com/aretw0/lineupbot";
const presentMsg = `Olá, eu sou o LineUp_Bot e vou te ajudar a visualizar o line up do seu festival favorito, utilize os comandos para obter o line up desejado.`

function userString(ctx) {
    return JSON.stringify(ctx.from.id == ctx.chat.id ? ctx.from : {
        from: ctx.from,
        chat: ctx.chat
    });
}

function logMsg(ctx) {
    var from = userString(ctx);
    console.log('<', ctx.message.text, from)
}

function logOutMsg(ctx, text) {
    console.log('>', {
        id: ctx.chat.id
    }, text);
}

function getAll() {
    let m =
    `Festivais disponíveis
    -----------------------------
       Data  |       Nome       |  Palcos
    --------- ------------------ --------
    16/11/19 | Coquetel Molotov | 4
    `

    return m
}
function getOne(txt) {
    let m = 
    `Line Cronológico
    -------------------    
     Hora  |               Artista              |       Palco
    ------ | ---------------------------------- | ------------------
     xx:xx | BATESTACA (PE) convida MADDAM (PE) | SOM NA RURAL
     13:00 |             D'RENOR                | SOM NA RURAL
     15:00 |           AVENTURA (PE)            | SONIC
     15:30 |          UANA MAHIN (PE)           | NATURA MUSICAL
     15:30 |               STV                  | SOM NA RURAL
     16:10 |        SILBA CARVALHO (PE)         | SONIC
     16:30 |        CLARICE FALCÃO (PE)         | NATURA MUSICAL
     15:40 |            LADY LAAY               | SOM NA RURAL
     17:00 |                     MC THA (SP)    | CQTL MLTV
     17:20 |                       TORRE (PE)   | SONIC
     17:40 |                   TERNO REI (SP)   | NATURA MUSICAL
     17:50 |                  NUBIAN QUEEN      | SOM NA RURAL
     18:10 |           LIA DE ITAMARACÁ (PE )   | CQTL MLTV
     18:30 |     SATANIQUE SAMBA TRIO (DF)      | SONIC
     18:50 |                 ROSA NEON (MG)     | NATURA MUSICAL
     19:00 |              JHNT (DISONEXA-RN)    | SOM NA RURAL
     19:20 |       SEVDALIZA (IRÂ/HOLANDA)      | CQTL MLTV
     19:40 |             TACO DE GOLFE (SE)     | SONIC
     20:00 |               DRIK BARBOSA (SP)    | NATURA MUSICAL
     20:10 |                         LUPE       | SOM NA RURAL
     20:30 |                  LUIZ LINS (PE)    | CQTL MLTV
     20:50 |                     SASKIA (RS)    | SONIC
     21:10 |                     DENOV (SP)     | NATURA MUSICAL
     21:20 |                MATI (TISCK-RN)     | SOM NA RURAL
     21:40 | LINIKER E OS CARAMELOWS (SP)       | CQTL MLTV
     22:00 |                      BIONE (PE)    | SONIC
     22:20 | DANI COSTA, A QUERIDINHA (PE)      | NATURA MUSICAL
     22:30 |                          LILIT     | SOM NA RURAL
     23:00 |               BLACK ALIEN (SP)     | CQTL MLTV
     23:10 |                  JURANDEX (PE)     | SONIC
     23:30 |                 OQUADRO (BA)       | NATURA MUSICAL
     23:40 |                        BAYMA       | SOM NA RURAL
     00:20 |                  COPPOLA (SP)      | CQTL MLTV
     00:20 |                      RAÇA (SP)     | SONIC
     00:40 |                REVÉRSE DJS (PE)    | NATURA MUSICAL
     00:50 |               GUI BORATTO (SP)     | CQTL MLTV
     01:00 |         NADEJDA B2B AVENOIR        | SOM NA RURAL
     01:50 |                   GOP TUN (SP)      | NATURA MUSICAL`

    return m
}

//get username for group command handling
bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
    console.log("Inicializado", botInfo.username);
});


bot.command('help', ctx => {
    logMsg(ctx);
    logOutMsg(ctx, helpMsg);
    ctx.reply(helpMsg);
});

bot.command('about', ctx => {
    logMsg(ctx);
    logOutMsg(ctx, aboutMsg);
    ctx.reply(aboutMsg);
});


bot.command('start', ctx => {
    logMsg(ctx);
    var m = presentMsg;
    ctx.reply(m);
    logOutMsg(ctx, m);
    setTimeout(() => {
        ctx.reply(helpMsg);
        logOutMsg(ctx, helpMsg)
    }, 50); //workaround to send this message definitely as second message
});

bot.action('delete', ({ deleteMessage }) => deleteMessage())

bot.command('getall', ctx => {
    logMsg(ctx)
    ctx.reply(getAll(),Extra.markdown(),Extra.markup(keyboard))
})

bot.command('get', ctx => {
    logMsg(ctx)
    ctx.reply(getOne(),Extra.markdown(),Extra.markup(keyboard))
})

bot.launch();