// TO DO LIST:

// 1. CREATE A CHATROOM CLASS
// 2. CREATE METHOD TO ADD NEW CHAT DOCUMENTS
// 3. SETUP REALTIME LISTENER TO GET NEW CHATS
// 4. UPDATING THE USERNAME
// 5. UPDATING THE ROOM

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");

    this.unsub;
  }

  // CREATE CHAT
  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    const response = await this.chats.add(chat);
    localStorage.setItem("message", message);
    return response;
  }

  // GET DOCUMENTS IN REALTIME
  getChats(callback) {
    // UNSUBSCRIBING FROM CHANGES:
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // This callback is fired from app.js
            callback(change.doc.data());
          }
        });
      });
  }
  // UPDATE USERNAME $ SET LOCAL STORAGE
  updateName(name) {
    this.username = name;
    localStorage.setItem("username", name);
  }
  // UPDATE THE CHATROOM
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}
