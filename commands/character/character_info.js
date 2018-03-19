const commando = require('discord.js-commando');
const http = require('http');
const Discord = require("discord.js");
const request = require('request');


class ShowCharacterCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'character',
            group: 'character',
            memberName: 'character',
            description: 'Gets character description by name'
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

        let url = 'https://api.tibiadata.com/v1/characters/'+ search_key +'.json';        

        
        if (args != ""){
            request.get(url, (error, response, body) => {
                let json = JSON.parse(body);

                if (!json.characters.hasOwnProperty('error')){
                    
                    const embed = new Discord.RichEmbed()
                    .setTitle("Tibia Character Information")
                    .setColor(0x00AE86)
                    .setDescription('Name: '+ json.characters.data.name  +
                    '\nSex: '+ json.characters.data.sex  +
                    '\nVocation: '+ json.characters.data.vocation +
                    '\nLevel: '+ json.characters.data.level +
                    '\nWorld: '+ json.characters.data.world +
                    '\nResidence: '+ json.characters.data.residence +
                    '\nAccount Status: '+ json.characters.data.account_status
                    )
                    .setURL('https://secure.tibia.com/community/?subtopic=characters&name=' + search_key);

                    if (json.characters.deaths.length == 0){
                        if (json.hasOwnProperty('guild')){
                            embed.addField("Guild", json.characters.data.guild.rank + " of the " + json.characters.data.guild.name);
                        }
                        embed.addField('Characters last 3 deaths',
                            "This character has no recent deaths"
                        );
                        message.channel.send({embed});

                    }

                    else if (json.characters.deaths.length > 2){
                        if (json.hasOwnProperty('guild')){
                            embed.addField("Guild", json.characters.data.guild.rank + " of the " + json.characters.data.guild.name);
                        }
                        embed.addField('Characters last 3 deaths',
                        json.characters.deaths[0].date.date.slice(0, 10) + " | " + " Died at level " + json.characters.deaths[0].level + " " + json.characters.deaths[0].reason + "\n \n" +
                        json.characters.deaths[1].date.date.slice(0, 10) + " | " + " Died at level " + json.characters.deaths[1].level + " " + json.characters.deaths[1].reason + "\n \n" +
                        json.characters.deaths[2].date.date.slice(0, 10) + " | " + " Died at level " + json.characters.deaths[2].level + " " + json.characters.deaths[2].reason + "\n"
                        );

                        message.channel.send({embed});                 
                    }

                    else if (json.characters.deaths.length == 2){
                        if (json.hasOwnProperty('guild')){
                            embed.addField("Guild", json.characters.data.guild.rank + " of the " + json.characters.data.guild.name);
                        }
                        embed.addField('Characters last 3 deaths',
                        json.characters.deaths[0].date.date.slice(0, 10) + " | " + " Died at level " + json.characters.deaths[0].level + " " + json.characters.deaths[0].reason + "\n \n" +
                        json.characters.deaths[1].date.date.slice(0, 10) + " | " + " Died at level " + json.characters.deaths[1].level + " " + json.characters.deaths[1].reason + "\n"
                        );

                        message.channel.send({embed});
                    }

                    else{             

                        if (json.hasOwnProperty('guild')){
                            embed.addField("Guild", json.characters.data.guild.rank + " of the " + json.characters.data.guild.name);
                        }
                        embed.addField('Characters last 3 deaths',
                        json.characters.deaths[0].date.date.slice(0, 10) + " | " + " Died at level " + json.characters.deaths[0].level + " " + json.characters.deaths[0].reason + "\n"
                        );
                        message.channel.send({embed});
                    }
                }
                else {
                    message.reply(json.characters.error);
                }          

            });
        }


    }

}

module.exports = ShowCharacterCommand;