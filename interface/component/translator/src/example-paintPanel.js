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

        container.append(`N<input type="text" id="0"><br>Страна<input type="text" id="1"><br>Расположение<input type="text" id="2"><br>Широта<input type="text" id="3"><br>Долгота<input type="text" id="4"><br>Автодорога 1<input type="text" id="5"><br>Автодорога 2<input type="text" id="6"><br><input type="text" id="7" hidden>ДТ<input type="text" id="8"><br>ДТ -32°<input type="text" id="9"><br>АИ-92<input type="text" id="10"><br>BN-95<input type="text" id="11"><br>АИ-95 Флагман<input type="text" id="12"><br>АИ-95<input type="text" id="13"><br>Газ<input type="text" id="14"><br>АИ-98<input type="text" id="15"><br>Владелец<input type="text" id="16"><br><button onclick="var tableRef = document.getElementById('table123').getElementsByTagName('tbody')[0];var newRow = tableRef.insertRow(-1);var innerHTMLText = '';for (let index = 0; index <= 16; index++) {var element = document.getElementById(index.toString());innerHTMLText += '<td>' + element.value + '</td>';element.value = '';}newRow.innerHTML = innerHTMLText;">Add</button><table border="1" id="table123"><thead><tr><td>N</td><td>Страна</td><td>Расположение</td><td>Широта</td><td>Долгота</td><td>Автодорога 1</td><td>Автодорога 2</td><td></td><td>ДТ</td><td>ДТ -32°</td><td>АИ-92</td><td>BN-95</td><td>АИ-95 Флагман</td><td>АИ-95</td><td>Газ</td><td>АИ-98</td><td>Владелец</td></tr></thead><tbody></tbody></table>`);
    },

    _generateNodes: function () {
        var tableInfo = Array.prototype.map.call(document.querySelectorAll('#table123 tbody tr'), function (tr) {
            return Array.prototype.map.call(tr.querySelectorAll('td'), function (td) {
                return td.innerHTML;
            });
        });

        csvText = tableInfo.map((item) => {
            return item.join(';')
        }).join('\n');

        console.log(csvText);
        fetch('http://localhost:6543/translate', {
            method: 'POST',
            body: csvText
        }).then(response => {
            console.log(response);
        });
    }
};


