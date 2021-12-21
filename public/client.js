

const socket = io()

//set a user name who send message before sending enter name.
let name;
do{
  name = prompt('please enter your name..')
}while(!name)

//importing message area used to sending message from text area to message area
let messageArea=document.querySelector('.message__area');

//when we write message in text area it should display in message area
//1.get textarea
let textarea = document.querySelector('#textarea');
//2.when we press enter key message to be send to text area
textarea.addEventListener('keyup',(e)=>{
  if(e.key=='Enter')
  {
    sendMessage(e.target.value)
   // textarea=''
  }
})
//send message to server
function sendMessage(message){
  let msg={
    user:name,
    message:message.trim()
    // trim used to trim white space  
  }
  //append message on text area
  appendMessage(msg,'outgoing');
  textarea.value='' 
  scrollToBottom()

  //sending to server
  socket.emit('message',msg);

}

function appendMessage(msg,type){
  //creating a div 
   let mainDiv = document.createElement('div');
   let className=type
   //add class to maindiv incoming or outgoing message
   mainDiv.classList.add(className,'message')

   let markup=`
   <h4>${msg.user}</h4>
   <p>${msg.message}</p>
     `
    //inserting into maindiv
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv);
}

//receving message from server.js

socket.on('message',(msg)=>{
   appendMessage(msg,'incoming')
   scrollToBottom();
})

//when we send message it show lst message always
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight
}