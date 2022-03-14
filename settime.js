module.exports = {
    category: 'Testing',
    description: 'sends reminder',
    expectedArgs: '<Hour> <Minute> <"AM" or "PM">',
    minArgs: 3,
    maxArgs: 3,

    callback: async ({ client, message, args }) => {
        const { guild, channel } = message

        const [hour, minute, clockType] = args

        const content = 'Time to Water the Plants! \n (Click the checkmark below to confirm you have seen this message)'

        const today = new Date()
        const currentHour = today.getHours()
        const currentMinute = today.getMinutes()  

        var scheduledHour = today.getHours()
        var remainingHours = today.getHours()
        
        var remainingMinutes = today.getMinutes()

        if (isNaN(parseInt(hour)) || parseInt(hour) < 1 || parseInt(hour) > 12) {
            message.reply(`Incorrect Hour. You must provide a number from 1-12, you provided "${hour}"`)
            return
        }

        if (isNaN(parseInt(minute)) || parseInt(minute) < 0 || parseInt(minute) > 59) {
            message.reply(`Incorrect Minute. You must provide a number from 00-59, you provided "${minute}"`)
            return
        }

        if (clockType !== 'AM' && clockType !== 'PM') {
            message.reply(`You must provide either "AM" or "PM", you provided "${clockType}"`)
            return
        }
        
        if (clockType == 'AM') {
            scheduledHour =  parseInt(hour)
        } else if (clockType == 'PM') {
            scheduledHour = `${parseInt(hour) + 12}`
        }

        if (parseInt(scheduledHour) >= currentHour) {
            remainingHours = `${parseInt(scheduledHour) - currentHour}`
        } else if (parseInt(scheduledHour) < currentHour) {
            remainingHours = `${24 - (currentHour - parseInt(scheduledHour))}`
        }

        if (parseInt(minute) >= currentMinute) {
            remainingMinutes = `${parseInt(minute) - currentMinute}`
        } else if (parseInt(minute) < currentMinute) {
            remainingMinutes = `${parseInt(minute) - currentMinute}`
        }

        if (parseInt(remainingHours) == 0 && parseInt(minute) < currentMinute) {
            remainingHours = 24
        }

        var remainingTime = `${(parseInt(remainingHours) * 60) + parseInt(remainingMinutes)}`




        message.reply(`Message is scheduled for ${hour}:${minute} ${clockType}`)
        
        var fistMessage = setTimeout(() => {
            message.reply(`${content}`)
            .then ((msg) => (setTimeout(function(){
                msg.react('✅')
            }, 1000)))


            client.on('messageReactionAdd', (reaction,user) => {
                if(user.bot) return
                if(reaction.emoji.name !== "✅") return
                if(user.id !== message.author.id) return
                if(reaction.message.channel.id !== message.channel.id) return
                message.reply('Confirmed')
            })






            var dailyMessage = setInterval(() => {
                message.reply(`${content}`)
                .then ((msg) => (setTimeout(function(){
                    msg.react('✅')
                }, 1000)))


                

                
                











            }, 1000 * 60 * 60 * 24)

        }, 1000 * 60 * parseInt(remainingTime))

        
        


        
        
        

        
        
    }
}
