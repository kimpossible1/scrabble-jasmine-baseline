// Do not remove
import Word from 'models/word';

describe('Word', () => { // can also write it function() {
  describe('constructor', () => {
    it('Tracks text', () => {
      var word = new Word({
        text: 'test',
      });

      expect(word.get('text')).toEqual('test');
    });

    it ('Converts text to lowercase', () => {
      const word = new Word({ text: 'TeSt' });

      expect(word.get('text')).toEqual('test');
    });
  });

  describe('validate', () => {
    it ('permits valid words', () => {
      const testWords = ['f', 'dog', 'pig', 'goat', 'swizzle'];

      testWords.forEach( (text) => {
        const word = new Word({ text: text });

        expect(word.isValid()).toBeTruthy(`word: ${text}, error: ${word.validationError}`);
        //2nd argument is for: if test fails it will console log this to show me what happened ("error:${word.validationError}")
      });
    });

    it ('permits upper- and lower-case letters', () => {
      const testWords = ['dog', 'DOG', 'DoG'];
      testWords.forEach((text) => {
        const word = new Word({ text: text });

        expect(word.isValid()).toBeTruthy(`word: ${text}, error: ${word.validationError}`);
      });
    })

    it ('requires text', () => {
      const word = new Word();

      expect(word.isValid()).toBeFalsy();
    });

    // DPR: This is a little pedantic, but it's something I
    // actually ran into while implementing the front end
    // so before fixing the problem I added a test
    it ('requires text to be a string', () => {
      const word = new Word({ text: 333 });

      expect(word.isValid()).toBeFalsy();
    });

    it ('rejects empty words', () => {
      const word = new Word({ text: '' });

      expect(word.isValid()).toBeFalsy();
    });

    it ('rejects words > 7 letters', () => {
      // Boundary condition: 7 letters should work,
      // 8 should fail
      let word = new Word({ text: 'abcdefg' });

      expect(word.isValid()).toBeTruthy();

      word = new Word({ text: 'abcdefgh' });

      expect(word.isValid()).toBeFalsy();
    });

    it ('rejects things other than letters', () => {
      const words = [
        new Word({ text: '!@#$' }),
        new Word({ text: 'aa&bb' }),
        new Word({ text: '123' })
      ];
      words.forEach((word) => {
        expect(word.isValid()).toBeFalsy(`word: ${word.get('text')}`);
      });
    });
  });

  describe('score', () => {
    it ('Correctly scores simple words', () => {
      var word = new Word({text: "cat"});

      expect(word.score()).toEqual(5);
    });

    it ('Adds 50 points for a 7-letter word', () => {
      var word7 = new Word({text: "lizards"}) //lizards is 17 points +50

      expect(word7.score()).toEqual(67);
    });

    it ('Returns undefined if the word is invalid', () => {
      var invalidWord = new Word({text: "@!akajk"})
      expect(invalidWord.score()).not.toBeDefined();

      var invalidWord = new Word({text: "aaaaaaaa"})
      expect(invalidWord.score()).not.toBeDefined();
    });
  });
});
