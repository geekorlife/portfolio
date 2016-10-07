


/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/8/13
 *
 * @author Blair Mitchelmore
 * @version 2.1.7
 *
 **/
new function(settings) {
    // Various Settings
    var $separator = settings.separator || '&';
    var $spaces = settings.spaces === false ? false : true;
    var $suffix = settings.suffix === false ? '' : '[]';
    var $prefix = settings.prefix === false ? false : true;
    var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
    var $numbers = settings.numbers === false ? false : true;
    
    jQuery.query = new function() {
        var is = function(o, t) {
            return o != undefined && o !== null && (!!t ? o.constructor == t : true);
        };
        var parse = function(path) {
            var m, rx = /\[([^[]*)\]/g, match = /^([^[]+)(\[.*\])?$/.exec(path), base = match[1], tokens = [];
            while (m = rx.exec(match[2]))
                tokens.push(m[1]);
            return [base, tokens];
        };
        var set = function(target, tokens, value) {
            var o, token = tokens.shift();
            if (typeof target != 'object')
                target = null;
            if (token === "") {
                if (!target)
                    target = [];
                if (is(target, Array)) {
                    target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
                } else if (is(target, Object)) {
                    var i = 0;
                    while (target[i++] != null)
                        ;
                    target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
                } else {
                    target = [];
                    target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
                }
            } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
                var index = parseInt(token, 10);
                if (!target)
                    target = [];
                target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
            } else if (token) {
                var index = token.replace(/^\s*|\s*$/g, "");
                if (!target)
                    target = {};
                if (is(target, Array)) {
                    var temp = {};
                    for (var i = 0; i < target.length; ++i) {
                        temp[i] = target[i];
                    }
                    target = temp;
                }
                target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
            } else {
                return value;
            }
            return target;
        };
        
        var queryObject = function(a) {
            var self = this;
            self.keys = {};
            
            if (a.queryObject) {
                jQuery.each(a.get(), function(key, val) {
                    self.SET(key, val);
                });
            } else {
                jQuery.each(arguments, function() {
                    var q = "" + this;
                    q = q.replace(/^[?#]/, ''); // remove any leading ? || #
                    q = q.replace(/[;&]$/, ''); // remove any trailing & || ;
                    if ($spaces)
                        q = q.replace(/[+]/g, ' '); // replace +'s with spaces
                    
                    jQuery.each(q.split(/[&;]/), function() {
                        var key = decodeURIComponent(this.split('=')[0] || "");
                        var val = decodeURIComponent(this.split('=')[1] || "");
                        
                        if (!key)
                            return;
                        
                        if ($numbers) {
                            if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
                                val = parseFloat(val);
                            else if (/^[+-]?[0-9]+$/.test(val)) // simple int regex
                                val = parseInt(val, 10);
                        }
                        
                        val = (!val && val !== 0) ? true : val;
                        
                        if (val !== false && val !== true && typeof val != 'number')
                            val = val;
                        
                        self.SET(key, val);
                    });
                });
            }
            return self;
        };
        
        queryObject.prototype = {
            queryObject: true,
            has: function(key, type) {
                var value = this.get(key);
                return is(value, type);
            },
            GET: function(key) {
                if (!is(key))
                    return this.keys;
                var parsed = parse(key), base = parsed[0], tokens = parsed[1];
                var target = this.keys[base];
                while (target != null && tokens.length != 0) {
                    target = target[tokens.shift()];
                }
                return typeof target == 'number' ? target : target || "";
            },
            get: function(key) {
                var target = this.GET(key);
                if (is(target, Object))
                    return jQuery.extend(true, {}, target);
                else if (is(target, Array))
                    return target.slice(0);
                return target;
            },
            SET: function(key, val) {
                var value = !is(val) ? null : val;
                var parsed = parse(key), base = parsed[0], tokens = parsed[1];
                var target = this.keys[base];
                this.keys[base] = set(target, tokens.slice(0), value);
                return this;
            },
            set: function(key, val) {
                return this.copy().SET(key, val);
            },
            REMOVE: function(key) {
                return this.SET(key, null).COMPACT();
            },
            remove: function(key) {
                return this.copy().REMOVE(key);
            },
            EMPTY: function() {
                var self = this;
                jQuery.each(self.keys, function(key, value) {
                    delete self.keys[key];
                });
                return self;
            },
            load: function(url) {
                var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
                var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash);
            },
            empty: function() {
                return this.copy().EMPTY();
            },
            copy: function() {
                return new queryObject(this);
            },
            COMPACT: function() {
                function build(orig) {
                    var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
                    if (typeof orig == 'object') {
                        function add(o, key, value) {
                            if (is(o, Array))
                                o.push(value);
                            else
                                o[key] = value;
                        }
                        jQuery.each(orig, function(key, value) {
                            if (!is(value))
                                return true;
                            add(obj, key, build(value));
                        });
                    }
                    return obj;
                }
                this.keys = build(this.keys);
                return this;
            },
            compact: function() {
                return this.copy().COMPACT();
            },
            toString: function() {
                var i = 0, queryString = [], chunks = [], self = this;
                var encode = function(str) {
                    str = str + "";
                    if ($spaces)
                        str = str.replace(/ /g, "+");
                    return encodeURIComponent(str);
                };
                var addFields = function(arr, key, value) {
                    if (!is(value) || value === false)
                        return;
                    var o = [encode(key)];
                    if (value !== true) {
                        o.push("=");
                        o.push(encode(value));
                    }
                    arr.push(o.join(""));
                };
                var build = function(obj, base) {
                    var newKey = function(key) {
                        return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
                    };
                    jQuery.each(obj, function(key, value) {
                        if (typeof value == 'object')
                            build(value, newKey(key));
                        else
                            addFields(chunks, newKey(key), value);
                    });
                };
                
                build(this.keys);
                
                if (chunks.length > 0)
                    queryString.push($hash);
                queryString.push(chunks.join($separator));
                
                return queryString.join("");
            }
        };
        
        return new queryObject(location.search, location.hash);
    };
}(jQuery.query || {}); // Pass in jQuery.query as settings object


/***** GAMEAPI ****/

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

var gamorliveGameStarted = false;
var gamorliveGameEnded = false;
var rezendiop;

var gameAPI = {
    gameSession: null,
    playerId: null,
    pName: null,
    socket: io.connect('http://beta.gamorlive.com:9090/'),
    startFn: null,
    
    initialise: function() {
        this.gameSession = session; //readCookie('gsId');
        this.playerId = iduser //readCookie('pId');
        this.pName = pseudo //readCookie('pName');
        //console.log(gameSession + ";" + playerId + ":" + playerName);
        this.connect();
    },
    connect: function() {
        this.socket.emit('main', {gameSession: this.gameSession,playerId: this.playerId,playerName: this.pName});
    },
    
    sendInfo: function(data) {
        this.socket.emit('score', {gameSession: this.gameSession,dataSent: data});
    },
    
    listen: function(fnc) {
        this.socket.on('score' + this.gameSession, function(data) {
            fnc(data['dataSent']);
        });
        
        this.socket.on('opponent_disconnect' + this.gameSession, function(data) {
            alert('Your opponent lose the connection... You will come back to the home');
            sessionreset();
            window.location = 'index.html?pseudo='+pseudo+'&Rmyteamselect='+myteamselect;
        });
        
        this.socket.on('final_status_update' + this.gameSession, function(data) {
            gamorliveGameEnded = true;
        });
    },
    
    playerName: function(fnc) {
        this.socket.on('player' + this.gameSession, function(data) {
            fnc(data['player']);
        });
    },
    
    gameStart: function(fnc) {
        this.socket.on(this.gameSession, function(data) {
            startFn = fnc;
            //soundManager.useHTML5Audio = true;
            //soundManager.play('mySound0', 'http://beta.gamorlive.com/games/click.mp3');
            var t = setTimeout('this.startFn()', 5000);
            gamorliveGameStarted = true;
        //fnc(data);
        });
        
        setTimeout((function(self) {
            return function() {
                self.gameTimeOut();
            }
        })(this), 1200000);
    },
     
    sendFinalStatus: function(outcome) {
		console.log('end game: '+outcome);
                dbscore(outcome);
    },
    
    replay: function() {
        window.location = 'http://beta.gamorlive.com/gamorlive-mobile/play/game/action/replay.html?gsId=' + this.gameSession;
    },
    
    endGame: function() {
        setInterval((function(self) {
            return function() {
                self.gameEnd();
            }
        })(this), 2000);
    },
    
    endGameChat: function() {
        setInterval((function(self) {
            return function() {
                self.chatEnd();
            }
        })(this), 2000);
    },
    
    gameTimeOut: function() {
        if (gamorliveGameStarted == false) {
            alert('We lose your opponent... You will come back to the home');
            sessionreset();
            window.location = 'index.html?reset=1&pseudo='+pseudo+'&Rmyteamselect='+myteamselect;
        }
    },
    
    gameEnd: function() {
            //fin du jeu retour à la recherche d'adversaire
            window.location = 'index.html?reset=1&pseudo='+pseudo+'&Rmyteamselect='+myteamselect+'&rezendiop='+rezendiop;
    },
    chatEnd: function() {
        if (gamorliveGameEnded == true) {
            //fin du jeu retour sur le chat
            chatinit();
            
        }
    }
}


