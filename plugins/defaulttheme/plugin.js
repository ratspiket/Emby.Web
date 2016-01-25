define(['playbackManager', 'pluginManager'], function (playbackManager, pluginManager) {

    function updateClock() {

        var date = new Date();
        var time = date.toLocaleTimeString().toLowerCase();

        if (time.indexOf('am') != -1 || time.indexOf('pm') != -1) {

            var hour = date.getHours() % 12;
            var suffix = date.getHours() > 11 ? 'pm' : 'am';
            if (!hour) {
                hour = 12;
            }
            var minutes = date.getMinutes();

            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            time = hour + ':' + minutes + suffix;
        }

        var clock = document.querySelector('.headerClock');

        if (clock) {
            clock.innerHTML = time;
        }
    }

    return function () {

        var self = this;

        self.name = 'Default Theme';
        self.type = 'theme';
        self.id = 'defaulttheme';

        self.getHeaderTemplate = function () {
            return pluginManager.mapPath(self, 'header.html');
        };

        self.getDependencies = function () {

            var list = [
                'css!' + pluginManager.mapPath(self, 'css/style'),
                'css!' + pluginManager.mapPath(self, 'cards/card'),
                'css!' + pluginManager.mapPath(self, 'css/colors.dark'),
                'css!' + pluginManager.mapPath(self, 'css/paperstyles'),
                'css!' + pluginManager.mapPath(self, 'css/papericonbutton'),
                pluginManager.mapPath(self, 'cards/cardbuilder.js'),
                pluginManager.mapPath(self, 'cards/userdata.js')
            ];

            list.push('css!' + pluginManager.mapPath(self, 'css/fonts'));

            list.push('html!' + pluginManager.mapPath(self, 'icons.html'));
            list.push('paper-button');
            list.push('paper-icon-button');
            list.push('paper-input');
            list.push('paper-fab');
            list.push('paper-slider');
            list.push('paper-icon-item');
            list.push('paper-item-body');

            return list;
        };

        self.getTranslations = function () {

            var files = [];

            var languages = ['en-US', 'de', 'fr', 'nl', 'pt-BR', 'pt-PT', 'ru', 'sv'];

            return languages.map(function (i) {
                return {
                    lang: i,
                    path: pluginManager.mapPath(self, 'strings/' + i + '.json')
                };
            });
        };

        self.getRoutes = function () {

            var routes = [];

            routes.push({
                path: pluginManager.mapPath(self, 'home.html'),
                transition: 'slide',
                type: 'home',
                controller: self.id + '/home/home',
                dependencies: [
                    'css!' + pluginManager.mapPath(self, 'home/home.css')
                ]
            });

            routes.push({
                path: pluginManager.mapPath(self, 'item/item.html'),
                transition: 'slide',
                dependencies: [
                    'css!' + pluginManager.mapPath(self, 'item/item.css')
                ],
                controller: self.id + '/item/item'
            });

            routes.push({
                path: pluginManager.mapPath(self, 'list/list.html'),
                transition: 'slide',
                controller: 'defaulttheme/list/list',
            });

            routes.push({
                path: pluginManager.mapPath(self, 'music/music.html'),
                transition: 'slide',
                controller: self.id + '/music/music'
            });

            routes.push({
                path: pluginManager.mapPath(self, 'movies/movies.html'),
                transition: 'slide',
                controller: self.id + '/movies/movies'
            });

            routes.push({
                path: pluginManager.mapPath(self, 'livetv/livetv.html'),
                transition: 'slide',
                controller: self.id + '/livetv/livetv'
            });

            routes.push({
                path: pluginManager.mapPath(self, 'livetv/guide.html'),
                transition: 'slide',
                controller: self.id + '/livetv/guide',
                dependencies: [
                    'css!' + pluginManager.mapPath(self, 'livetv/guide.css')
                ]
            });

            routes.push({
                path: pluginManager.mapPath(self, 'tv/tv.html'),
                transition: 'slide',
                controller: self.id + '/tv/tv'
            });

            routes.push({
                path: pluginManager.mapPath(self, 'search/search.html'),
                transition: 'slide',
                controller: self.id + '/search/search',
                dependencies: [
                    'css!' + pluginManager.mapPath(self, 'search/search.css')
                ]
            });

            routes.push({
                path: pluginManager.mapPath(self, 'nowplaying/nowplaying.html'),
                transition: 'slide',
                controller: self.id + '/nowplaying/nowplaying',
                dependencies: [
                    'css!' + pluginManager.mapPath(self, 'nowplaying/nowplaying.css')
                ],
                supportsThemeMedia: true
            });

            routes.push({
                path: pluginManager.mapPath(self, 'nowplaying/playlist.html'),
                transition: 'slide',
                controller: self.id + '/nowplaying/playlist',
                dependencies: [
                    'css!' + pluginManager.mapPath(self, 'item/item.css')
                ],
                supportsThemeMedia: true
            });

            routes.push({
                path: pluginManager.mapPath(self, 'nowplaying/videoosd.html'),
                transition: 'fade',
                controller: self.id + '/nowplaying/videoosd',
                dependencies: [
                    'css!' + pluginManager.mapPath(self, 'nowplaying/videoosd.css')
                ],
                type: 'video-osd',
                supportsThemeMedia: true
            });

            return routes;
        };

        var clockInterval;
        self.load = function () {

            updateClock();
            setInterval(updateClock, 50000);
            bindEvents();
        };

        self.unload = function () {

            unbindEvents();

            if (clockInterval) {
                clearInterval(clockInterval);
                clockInterval = null;
            }
        };

        self.getHomeRoute = function () {
            return pluginManager.mapPath(self, 'home.html');
        };

        self.getVideoOsdRoute = function () {
            return pluginManager.mapPath(self, 'nowplaying/videoosd.html');
        };

        self.showItem = function (item) {

            var showList = false;

            if (item.IsFolder) {

                if (item.Type != 'Series' && item.Type != 'Season' && item.Type != 'MusicAlbum' && item.Type != 'MusicArtist' && item.Type != 'Playlist' && item.Type != 'BoxSet') {
                    showList = true;
                }
            }

            if (showList) {
                Emby.Page.show(pluginManager.mapPath(self, 'list/list.html') + '?parentid=' + item.Id, { item: item });
            } else {
                Emby.Page.show(pluginManager.mapPath(self, 'item/item.html') + '?id=' + item.Id, { item: item });
            }
        };

        self.setTitle = function (title) {

            if (title == null) {
                document.querySelector('.headerLogo').classList.remove('hide');
            } else {
                document.querySelector('.headerLogo').classList.add('hide');
            }

            title = title || '&nbsp;';

            var pageTitle = document.querySelector('.pageTitle');
            pageTitle.classList.remove('pageTitleWithLogo');
            pageTitle.style.backgroundImage = null;
            pageTitle.innerHTML = title;
        };

        self.search = function () {

            Emby.Page.show(pluginManager.mapPath(self, 'search/search.html'));
        };

        self.showNowPlaying = function () {
            Emby.Page.show(pluginManager.mapPath(self, 'nowplaying/nowplaying.html'));
        };

        self.showUserMenu = function () {

            // For now just go cheap
            showBackMenuInternal(function () { }, true);
        };

        self.showBackMenu = function (callback) {

            showBackMenuInternal(callback, false);
        };

        function showBackMenuInternal(callback, showHome) {

            require([pluginManager.mapPath(self, 'backmenu/backmenu.js'), 'css!' + pluginManager.mapPath(self, 'backmenu/backmenu.css')], function (showBackMenu) {
                showBackMenu({
                    callback: callback,
                    showHome: showHome
                });
            });
        }

        function bindEvents() {

            document.querySelector('.headerSearchButton').addEventListener('click', function () {
                self.search();
            });

            document.querySelector('.headerAudioPlayerButton').addEventListener('click', function () {
                self.showNowPlaying();
            });

            document.querySelector('.headerUserButton').addEventListener('click', function () {
                self.showUserMenu();
            });

            document.addEventListener('usersignedin', onLocalUserSignedIn);
            document.addEventListener('usersignedout', onLocalUserSignedOut);
            document.addEventListener('viewshow', onViewShow);

            Events.on(playbackManager, 'playbackstart', onPlaybackStart);
            Events.on(playbackManager, 'playbackstop', onPlaybackStop);
        }

        function unbindEvents() {

            document.removeEventListener('usersignedin', onLocalUserSignedIn);
            document.removeEventListener('usersignedout', onLocalUserSignedOut);
            document.removeEventListener('viewshow', onViewShow);

            Events.off(playbackManager, 'playbackstart', onPlaybackStart);
            Events.off(playbackManager, 'playbackstop', onPlaybackStop);
        }

        function onPlaybackStart(e) {

            if (playbackManager.isPlayingAudio()) {
                document.querySelector('.headerAudioPlayerButton').classList.remove('hide');
            } else {
                document.querySelector('.headerAudioPlayerButton').classList.add('hide');
            }
        }

        function onPlaybackStop(e, stopInfo) {

            if (stopInfo.nextMediaType != 'Audio') {
                document.querySelector('.headerAudioPlayerButton').classList.add('hide');
            }
        }

        function onLocalUserSignedIn(e) {

            var user = e.detail.user;

            document.querySelector('.headerLogo').classList.add('hide');

            document.querySelector('.headerSearchButton').classList.remove('hide');

            var headerUserButton = document.querySelector('.headerUserButton');

            if (user.PrimaryImageTag) {

                headerUserButton.icon = null;
                headerUserButton.src = Emby.Models.userImageUrl(user, {
                    height: 44
                });

            } else {
                headerUserButton.src = null;
                headerUserButton.icon = 'person';
            }

            document.querySelector('.headerUserButton').classList.remove('hide');
        }

        function onLocalUserSignedOut(e) {

            // Put the logo back in the page title
            document.querySelector('.headerLogo').classList.remove('hide');

            document.querySelector('.headerSearchButton').classList.add('hide');
            document.querySelector('.headerUserButton').classList.add('hide');
        }

        function onViewShow(e) {

            var viewId = e.detail.id;

            if (Emby.Page.canGoBack()) {
                document.querySelector('.headerBackButton').classList.remove('hide');
            } else {
                document.querySelector('.headerBackButton').classList.add('hide');
            }

            var enableSubduedBackdrop = viewId != 'defaulttheme-item' && viewId != 'defaulttheme-nowplaying' && viewId != 'defaulttheme-nowplayingplaylist';

            require(['defaulttheme/components/backdrop'], function(themeBackdrop) {
                themeBackdrop.subdued(enableSubduedBackdrop);
            });
            //blurBackdrop(enableBlur);
            //Emby.Backdrop.setBackdrop(pluginManager.mapPath(self, 'css/skin-dark/blur6.png'));
        }

        function blurBackdrop(enabled) {

            var elem = document.documentElement;
            if (enabled) {

                if (!elem.classList.contains('blurBackdropIn')) {
                    elem.classList.remove('blurBackdropOut');
                    elem.classList.add('blurBackdropIn');
                }

            } else {

                if (elem.classList.contains('blurBackdropIn')) {
                    elem.classList.remove('blurBackdropIn');
                    elem.classList.add('blurBackdropOut');
                }
            }
        }
    }
});