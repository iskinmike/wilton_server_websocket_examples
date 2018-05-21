/*
 * Copyright 2017, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "wilton/Logger",
    "wilton/Server",
    "wilton/thread"
], function(Logger, Server, thread) {
    "use strict";

    var logger = new Logger("server.main");

    return {
        main: function() {
            Logger.initConsole("INFO");
            var server = new Server({
                tcpPort: 8080,
                views: [
                    "server/views/hi",
                    "server/views/bye"
                ],
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
            });

            logger.info("Server is running ... 1");
            thread.sleepMillis(4000);
            logger.info("Server is running ... 2");
            thread.sleepMillis(1000);
                
            server.stop();
        }
    };
});
