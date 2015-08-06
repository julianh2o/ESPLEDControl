function jxcore_ready() {
    var gui = null;

    jxcore("managerEventReceived").register(function(json) {
        var args = JSON.parse(json);
        gui.eventHandler.apply(gui,args);
    });

    requirejs.config({
        baseUrl: "./view/lib",
        "shim": {
            "jquery.contextMenu"  : ["jquery"]
        },
        paths: {
            "view":"..",
            "tmpl":"../tmpl",
        },
        config: {
            text: {
                env: 'xhr'
            }
        }
    });

    function guiReady() {
        jxcore("guiReady").call();
    }

    var isGuiReady = false;

    function log() {
        jxcore("guiLog").call(JSON.stringify(Array.prototype.slice.call(arguments)));
    }

    requirejs(['jquery','view/Gui.js'],function($,Gui) {
        console.log = log;
        platform = "mobile";
        gui = new Gui(window,function() {
            var args = JSON.stringify(Array.prototype.slice.call(arguments),function(key,value) {
                if (key && key.indexOf && key.indexOf("_") === 0) return false;
                return value;
            });
            jxcore("guiEventReceived").call(args);
        });

        guiReady();
    });
}
