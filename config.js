var Config = require('electron-config');

var instance,
    path = '';

if (typeof __dirname !== 'undefined') {
    path = __dirname;
}

/*
 * Configs that should be saved locally must be listed here,
 * also settings that user can implicitly change
 * NOT VALID ANYMORE - NO LOCAL SETTINGS NO PREFERENCES PAGE!
 * */
var userPreferences = {
    alwaysOnTop : true,
    windowResize : true,
    windowDraggable : true,
    windowPosition : 'trayCenter',
    globalShortcuts : true,
    PIPModeByDefault : false,
    highlightTray : true,
    rememberBounds : true,
    theme : 'red-theme',
    desktopMode : false,
};

var defaults = {
    showOnRightClick: false,
    // userAgent: 'Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30',
    // userAgent: 'Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-J737P) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.2 Chrome/71.0.3578.99 Mobile Safari/537.36',
    userAgent: 'Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.2 Chrome/71.0.3578.99 Mobile Safari/537.36',
    desktopUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
    externalLinks: false,
    icon: path + '/icons/logo-icon-black-and-white/icon.iconset/icon_16x16.png',
    iconPressed: path + '/icons/logo-icon-black-and-white-inverse/icon.iconset/icon_16x16.png',
    preloadWindow: true,
    showDockIcon: false,
    browserWindow: {
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    },
};


function AppConfig() {
    var config = new Config();

    if (typeof config.store === 'object') {
        /*
         *  Ignore all local configs from now on
         * */
        // This is another hack
        userPreferences.desktopMode = config.store.desktopMode;
        config.set(Object.assign(userPreferences, {}));
    }


    this.config = config;

    Object.defineProperty(this, 'store', {
        get: function () {
            // Small hack to avoid issues with versioning and changes to preferences page
            defaults.browserWindow.alwaysOnTop = userPreferences.alwaysOnTop;
            return {
                all: Object.assign(defaults, userPreferences),
                userPreferences: userPreferences,
                defaults: defaults
            }
        }
    });

}

AppConfig.prototype = {
    update: function (config) {
        // This is another hack
        this.config.set(config);
    }
};

var getInstance = function () {
    instance = instance || new AppConfig();
    return instance;
};

module.exports = getInstance();
