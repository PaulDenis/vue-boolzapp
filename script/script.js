// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto, ricavandoli dall'array contacts qui allegato

var app = new Vue({
    el: "#app",
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
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
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
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
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        activeIndex: 0,
        activeContactImg: "",
        activeContactName: "",
        activeContactOnline: "",
        lastText: "",
        newMessage: "",
        searchFor: ""
    },
    methods: {
        getImg: function(contact) {
            
            // console.log(this.activeContact);
            return `img/avatar${contact.avatar}.jpg`;
        },
        getLastMessage: function (contact) {
            return contact.messages[contact.messages.length - 1]; 
        },
        textLenght: function(contact) {
            let text = this.getLastMessage(contact).text;
            if (text.length < 30) {
                return text;
            } else {
                return `${text.substring(0, 29)}...`;
            }
        },
        setActive: function(index) {
            // console.log(index);
            this.activeIndex = index;
            var activeContact = this.contacts[index];
            this.activeContactImg = `img/avatar${activeContact.avatar}.jpg`;
            this.activeContactName = activeContact.name;
            this.activeContactOnline = this.getLastMessage(activeContact).date
            // console.log(this.activeContactOnline);
            // console.log(activeContact);
        },
        sendMessage: function(value) {
            // console.log(this.activeIndex);
            this.contacts[this.activeIndex].messages.push({
                date:dayjs().format("DD/MM/YYYY HH:mm:ss"),
                text:value, 
                status:"sent",
            });
            this.newMessage="";
            this.answer();
        },
        answer: function() {
            setTimeout(() => {
                this.contacts[this.activeIndex].messages.push(
                    {
                        date:dayjs().format("DD/MM/YYYY HH:mm:ss"),
                        text: "ok",
                        status: "received"
                    });
            }, 1000);
        }
    },
    mounted () {
        this.setActive(this.activeIndex);
    },
    updated () {
        let messages = document.getElementsByClassName("message");
        let LastMSG = messages[messages.length - 1];
        LastMSG.scrollIntoView();

        for (let i=0; i < this.contacts.length; i++) {
            let lowerName = this.contacts[i].name.toLowerCase();
            if (lowerName.startsWith(this.searchFor.toLowerCase())) {
                this.contacts[i].visible = "ture";
            } else {
                this.contacts[i].visible = false;
            }
        }

    }
})