import {validateRequired} from "~/lib/validations";

describe('Required validation test', () => {
  it('Should reject if value is an empty string', () => {
    // given
    const value = '';
    // when
    const result = validateRequired(value);
    // then
    expect(result).toBe(false);
  })

  it('Should reject if value is undefined', () => {
    // given
    const value = undefined;
    // when
    const result = validateRequired(value);
    // then
    expect(result).toBe(false);
  })

  it('Should accept if value is an not empty string', () => {
    // given
    const value = 'my value';
    // when
    const result = validateRequired(value);
    // then
    expect(result).toBe(true);
  })

})
