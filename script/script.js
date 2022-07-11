const app = new Vue({
    el:'#app',
    data : {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        currentIndex : 0,
        newMsgToAdd : '',
        userSearch : '',
        showInfo : {
            indexContact : null,
            indexMessage : null,
        },
    },
    methods : {
        addingImgName(scrollingIndex){
            let fullName = `./img/avatar${this.contacts[scrollingIndex].avatar}.jpg`;
            return fullName;
        },
        changeCurrentIndex(index){
            this.currentIndex = index
            this.userSearch = ''
            for(let i = 0; i < this.contacts.length ; i++ ){
                this.contacts[i].visible = true
            }
            this.showInfo = {}
        },
        getHourFromArray(dateToSlice){
            let date = dateToSlice.split(" ");
            let dateNoSec = date[1].split(":")
            return dateNoSec[0] + ':' + dateNoSec[1];
        },
        getDate(){
            let currentDate = new Date().toLocaleString()
            let arrayDate = currentDate.split(',')
            let formattedDate =`${arrayDate[0]}${arrayDate[1]}`
            return formattedDate
        },

        addMessage(message , choice){
            if(this.newMsgToAdd !== ''){

                this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: message, status : choice})

                setTimeout(()=>{
                    this.dialogue(this.lastMsg(this.currentIndex))
                },1000)
                this.newMsgToAdd=''
            }
            
        },
        lastMsg(index){
            let lengthArray = (this.contacts[index].messages.length) - 1
            return this.contacts[index].messages[lengthArray].message
        },
        lastDate(index){
            let lengthArray = (this.contacts[index].messages.length) - 1
            return this.contacts[index].messages[lengthArray].date
        },
        searchingUser(){
           let newString = this.userSearch.toLowerCase()
            for(let i = 0; i < this.contacts.length ; i++ ){
               if(this.contacts[i].name.toLowerCase().includes(newString)){
                    this.contacts[i].visible = true
               }
               else{
                    this.contacts[i].visible = false
               }
               console.log( this.contacts[i].visible)
            }
        },
        showingInfoMessage(index){
            if(this.showInfo.indexContact== this.currentIndex && this.showInfo.indexMessage == index){
                this.showInfo = {}
            }
            else{
            this.showInfo = {
                indexContact : this.currentIndex,
                indexMessage : index,
            }}
        },
        isActive(index){
            return this.showInfo.indexContact === this.currentIndex && this.showInfo.indexMessage===index
        },
        messageToDelete(index){
            this.contacts[this.currentIndex].messages.splice(index,1)
            this.showInfo = {}
        },
        dialogue(newMessage){
            switch (newMessage){
                case 'ciao' : 
                    console.log(newMessage);
                    this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: 'ciao!', status : 'received'});
                    break;
                case 'come va?':
                    this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: 'tutto bene, tu?', status : 'received'});
                    break;
                case 'bene' :
                    this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: 'bene!', status : 'received'});
                    break;
                case 'male' :
                    this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: 'mi dispiace', status : 'received'});
                    break;
                case 'mi presti dei soldi?':
                    this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: 'dai passami l\'iban', status : 'received'});
                    break;
                case 'stasera cena fuori?':
                    this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: 'daje, asian fusion?', status : 'received'});
                    break;
                case 'si':
                    this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: ':D', status : 'received'});
                    break;
                default : 
                    console.log(newMessage);
                    this.contacts[this.currentIndex].messages.push({date: this.getDate(), message: 'OK!', status : 'received'});
                    break;
            }
        },
        chatToTheTop() {
            let  currentObject= this.contacts[this.currentIndex];
            this.contacts.splice(this.currentIndex, 1);
            this.contacts.unshift(currentObject);
            this.currentIndex = 0;
        }, 
    }
})

