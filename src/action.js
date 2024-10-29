let add_task = document.getElementById('add_task');
add_task.onclick = function() {
    // Crée un nouvel élément input
    let choisir_option = prompt("Choisir Type input : Do || In || Done");
    
    // Récupère le div avec l'ID 'test'
    let testDiv = document.getElementById('test');

    // Vérifie si l'option choisie est correcte
    if (choisir_option === 'Do') {
        let bare = document.createElement('input');
        bare.type = 'text'; 
        bare.placeholder = 'test'; 
        
        // Ajoute le nouvel input au div avec l'ID 'test'
        testDiv.appendChild(bare);
    } else if (choisir_option === 'In') {
        let bare = document.createElement('input');
        bare.type = 'text'; 
        bare.placeholder = 'In task'; 
        
        // Ajoute le nouvel input au div avec l'ID 'test'
        testDiv.appendChild(bare);
    } else if (choisir_option === 'Done') {
        let bare = document.createElement('input');
        bare.type = 'text'; 
        bare.placeholder = 'Done task'; 
        
        // Ajoute le nouvel input au div avec l'ID 'test'
        testDiv.appendChild(bare);
    } else {
        alert("Option invalide. Veuillez choisir Do, In ou Done.");
    }
}


// 
let btn=document.querySelector('btn');
btn.onclick=function(){
  btn.style.background.color='red';
//   btn.
}

