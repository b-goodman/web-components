import { getStatus } from '.';

describe( getStatus, () => {
  it('returns 200 for existant web asset', () => {
    expect(getStatus("https://demonstrations.wolfram.com/01KnapsackProblem/img/thumbnail_1.png")).resolves.toBe(200);
  });


});
