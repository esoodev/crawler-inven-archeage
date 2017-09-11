class Word {

    /*
    Initialize a comment object based on the post it belongs to.
    */
    constructor(obj, write_date) {

        this.word = obj.word;
        this.literal = obj.literal;
        this.type = obj.type;
        this.write_date = write_date;

    };

    get isValid() {
        return (this.write_date != null && this.word != null);
    }

    get parameters() {
        return [this.write_date, this.word, this.type, this.literal];
    }
}

module.exports = Word;

