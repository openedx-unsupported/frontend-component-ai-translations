import messages from './index';

describe('messages', () => {
  it('contains app messages', () => {
    expect(messages.length).toEqual(2);
    const appMessages = messages[1];
    const languages = Object.getOwnPropertyNames(appMessages);
    expect(languages).toContainEqual('ar');
    expect(languages).toContainEqual('es-419');
    expect(languages).toContainEqual('fr');
    expect(languages).toContainEqual('zh-cn');
    expect(languages).toContainEqual('pt');
    expect(languages).toContainEqual('it');
    expect(languages).toContainEqual('de');
    expect(languages).toContainEqual('hi');
    expect(languages).toContainEqual('fr-ca');
    expect(languages).toContainEqual('ru');
    expect(languages).toContainEqual('uk');
    expect(languages).toContainEqual('de-de');
    expect(languages).toContainEqual('it-it');
    expect(languages).toContainEqual('pt-pt');
  });
});
