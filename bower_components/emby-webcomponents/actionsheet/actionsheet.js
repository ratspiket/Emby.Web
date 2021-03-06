﻿define(['paperdialoghelper', 'layoutManager', 'dialogText', 'paper-button', 'css!./actionsheet'], function (paperdialoghelper, layoutManager, dialogText) {

    function parentWithClass(elem, className) {

        while (!elem.classList || !elem.classList.contains(className)) {
            elem = elem.parentNode;

            if (!elem) {
                return null;
            }
        }

        return elem;
    }

    function getPosition(options) {

        var windowHeight = $(window).height();

        if (windowHeight < 540) {
            return null;
        }

        var pos = $(options.positionTo).offset();

        pos.top += $(options.positionTo).innerHeight() / 2;
        pos.left += $(options.positionTo).innerWidth() / 2;

        // Account for margins
        pos.top -= 24;
        pos.left -= 24;

        // Account for popup size - we can't predict this yet so just estimate
        pos.top -= (55 * options.items.length) / 2;
        pos.left -= 80;

        // Account for scroll position
        pos.top -= $(window).scrollTop();
        pos.left -= $(window).scrollLeft();

        // Avoid showing too close to the bottom
        pos.top = Math.min(pos.top, windowHeight - 300);
        pos.left = Math.min(pos.left, $(window).width() - 300);

        // Do some boundary checking
        pos.top = Math.max(pos.top, 0);
        pos.left = Math.max(pos.left, 0);

        return pos;
    }

    function show(options) {

        // items
        // positionTo
        // showCancel
        // title
        var dialogOptions = {
            removeOnClose: true,
            enableHistory: options.enableHistory
        };

        var backButton = false;

        if (layoutManager.tv) {
            dialogOptions.size = 'fullscreen';
            backButton = true;
            dialogOptions.autoFocus = true;
        } else {

            dialogOptions.modal = false;
            dialogOptions.entryAnimationDuration = 160;
            dialogOptions.exitAnimationDuration = 200;
            dialogOptions.autoFocus = false;
        }

        var dlg = paperdialoghelper.createDialog(dialogOptions);
        var pos = options.positionTo ? getPosition(options) : null;

        dlg.classList.add('actionSheet');

        var html = '';
        html += '<div class="actionSheetContent">';

        if (options.title) {

            if (layoutManager.tv) {
                html += '<h1 class="actionSheetTitle">';
                html += options.title;
                html += '</h1>';
            } else {
                html += '<h2 class="actionSheetTitle">';
                html += options.title;
                html += '</h2>';
            }
        }

        html += '<div class="actionSheetScroller">';

        var itemsWithIcons = options.items.filter(function (o) {
            return o.ironIcon;
        });

        // If any items have an icon, give them all an icon just to make sure they're all lined up evenly
        var renderIcon = itemsWithIcons.length;
        var center = options.title && (!itemsWithIcons.length /*|| itemsWithIcons.length != options.items.length*/);

        if (center) {
            dlg.classList.add('centered');
        }

        var enablePaperMenu = !layoutManager.tv;
        enablePaperMenu = false;
        var itemTagName = 'paper-button';

        if (enablePaperMenu) {
            html += '<paper-menu>';
            itemTagName = 'paper-menu-item';
        }

        for (var i = 0, length = options.items.length; i < length; i++) {

            var option = options.items[i];

            var autoFocus = option.selected ? ' autoFocus' : '';
            html += '<' + itemTagName + autoFocus + ' noink class="actionSheetMenuItem" data-id="' + option.id + '" style="display:block;">';

            if (option.ironIcon) {
                html += '<iron-icon class="actionSheetItemIcon" icon="' + option.ironIcon + '"></iron-icon>';
            }
            else if (renderIcon && !center) {
                html += '<iron-icon class="actionSheetItemIcon"></iron-icon>';
            }
            html += '<span>' + option.name + '</span>';
            html += '</' + itemTagName + '>';
        }

        if (enablePaperMenu) {
            html += '</paper-menu>';
        }

        if (options.showCancel) {
            html += '<div class="buttons">';
            html += '<paper-button dialog-dismiss>' + dialogText.get('Cancel') + '</paper-button>';
            html += '</div>';
        }
        html += '</div>';

        dlg.innerHTML = html;

        if (pos) {
            dlg.style.position = 'fixed';
            dlg.style.left = pos.left + 'px';
            dlg.style.top = pos.top + 'px';
        }

        document.body.appendChild(dlg);

        // Seeing an issue in some non-chrome browsers where this is requiring a double click
        //var eventName = browser.firefox ? 'mousedown' : 'click';
        var eventName = 'click';

        return new Promise(function (resolve, reject) {

            dlg.addEventListener(eventName, function (e) {

                var actionSheetMenuItem = parentWithClass(e.target, 'actionSheetMenuItem');

                if (actionSheetMenuItem) {

                    var selectedId = actionSheetMenuItem.getAttribute('data-id');

                    paperdialoghelper.close(dlg);

                    // Add a delay here to allow the click animation to finish, for nice effect
                    setTimeout(function () {

                        if (options.callback) {
                            options.callback(selectedId);
                        }

                        resolve(selectedId);

                    }, 100);
                }

            });

            paperdialoghelper.open(dlg);
        });
    }

    return {
        show: show
    };
});