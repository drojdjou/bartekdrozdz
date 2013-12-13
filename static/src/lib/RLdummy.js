var RL = {};
RL.setRlc = function(r) {};
RL.log = RL.warn = RL.error = function(message) { console.log("RL", message); };