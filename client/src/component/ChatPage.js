import React from 'react';



const ChatPage = () => {
    // useEffect
//   function  sendMessage(e) {
//         e.preventDefault();
  
//         this.socket.emit('SEND_MESSAGE', {
//             user: this.user,
//             message: this.message
//         });
//         this.message = '';
//       }
      
//       function  mounted() {
//         this.socket.on('MESSAGE', (data) => {
//           console.log("Client Received: " + JSON.stringify(data));
//           this.messages.push(data);
//         });
//       }  
  return (
    <div>
<div className="card mt-3">
    <div className="card-body">
      <div className="card-title">
        <h3>Chat Group</h3>
        
      </div>
      <div className="card-body">
        <div className="messages" >
          <p><span className="font-weight-bold">{}: </span>{}</p>
        </div>
      </div>
    </div>
    <div className="card-footer">
      <form >
        <div className="gorm-group">
          <label htmlFor="user">User:</label>
          <input type="text" v-model="user" className="form-control"/>
        </div>
        <div className="gorm-group pb-3">
          <label htmlFor="message">Message:</label>
          <input type="text" v-model="message" className="form-control"/>
        </div>
        <button type="submit" className="btn btn-success" >Send</button>
      </form>
    </div>
  </div>


    </div>
  )

}

export default ChatPage