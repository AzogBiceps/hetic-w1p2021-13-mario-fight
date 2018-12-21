// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/script.js":[function(require,module,exports) {
var data = {
  player1: '',
  player2: '',
  map: '',
  gameInterval: null
};
window.appState = data;
var lifebar;
oxo.inputs.listenKey('enter', function () {
  console.log(oxo.screens.getCurrentScreen());

  if (oxo.screewns.getCurrentScreen() == 'home') {
    oxo.screens.loadScreen('characters', character);
  }
});

function map() {
  var elements = document.querySelectorAll('div.element__maps');
  var count = 0;
  console.log(elements);
  elements.forEach(function (element) {
    element.addEventListener('click', function () {
      if (count == 0) {
        element.classList.add('selected');
        count = 1;
      } else {
        elements.forEach(function (elm) {
          return elm.classList.remove("selected");
        });
        element.classList.add("selected");
      }

      map = element.className.split(' ')[1];
    });
  });
  document.getElementById("go").addEventListener("click", function () {
    data.map = map;
    console.log(data);
    oxo.screens.loadScreen('game', game);
  });
}

oxo.inputs.listenKey('enter', function () {
  console.log(oxo.screens.getCurrentScreen());

  if (oxo.screens.getCurrentScreen() == 'home') {
    oxo.screens.loadScreen('characters', character);
  }
});

function character() {
  var elements = document.querySelectorAll('div.element');
  var count = 0;
  var players = [];
  elements.forEach(function (element) {
    element.addEventListener('click', function () {
      console.log(count);

      if (count == 0) {
        console.log('add');
        players.push(element.className.split(' ')[1]);
        element.classList.add("selected");
        count++;
      } else if (count == 1 && !element.className.includes("selected")) {
        console.log('add other');
        players.push(element.className.split(' ')[1]);
        element.classList.add(document.querySelector('.selectedPlayerTwo') ? 'selected' : 'selectedPlayerTwo');
        count++;
      } else if (element.className.includes("selected")) {
        count--;
        players = players.filter(function (player) {
          return player != element.className.split(' ')[1];
        });
        element.classList.remove('selected');
        element.classList.remove('selectedPlayerTwo');
      }
    });
  });
  document.getElementById("back").addEventListener("click", function () {
    data.players = [];
    count = 0;
    elements.forEach(function (element) {
      element.classList.remove("selected");
      element.classList.remove("selectedPlayerTwo");
    });
  });
  document.getElementById("go").addEventListener("click", function () {
    console.log("Go");
    data.player1 = players[0];
    data.player2 = players[1];

    if (data.player1 && data.player2) {
      oxo.screens.loadScreen('maps', map);
    }
  });
}

function end() {
  console.log(data.winner);
  var winnerName = document.getElementById("winner__name");
  winnerName.innerHTML = data.winner;
}
/** GAME */


function game() {
  lifebar = document.getElementById('lifebar');
  lifebar.style.width = 5 * 10 + '%';
  console.log('GAME');
  var players = initFighters(data);
  var turn = true;
  var player1 = players[0];
  var player2 = players[1];
  console.log(player1, player2); // reation of data.players array with basics stats
  // select characters on the left

  if (data.player1 == 'bastien') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-bastien');
  } else if (data.player1 == 'rayan') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-rayan');
  } else if (data.player1 == 'maeva') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-maeva');
  } else if (data.player1 == 'baptiste') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-baptiste');
  } else if (data.player1 == 'mathias') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-mathias');
  } else if (data.player1 == 'justine') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-justine');
  } else if (data.player1 == 'brontis') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-brontis');
  } else if (data.player1 == 'aymeric') {
    var characterLeft = document.getElementById("character__left");
    characterLeft.classList.add('is-aymeric');
  }

  if (data.player2 == 'bastien') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-bastien');
  } else if (data.player2 == 'rayan') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-rayan');
  } else if (data.player2 == 'maeva') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-maeva');
  } else if (data.player2 == 'baptiste') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-baptiste');
  } else if (data.player2 == 'mathias') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-mathias');
  } else if (data.player2 == 'justine') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-justine');
  } else if (data.player2 == 'brontis') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-brontis');
  } else if (data.player2 == 'aymeric') {
    var characterLeft = document.getElementById("character__right");
    characterLeft.classList.add('is-aymeric');
  }

  if (data.map == 'arena') {
    var bg = document.getElementById("background");
    bg.classList.add('is-arena');
  } else if (data.map == 'gladiator') {
    var bg = document.getElementById("background");
    bg.classList.add('is-gladiator');
  } else if (data.map == 'ring') {
    var bg = document.getElementById("background");
    bg.classList.add('is-ring');
  }

  data.gameInterval = setInterval(function () {
    document.getElementById("gosef").style.display = "none"; // Detecting death

    if (getLife(player1) > 0 && getLife(player2) === 0) {
      //here you need to load the final page with J1 by winning
      console.log('J1 a gagné');
      clearInterval(data.gameInterval);
      data.gameInterval = null;
      var winner = data.winner = player1.name; // document.getElementById("gosef").style.display = "block"

      oxo.screens.loadScreen('end', end);
    } else if (getLife(player2) > 0 && getLife(player1) === 0) {
      //here you need to load the final page with J2 by winning
      console.log('J2 a gagné');
      clearInterval(data.gameInterval);
      data.gameInterval = null;
      var winner = data.winner = player2.name; // document.getElementById("gosef").style.display = "block"

      oxo.screens.loadScreen('end', end);
    } // Attack listeners


    oxo.inputs.listenKey('q', function () {
      if (turn) {
        // J1 is playing
        console.log("Q pressed");
        action(player1, player2, 'atk');
        turn = !turn;
      }
    });
    oxo.inputs.listenKey('k', function () {
      if (!turn) {
        // J2 is playing
        console.log("K pressed");
        action(player2, player1, 'atk');
        turn = !turn;
      }
    }); // Heal listeners

    oxo.inputs.listenKey('s', function () {
      if (turn) {
        // J1 is playing
        console.log("S pressed");
        action(player1, player2, 'heal');
        turn = !turn;
      }
    });
    oxo.inputs.listenKey('l', function () {
      if (!turn) {
        // J2 is playing
        console.log("L pressed");
        action(player2, player1, 'heal');
        turn = !turn;
      }
    }); // Shield listeners

    oxo.inputs.listenKey('d', function () {
      if (turn) {
        // J1 is playing
        console.log("D pressed");
        action(player1, player2, 'def');
        turn = !turn;
      }
    });
    oxo.inputs.listenKey('m', function () {
      if (!turn) {
        // J2 is playing
        console.log("M pressed");
        action(player2, player1, 'def');
        turn = !turn;
      }
    });
  }, 200); // document.getElementById("gosef").addEventListener("click", function(){
  //   console.log("End page");
  //   oxo.screens.loadScreen('end', end);
  // });
}
/**
* action realized by a character
@param {playerAtk} object - Player who plays
@param {playerDef} object - Player enemy
@param {type} string - Action of the player
*/


function action(playerAtk, playerDef, type) {
  //Action according to the type
  switch (type) {
    case 'heal':
      heal(playerAtk);
      break;

    case 'def':
      def(playerAtk);
      break;

    default:
      attack(playerAtk, playerDef);
  }
}
/**
A player attacks the other one
@param {playerAtk} object - Player who plays
@param {playerDef} object - Player enemy
*/


function attack(playerAtk, playerDef) {
  //J2 is in defense
  if (playerDef.def != 0) {
    semiAttack(playerDef);
    playerDef.def = 0;
  } else {
    //J2 is normal
    fullAttack(playerDef);
  }

  return false;
} //Has to modify for the value


function heal(player) {
  player.LP += 1;
} //the player switches to defense mode and wins 0.5 of next def round (=50% damage reduction)
//Has to modify for the value


function def(player) {
  player.def += 0.5;
} //refers to the life of the player


function getLife(player) {
  return player.LP;
} //performs a complete attack with 8/10 succes


function fullAttack(player) {
  //creation of a random number between 1 and 10
  succes = Math.floor(Math.random() * 10 + 1);

  if (succes > 2) {
    //if the number is greater than 2 succes
    player.LP -= 1;
  } else {//else fail
  }
} //makes an attack on a player in defense mode


function semiAttack(player) {
  //the blow is always successful in defense mode
  player.LP -= 0.5;
}
/**
*Initializes the initial state of the two combatants
* @param {data} tableau - contains both data.players and map
* @return {data.players} -Table composed of the two data.players with combat characteristics
*/


function initFighters(data) {
  //create a tab with J1 and J2 with features
  var players = [];
  players.push({
    'name': data.player1,
    'LP': 10,
    'def': 0
  }, {
    'name': data.player2,
    'LP': 10,
    'def': 0
  });
  return players;
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54105" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.map