const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require('./token.json');
const prefix = "$"
const fs = require('fs')
const bdd = require("./bdd.json")

bot.on("ready", async () => {
  bot.user.setStatus("online");
  bot.user.setActivity("Bot De MatNCode tjrs la pour vous servir", {type: "PLAYING"});
  console.log("bot on!");
})

bot.on("message", async message => {
  if(message.content.startsWith(prefix + "say")){
    message.delete()
    let msg = message.content.slice(4)
    if(!msg) return message.reply("Veuillez Entrer Un Message.")

    let embed = new Discord.MessageEmbed()
    .setDescription(msg)
    message.channel.send(embed)
  }

  if(message.content.startsWith(prefix + "clear")){
    message.delete();
    if(message.member.hasPermission("MANAGE_MESSAGES")){
      let args = message.content.trim().split(/ +/g)

      if(args[1]){
        if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

          message.channel.bulkDelete(args[1]);
          
        }
      }
    }
    
  }

  if(message.content.startsWith(prefix + "regle1")){
    message.delete()
    message.channel.send("Toute insulte sera sanctionée par un un bannissement temporaire")
  }
  if(message.content.startsWith(prefix + "regle2")){
    message.delete()
    message.channel.send("Une ou plusieurs insulte homophobe, xénophobe, grossophobe, heterophobe ou autres envers une personne sera sanctionée par un bannissement définitif ou indéterminé après le jugement ")
  }
  if(message.content.startsWith(prefix + "regle3")){
    message.delete()
    message.channel.send("Une usurpassion d'identité ou piratage de compte étant dans ce serveur est STRICTEMENT interdit sous peine de signalement et exclusion définitive")
  }
  if(message.content.startsWith(prefix + "regle4")){
    message.delete()
    message.channel.send("Le contenu a caractère pornographique est interdit dans ce serveur sous peine de d'exclusion et de signalement ")
  }
  if(message.content.startsWith(prefix + "regle5")){
    message.delete()
    message.channel.send("La politesse est la bienvenue dans ce serveur contrairement aux insultes ")
  }
  if(message.content.startsWith(prefix + "regle6")){
    message.delete()
    message.channel.send("Tout message insultant ou moqueur vers une personne et ses efforts ou sa personnalité est sanctioné et supprimé par la suite")
  }
  if(message.content.startsWith(prefix + "reglement")){
    message.delete()
    message.channel.send("Toute insulte sera sanctionée par un un bannissement temporaire ! Une ou plusieurs insulte homophobe, xénophobe, grossophobe, heterophobe ou autres envers une personne sera sanctionée par un bannissement définitif ou indéterminé après le jugement! Une usurpassion d'identité ou piratage de compte étant dans ce serveur est STRICTEMENT interdit sous peine de signalement et exclusion définitive ! Le contenu a caractère pornographique est interdit dans ce serveur sous peine de d'exclusion et de signalement ! La politesse est la bienvenue dans ce serveur contrairement aux insultes ! Tout message insultant ou moqueur vers une personne et ses efforts ou sa personnalité est sanctioné et supprimé par la suite")
  }
  if(message.content.startsWith("coucou")){
    message.reply(messages.coucou)
  }
  if(message.content.startsWith(prefix + "warn")){
    if(message.member.hasPermission('BAN_MEMBERS')){
      
      if(!message.mentions.users.first()) return;

      utilisateur = message.mentions.users.first().id

      if(bdd["warn"][utilisateur] == 2){
        message.guild.members.ban(utilisateur)
        message.channel.send(utilisateur + "a été banni")
        
      } else{
        if(!bdd["warn"][utilisateur]){
          bdd["warn"][utilisateur] = 1
          SaveBDD();
          message.channel.send("Tu as " + bdd["warn"][utilisateur] + " avertissements")
          
        }
        else{
          bdd["warn"][utilisateur]++
          SaveBDD();
          message.channel.send("Tu as " + bdd["warn"][utilisateur] + " avertissements")
        }
      }
      
    }
  }
  
  if(message.content.startswith(prefix + "ban"){
      if(message.member.hasPermission('BAN_MEMBERS')) {
    
        let args = message.content.trim().split(/ +/g)
        
        utilisateur = message.mentions.member.first();
        temps = args[2]
        raison = args[3]
        
        if(!utilisateur) {
          return;
        }else {
          message.guild.members.ban(utilisateur.id);
          setTimeout(function(){
            message.guild.members.unban(utilisateur.id)
          }, temps*1000)
        }
          
        }
      }
     }
})



function SaveBDD() {
  fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
    if(err) message.channel.send("une erreur est survenue")
  });
}


bot.login(process.env.TOKEN);
