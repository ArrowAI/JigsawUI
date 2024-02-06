
var events = {}

function register (socket) {
 events.integrationInit(socket)
}

function test(){
  
}

events.integrationInit = function (socket) {
  socket.on('integrationInit', function (applicationId) {
   socket.join(`app_${applicationId}`);
  })
}
events.setUserActic
module.exports = {
  events: events,
  register: register
}
