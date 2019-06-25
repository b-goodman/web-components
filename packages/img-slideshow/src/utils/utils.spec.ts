import { getStatus } from '.';

describe( getStatus, () => {
  it('returns 200 for existant web asset', () => {
    expect(getStatus("https://picsum.photos/200/300")).resolves.toBe(200);
  });


});
