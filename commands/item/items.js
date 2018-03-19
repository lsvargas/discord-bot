const commando = require("discord.js-commando");
const http = require('http');

class ShowItemCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'item',
            group: 'item',
            memberName: 'item',
            description: 'Gets tibia item description'
        });
    }

    
    async run(message, args){
        
        let search_key = '';

        if (args.split(" ").length == 1){
                search_key = args;
                
        }
        else {
            var array = args.split(" ");
            for (var i in array){
                search_key += array[i] + "+";
            }
            search_key = search_key.slice(0, search_key.length - 1);
            
        }

        let url = "http://tibia.wikia.com/api/v1/Search/List?query="+ search_key +"&limit=25&minArticleQuality=10&batch=1&namespaces=0%2C14";

        
        if (args != ""){
            http.get(url, function(res){
                var body = '';

                res.on('data', function(chunk){
                    body += chunk;
                });

                res.on('end', function(){                    
                    var response = JSON.parse(body);
                    message.reply(response.items[0].url);
                });
            }).on('error', function(e){
                console.log("Got an error: ", e);
        });
    }

    }
}

module.exports = ShowItemCommand;