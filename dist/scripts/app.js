const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const updateName = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

// ADD A NEW CHAT
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err, "Not able to create new chat"));
});

// UPDATE USERNAME
updateName.addEventListener("submit", (e) => {
  e.preventDefault();

  const newName = updateName.name.value.trim();
  chatroom.updateName(newName);
  updateName.reset();
  updateMssg.innerText = `Your username was updated to "${newName}"`;
  setTimeout(() => (updateMssg.innerText = ""), 3000);
});

// UPDATE CHATROOMS
rooms.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

// Check if local storage has a username stored or not
const userName = localStorage.username ? localStorage.username : "anon";

// CLASS INSTANCES
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", userName);

// GET CHATS & RENDER
chatroom.getChats((data) => {
  chatUI.render(data);
});
