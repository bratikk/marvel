export default class MarvelService {
   _apiKey = '97a7fac576316546ae2a4178390d82d2';
   _baseURL = 'https://gateway.marvel.com:443/v1/public/';
   _baseOffset = 210;

   getResource = async url => {
      const res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status ${res.status}`);
      }

      return await res.json();
   };

   getAllCharacters = async (offset = this._baseOffset) => {
      const res = await this.getResource(
         `${this._baseURL}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`,
      );

      return res.data.results.map(this._transformCharacter);
   };

   getCharacter = async id => {
      const res = await this.getResource(
         `${this._baseURL}characters/${id}?apikey=${this._apiKey}`,
      );

      return this._transformCharacter(res.data.results[0]);
   };

   _transformCharacter = char => {
      return {
         id: char.id,
         name: char.name,
         wiki: char.urls[1].url,
         comics: char.comics.items,
         homepage: char.urls[0].url,
         description: char.description
            ? char.description
            : 'There is no description for this character',
         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      };
   };
}
