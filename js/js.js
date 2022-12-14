let ulDOM = document.querySelector("#list")
let btnDOM = document.querySelector("#liveToastBtn")
let inputDOM = document.querySelector("#task")
let logoDOM = document.querySelector("#logo")
let listElement =  document.querySelector("ul#list>li:last-child")
let liste = JSON.parse(localStorage.getItem("liste"))
let toDoList = []


// Remove item
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}
ulDOM.onclick = function(event) {
    console.log(toDoList)
    var target = getEventTarget(event);
    let find = target.parentElement.innerHTML   // kapama tusuna ait olan li elementinin icerigini bulma
    let indexNr = toDoList.indexOf(find) // silinecek satirin index numarasni bulma
    target.parentElement.style.display = 'none' // elementi listeden kaldirma
    console.log(indexNr) 
    toDoList.splice(indexNr,1) // toDoList icerisinden kaldirilacak olan item i cikartma
    console.log(toDoList)
    localStorage.clear(); //local storage i silme
    localStorage.setItem("liste",JSON.stringify(toDoList)) // tekrar local storage ekleme

};

// toDoList'e localstorage taki bilgiyi aktarma
if(liste){       
    for ( i=0; i<liste.length; i++){
        toDoList.push(liste[i])
    } 
    }else{
        toDoList = []
    }

// listener cagirma
    btnDOM.addEventListener("click", addItem) // btn click 
    btnDOM.addEventListener("mouseover", turnblack)  
    btnDOM.addEventListener("mouseout", defaultcolor)    

    
 // localstore daki veriyi listeye yazma   
        if(liste){
        for ( i=0; i<liste.length; i++){
            let li = document.createElement("li")         
            li.innerHTML = `${liste[i]}` 
            console.log(liste[i])       
            ulDOM.append(li)
         } 
        }
 
// Listeye madde ekleme
    function addItem() {
        if (!inputDOM.value){
            $(".error").toast("show"); //error clasını kullanarak toast ekeleme
        }
        else{
            // input satirina yapilan bilgiyi toDoList arrayine ekleme
            let data = inputDOM.value           
            let li = document.createElement("li") 
            const closeBtn = document.createElement("span");
            closeBtn.classList.add("close");
            closeBtn.textContent = "\u00D7";
            li.innerHTML = data
            //li.innerHTML = `${toDoList[toDoList.length-1]}`
            li.appendChild(closeBtn);
            ulDOM.append(li)  
            toDoList.push(li.innerHTML) 
            console.log(toDoList)
            localStorage.setItem("liste",JSON.stringify(toDoList)) //local store kaydetme                                 
            $(".success").toast("show"); // success clasini kullanarak toast ekeleme
            inputDOM.value = ""
        }     
    }   

// Mouse yanindaki yazi takibi
    logoDOM.style.position = "absolute"
    window.onmousemove = function(event){
        logoDOM.style.left = event.clientX +10 + "px"
        logoDOM.style.top = event.clientY + 10 + "px"
    }
//Butonun uzerine gidince bg-success yapma
    function turnblack(){
        btnDOM.classList.add("bg-success")       
    }
    function defaultcolor(){
        btnDOM.classList.remove("bg-success")
    }

    