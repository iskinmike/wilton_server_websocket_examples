# wilton_server_websocket_examples

Примеры запуска wilton_server с поддержкой websockets.

Структура каталога:
```
wilton_server_websocket_examples
├── README.md
├── server
│   ├── index.js
│   ├── test
│   │   ├── bye.js
│   │   └── hi.js
│   └── views
│       ├── bye.js
│       └── hi.js
└── websocket_test
    └── test.html

```

Каталог server содержит пример записи обработчиков websocket соединения. <br>
	index.js - json описания websocket_views для создания сервера. <br>
	test/hi.js - обработчики основных событий websocket'ов на js. <br>
Каталог websocket_test содержит пример websocket клиента.

Пример команды запуска из сборочной директории wilton:
```
./bin/wilton_cli ./examples/wilton_server_websocket_examples/server/index.js
```


### Описание websokcet_virews при создании сервера

Пример описания. 

```json
websocket_views: [ 
                    [
                        { 
                        path: "test/hi",
                        method: "ONMESSAGE",
                        callbackScript: {
                            module: "server/test/hi",
                            func: "ONMESSAGE",
                            args: []
                            }
                        },
                        {
                        path: "test/hi",
                        method: "ONOPEN",
                        callbackScript: {
                            module: "server/test/hi",
                            func: "ONOPEN",
                            args: []
                            }
                        },
                        {
                        path: "test/hi",
                        method: "ONCLOSE",
                        callbackScript: {
                            module: "server/test/hi",
                            func: "ONCLOSE",
                            args: []
                            }
                        },
                        {
                        path: "test/hi",
                        method: "ONERROR",
                        callbackScript: {
                            module: "server/test/hi",
                            func: "ONERROR",
                            args: []
                            }
                        }
                    ]
                ]
```

websocket_views - Массив, каждый элемент которого описывает поведение для одного пути. В примере путь: path: "test/hi".
Каждый такой объект тоже является массивом, в котором ожидается до 4-х элементов. (порядок и не важен).
Каждый элемент описывает Путь, Метод, и обработчик callbackScript.<br>
У методов жестко заданные названия: <br>
	ONMESSAGE <br>
	ONOPEN <br>
	ONCLOSE <br>
	ONERROR <br>
callbackScript.module - описывает путь до js файла в котором храняться функции callbackScript.func.
У функций  имена не жестко заданы, но лучше просто их называть аналогично методам.
Аргументы в плане настройки не несут какой-то смысловой нагрузки и  внутри работы сервера будут перезатираться, но они нужны в json структуре, так что нужно просто оставить их пустыми.

### Пример обработчика
```javascript
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
```