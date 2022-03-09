/**
 * Paint panel.
 */

 Example.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

Example.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;

        container.append('<button id="generateNodes" type="button">Генерация узлов</button>');
        $('#generateNodes').click(function () {
            self._generateNodes();
        });

        container.append(`<input type="text" id="1">name<br><input type="text" id="2">country<br><input type="text" id="3">region<br><input type="text" id="4">district<br><input type="text" id="5">city<br><input type="text" id="6">search_area<br><input type="text" id="7">main_idtf<br><button onclick="var tableRef = document.getElementById('table423423').getElementsByTagName('tbody')[0];var newRow = tableRef.insertRow(-1);var innerHTMLText = '';for (let index = 1; index <= 7; index++) {var element = document.getElementById(index.toString());innerHTMLText += '<td>' + element.value + '</td>';element.value = '';}newRow.innerHTML = innerHTMLText;">Add</button><table border="1" id="table423423"><thead><tr><td>name</td><td>country</td><td>region</td><td>district</td><td>city</td><td>search_area</td><td>main_idtf</td></tr></thead><tbody></tbody></table>`);
    },

    _generateNodes: function () {
        var tableInfo = Array.prototype.map.call(document.querySelectorAll('#table423423 tr'), function (tr) {
            return Array.prototype.map.call(tr.querySelectorAll('td'), function (td) {
                return td.innerHTML;
            });
        });

        csvText = tableInfo.map((item) => {
            return item.join(';')
        }).join('\n');

        console.log('stdout: ' + 'hello');
        fetch('http://127.0.0.1:2436/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: csvText
        }).then(response => {
            console.log(response);
        });
    }
};
