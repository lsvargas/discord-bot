const commando = require('discord.js-commando');
const http = require('http');
const Discord = require("discord.js");
const request = require('request');


class ShowGuildCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'guild',
            group: 'guild',
            memberName: 'guild',
            description: 'Shows guild online members by name'
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

        /* Generate custom url */
        let url = 'https://api.tibiadata.com/v1/guild/'+ search_key +'.json';

        if (args != ""){
            message.reply(url);
            request.get(url, (error, response, body) => {
                let json = JSON.parse(body);
                /* Create embed */
                const embed = new Discord.RichEmbed()
                .setColor(0x00AE86);                

                let online_sorcerers = "";
                let online_druids = "";
                let online_knights = "";
                let online_paladins = "";

                /* Separate in groups of vocation */
                var sorcerers = [];
                var druids = [];
                var knights = [];
                var paladins = [];

                /* guild*/
                if (!json.guilds.hasOwnProperty('error')){
                    for (let i in json.guilds.members){
                                                
                        for (let k in json.guilds.members[i].characters){
                            /* Show online members */ 
                            if (json.guilds.members[i].characters[k].status == "online" ) {

                                if (json.guilds.members[i].characters[k].vocation == "Master Sorcerer"){
                                    sorcerers.push(json.guilds.members[i].characters[k].name + " (" + json.guilds.members[i].characters[k].level + ") " + "\n");
                                }
                                else if (json.guilds.members[i].characters[k].vocation == "Elder Druid"){
                                    druids.push(json.guilds.members[i].characters[k].name + " (" + json.guilds.members[i].characters[k].level + ") " + "\n");
                                }

                                else if (json.guilds.members[i].characters[k].vocation == "Elite Knight") {
                                    knights.push(json.guilds.members[i].characters[k].name + " (" + json.guilds.members[i].characters[k].level + ") " + "\n");
                                }

                                else if (json.guilds.members[i].characters[k].vocation == "Royal Paladin") {
                                    paladins.push(json.guilds.members[i].characters[k].name + " (" + json.guilds.members[i].characters[k].level + ") " + "\n");
                                }                               
                            }
                        }
                    }
                    let online = 0;

                    for (let i in sorcerers){
                        online_sorcerers += sorcerers[i];
                        online += 1;
                    }
                    embed.addField("Master Sorcerers", online_sorcerers);

                    for (let i in knights){
                        online_knights += knights[i];
                        online += 1;
                    }
                    embed.addField("Elite Knights", online_knights);

                    for (let i in paladins){
                        online_paladins += paladins[i];
                        online += 1;
                    }
                    embed.addField("Royal Paladin", online_paladins);

                    for (let i in druids){
                        online_druids += druids[i];
                        online += 1;
                    }
                    embed.addField("Elder Druids", online_druids);

                    /* Add number of online members*/                    
                    
                    embed.setTitle(args + "   ["+ online + "] \n");
                    message.channel.send({embed});
                    

                }
                /* Guild not found */
                else {
                    message.reply(json.guilds.error);
                }

            });
        }
    }

}

module.exports = ShowGuildCommand;