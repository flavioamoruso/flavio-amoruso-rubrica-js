// campi input
let nameInput = document.querySelector('#nameInput')
let numberInput = document.querySelector('#numberInput')

// button
let showBtn = document.querySelector('#showBtn')
let addBtn = document.querySelector('#addBtn')
let editBtn = document.querySelector('#editBtn')



// container
let containerList = document.querySelector('#containerList')


let rubrica = {
    
    listaContatti: [
        {name: `Mario`, number: 1234567890},
        {name: `Anna`, number: 9876543210},
        {name: `Giorgio`, number: 8765432123}
    ],
    
    // funzione mostra contatti
    showContacts: function() {
        this.listaContatti.forEach((contatto)=>{
            let div = document.createElement('div')
            div.classList.add(`d-flex`, `justify-content-around`, `my-3`)
            div.innerHTML = `<h3>${contatto.name}</h3>
            <p class="text-secondary">${contatto.number}</p>
            <i class="bi bi-trash-fill display-4 text-danger" id="${contatto.name}"></i>`
            containerList.appendChild(div)
        })
        
        // cattura cestino
        let removeBtn = document.querySelectorAll('.bi-trash-fill')
        removeBtn.forEach((btn)=>{
            let name = btn.id
            btn.addEventListener('click', ()=>{
                this.removeContacts(name)
                containerList.innerHTML = ``
                this.showContacts()
            })
        })
        
        
    },
    
    // funzione aggiungi contatto
    addContacts: function(newName, newNumber){
        if(newNumber.length == 10){
            this.listaContatti.push({name: newName, number: newNumber})
            this.showContacts()
        }else{
            alert(`numero non valido`)
        }
        
    },
    
    // funzione rimuovi contatto
    removeContacts:function(removeName){
        let names=this.listaContatti.map((contact)=>contact.name)
        let index=names.indexOf(removeName)
        this.listaContatti.splice(index,1)
        
    },
    
    // funzione modifica contatto
    editContacts:function(nome,numero){
        
        this.listaContatti.forEach((contatto)=>{
            if(contatto.name==nome){
                contatto.number=numero
            }else{
                alert('Nome non valido')
            }
        })
        
    }
    
}

// Evento del bottone 'mostra' al click
// variabile di controllo
let check = false

showBtn.addEventListener('click', ()=>{
    if(check == false){
        rubrica.showContacts()
        showBtn.innerHTML = `Nascondi contatti`
        check = true
    }else if(check == true){
        check = false
        showBtn.innerHTML = `Mostra contatti`
        containerList.innerHTML = ``
    }
})


// Aggiunge il contatto con il bottone
addBtn.addEventListener('click',()=>{
    rubrica.addContacts(nameInput.value,numberInput.value)
    nameInput.value=``;
    numberInput.value=``;
    if(check==false){
        check=true;
        showBtn.innerHTML='Nascondi contatti'
    }else if(check==true){
        containerList.innerHTML=``
        rubrica.showContacts();
    }
    
})

// Aggiunge i contatti con il tasto enter del pc
numberInput.addEventListener('keypress',(event)=>{
    if(event.key==='Enter'){
        rubrica.addContacts(nameInput.value,numberInput.value)
        nameInput.value=``;
        numberInput.value=``;
        if(check==false){
            check=true;
            showBtn.innerHTML='Nascondi contatti'
        }else if(check==true){
            containerList.innerHTML=``
            rubrica.showContacts();
        }
    }
})

// evento al modifica contatto
editBtn.addEventListener('click',()=>{
    if(nameInput.value!=``){
        rubrica.editContacts(nameInput.value,numberInput.value)
    }else{
        alert('Nome non valido')
    }
    nameInput.value=``
    numberInput.value=``
})