(function (document) {

    var inputreceiver;
    function sendCommand(name) {

        if (inputreceiver) {
            inputreceiver.handle(name);
            return;
        }

        require(['inputreceiver'], function (inputReceiverInstance) {
            inputreceiver = inputReceiverInstance;
            inputreceiver.handle(name);
        });
    }

    document.addEventListener('windowskeydown', function (e) {

        var key = e.detail.key;

        /*

        APPCOMMAND_BROWSER_BACKWARD = 1,
        APPCOMMAND_BROWSER_FORWARD = 2,
        APPCOMMAND_BROWSER_REFRESH = 3,
        APPCOMMAND_BROWSER_STOP = 4,
        APPCOMMAND_BROWSER_SEARCH = 5,
        APPCOMMAND_BROWSER_FAVORITES = 6,
        APPCOMMAND_BROWSER_HOME = 7,
        APPCOMMAND_VOLUME_MUTE = 8,
        APPCOMMAND_VOLUME_DOWN = 9,
        APPCOMMAND_VOLUME_UP = 10,
        APPCOMMAND_MEDIA_NEXTTRACK = 11,
        APPCOMMAND_MEDIA_PREVIOUSTRACK = 12,
        APPCOMMAND_MEDIA_STOP = 13,
        APPCOMMAND_MEDIA_PLAY_PAUSE = 14,
        APPCOMMAND_LAUNCH_MAIL = 15,
        APPCOMMAND_LAUNCH_MEDIA_SELECT = 16,
        APPCOMMAND_LAUNCH_APP1 = 17,
        APPCOMMAND_LAUNCH_APP2 = 18,
        APPCOMMAND_BASS_DOWN = 19,
        APPCOMMAND_BASS_BOOST = 20,
        APPCOMMAND_BASS_UP = 21,
        APPCOMMAND_TREBLE_DOWN = 22,
        APPCOMMAND_TREBLE_UP = 23,
        APPCOMMAND_MICROPHONE_VOLUME_MUTE = 24,
        APPCOMMAND_MICROPHONE_VOLUME_DOWN = 25,
        APPCOMMAND_MICROPHONE_VOLUME_UP = 26,
        APPCOMMAND_HELP = 27,
        APPCOMMAND_FIND = 28,
        APPCOMMAND_NEW = 29,
        APPCOMMAND_OPEN = 30,
        APPCOMMAND_CLOSE = 31,
        APPCOMMAND_SAVE = 32,
        APPCOMMAND_PRINT = 33,
        APPCOMMAND_UNDO = 34,
        APPCOMMAND_REDO = 35,
        APPCOMMAND_COPY = 36,
        APPCOMMAND_CUT = 37,
        APPCOMMAND_PASTE = 38,
        APPCOMMAND_REPLY_TO_MAIL = 39,
        APPCOMMAND_FORWARD_MAIL = 40,
        APPCOMMAND_SEND_MAIL = 41,
        APPCOMMAND_SPELL_CHECK = 42,
        APPCOMMAND_DICTATE_OR_COMMAND_CONTROL_TOGGLE = 43,
        APPCOMMAND_MIC_ON_OFF_TOGGLE = 44,
        APPCOMMAND_CORRECTION_LIST = 45,
        APPCOMMAND_MEDIA_PLAY = 46,
        APPCOMMAND_MEDIA_PLAY_2 = 4142,
        APPCOMMAND_MEDIA_PAUSE = 47,
        APPCOMMAND_MEDIA_PAUSE_2 = 4143,
        APPCOMMAND_MEDIA_RECORD = 48,
        APPCOMMAND_MEDIA_RECORD_2 = 4144,
        APPCOMMAND_MEDIA_FAST_FORWARD = 49,
        APPCOMMAND_MEDIA_FAST_FORWARD_2 = 4145,
        APPCOMMAND_MEDIA_REWIND = 50,
        APPCOMMAND_MEDIA_REWIND_2 = 4146,
        APPCOMMAND_MEDIA_CHANNEL_UP = 51,
        APPCOMMAND_MEDIA_CHANNEL_DOWN = 52,
        APPCOMMAND_CUSTOM = 200,
        // Future Commands:
        APPCOMMAND_OPENRECORDED = (APPCOMMAND_CUSTOM + 1),
        APPCOMMAND_LIVETV = (APPCOMMAND_CUSTOM + 2),
        APPCOMMAND_MENU = (APPCOMMAND_CUSTOM + 3),
        APPCOMMAND_GUIDEMENU = (APPCOMMAND_CUSTOM + 4),
        APPCOMMAND_CHANNELS = (APPCOMMAND_CUSTOM + 5),
        APPCOMMAND_INFO = (APPCOMMAND_CUSTOM + 6),
        APPCOMMAND_PROCAMP = (APPCOMMAND_CUSTOM + 7),
        APPCOMMAND_TIMESHIFT = (APPCOMMAND_CUSTOM + 8),
        APPCOMMAND_CC = (APPCOMMAND_CUSTOM + 9),
        APPCOMMAND_EPG = (APPCOMMAND_CUSTOM + 10),
        APPCOMMAND_CHANNEL_LAST = (APPCOMMAND_CUSTOM + 11),
        APPCOMMAND_ASP_STRETCH = (APPCOMMAND_CUSTOM + 20),
        APPCOMMAND_ASP_4X3 = (APPCOMMAND_CUSTOM + 21),
        APPCOMMAND_ASP_16X9 = (APPCOMMAND_CUSTOM + 22),
        APPCOMMAND_ASP_AUTO = (APPCOMMAND_CUSTOM + 23),
        APPCOMMAND_ASP_TOGGLE = (APPCOMMAND_CUSTOM + 24)
        */

        switch (key) {

            case 'APPCOMMAND_BROWSER_BACKWARD':
                sendCommand('back');
                break;
            case 'APPCOMMAND_BROWSER_FORWARD':
                sendCommand('forward');
                break;
            case 'APPCOMMAND_BROWSER_STOP':
                sendCommand('stop');
                break;
            case 'APPCOMMAND_BROWSER_SEARCH':
            case 'APPCOMMAND_FIND':
                sendCommand('search');
                break;
            case 'APPCOMMAND_BROWSER_FAVORITES':
                sendCommand('favorites');
                break;
            case 'APPCOMMAND_BROWSER_HOME':
                sendCommand('home');
                break;
            case 'APPCOMMAND_VOLUME_MUTE':
                sendCommand('togglemute');
                break;
            case 'APPCOMMAND_VOLUME_DOWN':
                sendCommand('volumedown');
                break;
            case 'APPCOMMAND_VOLUME_UP':
                sendCommand('volumeup');
                break;
            case 'APPCOMMAND_MEDIA_NEXTTRACK':
                sendCommand('next');
                break;
            case 'APPCOMMAND_MEDIA_PREVIOUSTRACK':
                sendCommand('previous');
                break;
            case 'APPCOMMAND_MEDIA_STOP':
                sendCommand('stop');
                break;
            case 'APPCOMMAND_MEDIA_PLAY':
            case 'APPCOMMAND_MEDIA_PLAY_2':
                sendCommand('play');
                break;
            case 'APPCOMMAND_MEDIA_PAUSE':
            case 'APPCOMMAND_MEDIA_PAUSE_2':
                sendCommand('pause');
                break;
            case 'APPCOMMAND_MEDIA_RECORD':
            case 'APPCOMMAND_MEDIA_RECORD_2':
                sendCommand('record');
                break;
            case 'APPCOMMAND_MEDIA_FAST_FORWARD':
            case 'APPCOMMAND_MEDIA_FAST_FORWARD_2':
                sendCommand('fastforward');
                break;
            case 'APPCOMMAND_MEDIA_REWIND':
            case 'APPCOMMAND_MEDIA_REWIND_2':
                sendCommand('rewind');
                break;
            case 'APPCOMMAND_MEDIA_PLAY_PAUSE':
                sendCommand('playpause');
                break;
            case 'APPCOMMAND_MEDIA_CHANNEL_UP':
                sendCommand('channelup');
                break;
            case 'APPCOMMAND_MEDIA_CHANNEL_DOWN':
                sendCommand('channeldown');
                break;
            case 'APPCOMMAND_OPENRECORDED':
                sendCommand('recordedtv');
                break;
            case 'APPCOMMAND_LIVETV':
                sendCommand('livetv');
                break;
            case 'APPCOMMAND_MENU':
                sendCommand('menu');
                break;
            case 'APPCOMMAND_GUIDEMENU':
            case 'APPCOMMAND_EPG':
            case 'APPCOMMAND_CHANNELS':
                sendCommand('guide');
                break;
            case 'APPCOMMAND_ASP_TOGGLE':
                sendCommand('changezoom');
                break;
            case 'APPCOMMAND_CC':
                sendCommand('changesubtitletrack');
                break;
            case 'APPCOMMAND_INFO':
                sendCommand('info');
                break;
            default:
                break;
        }
    });

})(document);
