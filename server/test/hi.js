define(["wilton/wiltoncall"], function(wiltoncall) {   
    "use strict";
    return {
        ONMESSAGE: function(ws, message){
        	print("HIHIHI Hello ONMESSAGE![" + ws + "][" + message + "]");
        	var data = {
        		test: ws, 
        		msg: "hello"
        	}

        	wiltoncall("websocket_send", {
        		websocketHandle: ws,
        		data: JSON.stringify(data)
        	});
        },
        ONOPEN: function(ws) {
            print("HIHIHI Hello ONOPEN![" + ws + "]");
        },
        ONCLOSE: function(ws){
        	print("HIHIHI Bye bye ONCLOSE!");
        },
        ONERROR: function(ws, err_message){
        	print("HIHIHI ONERROR: " + err_message);
        }
    };
});
