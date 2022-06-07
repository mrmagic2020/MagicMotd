const logger = new NIL.Logger(`test`);
const path = require(`path`);
const api_url = `https://motdbe.blackbe.xyz/status_img?host=`
const { segment } = require(`oicq`);

const config = JSON.parse(NIL.IO.readFrom(path.join(__dirname, `config.json`)));
const host = config.host;
const cmd = config.cmd;

function getText(e) {
    var rt = '';
    for (i in e.message) {
        switch (e.message[i].type) {
            case "text":
                rt += e.message[i].text;
                break;
        }
    }
    return rt;
}

class MagicMotd extends NIL.ModuleBase{
    onStart(api){
        logger.setTitle(`MagicMotd`);
        logger.info(`MagicMotd loaded!`);
        api.listen(`onMainMessageReceived`, (e) => {
            let text = getText(e);
            let pt = text.split(` `);

            if(pt[0] == cmd){
                switch(pt.length){
                    case 1:
                        var pic_url = api_url + host;
                        var pic = segment.image(pic_url);
                        pic.asface = false;
                        e.reply(pic);
                        break
                    case 2:
                        var pic_url = api_url + pt[1];
                        var pic = segment.image(pic_url);
                        pic.asface = false;
                        e.reply(pic);
                        break
                    default:
                        e.reply(`格式：` + cmd + ` <IP:地址(可选)>`)
                }
            }
        })
    }
}


module.exports = new MagicMotd