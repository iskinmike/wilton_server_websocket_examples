define(["wilton/wiltoncall"], function(wiltoncall) {   
    "use strict";
    return {
        ONMESSAGE: function(ws, message){
        	print("BYEBYEBYE Hello ONMESSAGE![" + ws + "][" + message + "]");

        	var data = {
        		test: 1, 
        		msg: "hello"
        	}

        	wiltoncall("websocket_send", {
        		websocketHandle: ws,
        		data: JSON.stringify(data)
        	});

        },
        ONOPEN: function(ws) {
            print("BYEBYEBYE Hello ONOPEN![" + ws + "]");
        },
        ONCLOSE: function(ws){
        	print("BYEBYEBYE Bye bye ONCLOSE!");
        },
        ONERROR: function(ws, err_message){
        	print("BYEBYEBYE ONERROR: " + err_message);
        }
    };
});
