define(['paperdialoghelper', 'layoutManager', 'dialogText', 'html!./../prompt/icons.html', 'css!./../prompt/style.css', 'paper-button', 'paper-input'], function (paperdialoghelper, layoutManager, dialogText) {

    return function (options) {

        if (typeof options === 'string') {
            options = {
                title: '',
                text: options
            };
        }

        var dialogOptions = {
            removeOnClose: true
        };

        var backButton = false;
        var raisedButtons = false;

        if (layoutManager.tv) {
            dialogOptions.size = 'fullscreen';
            backButton = true;
            raisedButtons = true;
        } else {

            dialogOptions.modal = false;
            dialogOptions.entryAnimationDuration = 160;
            dialogOptions.exitAnimationDuration = 200;
        }

        var dlg = paperdialoghelper.createDialog(dialogOptions);

        dlg.classList.add('promptDialog');

        var html = '';

        html += '<div class="promptDialogContent">';
        if (backButton) {
            html += '<paper-icon-button tabindex="-1" icon="dialog:arrow-back" class="btnPromptExit"></paper-icon-button>';
        }

        if (options.title) {
            html += '<h2>';
            html += options.title;
            html += '</h2>';
        }

        if (options.text) {
            html += '<p>';
            html += options.text;
            html += '</p>';
        }

        html += '<br/>';

        var buttonText = options.type == 'error' ? 'Ok' : 'GotIt';
        if (raisedButtons) {
            html += '<paper-button raised class="btnSubmit"><iron-icon icon="dialog:check"></iron-icon><span>' + dialogText.get(buttonText) + '</span></paper-button>';
        } else {
            html += '<div style="text-align:right;">';
            html += '<paper-button class="btnSubmit">' + dialogText.get(buttonText) + '</paper-button>';
            html += '</div>';
        }

        html += '</div>';

        dlg.innerHTML = html;

        document.body.appendChild(dlg);

        dlg.querySelector('.btnSubmit').addEventListener('click', function (e) {

            paperdialoghelper.close(dlg);
        });

        return paperdialoghelper.open(dlg);
    };
});