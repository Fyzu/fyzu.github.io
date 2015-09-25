/**
 * Created by Dmitry on 25.09.2015.
 */

// ����������� ����������
Translator.prototype.Lexer = function () {

    /*
     * ������ Lexer'�
     */
    // ������ ����� ���������
    this.parseNumber = function(index){
        var lexem = '';                                     // ���������� �������
        var symbol = this.source[this.strIndex][index];     // �������������� ������
        var firstEntry = index;                             // ������ ������� ���������

        // �������� ������� �������
        do {
            lexem += symbol;
            index++;
            symbol = this.source[this.strIndex][index];
        } while(index<this.source[this.strIndex].length && symbol.isNumber());

        // ��������� ���������� ������� � �������
        var item = [lexem, 50, 0, this.strIndex, firstEntry];
        this.Lexemes.push(item);
        this.Numbers.push(item);

        return index-1;
    }

    // ������ ��������� ���������
    this.parseStr = function(index) {
        var lexem = '';                                             // ���������� �������
        var startSymbol = this.source[this.strIndex][index++];      // ��������� ������
        var symbol = this.source[this.strIndex][index];             // �������������� ������
        var firstEntry = index;                                     // ������ ��������� �������

        console.log(this.source[this.strIndex]);
        if(symbol) {    // ���� ������ �� �������
            // �������� ������ �������
            while (index < this.source[this.strIndex].length && (!symbol.isApostrophe() || this.source[this.strIndex][index-1] == '\\')) {
                lexem += symbol;
                index++;
                symbol = this.source[this.strIndex][index];
            }
            // ���������, ������� �� ��������� ���������
            if (symbol == startSymbol) {    // ���� ��, �� ��������� � ������
                var item = [lexem, 51, 0, this.strIndex, firstEntry];
                this.Lexemes.push(item);
                this.Strings.push(item);
            } else {    // ���� ���, �� �������� �� ������
                var item = [lexem, "quotes are not closed", this.strIndex, firstEntry];
                this.Errors.push(item);
            }
        }

        return index;
    }

    // ������ ���������������
    this.parseIdnt = function(index) {
        var lexem = '';                                     // ���������� �������
        var symbol = this.source[this.strIndex][index];     // �������������� ������
        var firstEntry = index;                             // ������ ��������� �������

        // ������� ������ �������
        do {
            lexem += symbol;
            index++;
            symbol = this.source[this.strIndex][index];
        } while(index<this.source[this.strIndex].length && (symbol.isLetter() || symbol.isNumber() || symbol == '.'));

        // ��������� �������� �� ������� �������� ������
        for(var i = 0;i<this.keywords.length;i++) {
            if(this.keywords[i][0] == lexem) {
                var item = [lexem, this.keywords[i][1], 0, this.strIndex, firstEntry];
                this.Lexemes.push(item);

                return index-1;
            }
        }
        // ���� ������� �� �������� �����, �� �������������
        var item = [lexem, 40, 0, this.strIndex, firstEntry];
        this.Lexemes.push(item);
        this.Identifiers.push(item);

        return index-1;
    }

    // ������ �������
    this.parseSymbol = function(index) {
        var symbol = this.source[this.strIndex][index];     // �������������� ������
        var firstEntry = index;                             // ������ ��������� �������

        // ���������, ���������� �� ������
        for(var i = 0;i<this.symbols.length;i++) {
            if(this.symbols[i][0] == symbol) {
                var item = [symbol, this.symbols[i][1], this.symbols[i][2], this.strIndex, firstEntry];
                this.Lexemes.push(item);
                return index;
            } else if(this.symbols[i][0] == symbol+this.source[this.strIndex][index+1]) {
                var item = [symbol+this.source[this.strIndex][index+1], this.symbols[i][1], this.symbols[i][2], this.strIndex, firstEntry];
                this.Lexemes.push(item);
                return index;
            }
        }

        // ���� ������ �� ����������, �� �������� �� ������
        var item = [symbol, "illegal symbol", this.strIndex, firstEntry];
        this.Errors.push(item);

        return index;
    }


    /*
     * ����������� Lexer'�
     */

    // ���������, �� ������ �� �������� ��� �������� ��
    if(!this.source || this.source.length == 0) {
        return;
    }

    // ������������ ������ ��������� ����
    for(this.strIndex = 0;this.strIndex<this.source.length;this.strIndex++) {
        for (var index = 0; index < this.source[this.strIndex].length; index++) {
            var symbol = this.source[this.strIndex][index];
            if (symbol.isNumber()) {    // ���� �����
                console.log("Symbol - \'" + symbol + "\' is Number");
                index = this.parseNumber(index);
            } else if (symbol.isApostrophe()) {   // ���� ��������(������ ������)
                console.log("Symbol - \'" + symbol + "\' is Apostrophe");
                index = this.parseStr(index);
            } else // ���� ������������� � �������
            if (symbol.isLetter() || symbol == "_") {   // ���� �����
                console.log("Symbol - \'" + symbol + "\' is Letter");
                index = this.parseIdnt(index);
            } else if (symbol == ' ' || symbol == '\r' || symbol == '\t') {
                continue;
            } else {    // ���� �� �����
                console.log("Symbol - \'" + symbol + "\' is no Letter");
                index = this.parseSymbol(index);
            }
        }
    }
}