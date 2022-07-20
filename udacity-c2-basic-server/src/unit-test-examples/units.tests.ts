import { add, divide, concatting} from './units';

import { expect } from 'chai';
import 'mocha';

describe('add function', () => {

  it('should add two and two', () => {
    const result = add(2,2);
    expect(result).to.equal(4);
  });

  it('should add -2 and two', () => {
    const result = add(-2,2);
    expect(result).to.equal(0);
  });

});

describe('divide', () => {

  it('should divide 6 by 3', () => {
    const result = divide(6,3);
    expect(result).to.equal(2);
  });

  it('should divide 5 and 2', () => {
    const result = divide(5,2);
    expect(result).to.equal(2.5);
  });

  it('should throw an error if div by zero', () => {
    expect(()=>{ divide(5,0) }).to.throw('div by 0')
  });

});

// @TODO try creating a new describe block for the "concat" method
// it should contain an it block for each it statement in the units.ts @TODO.
// don't forget to import the method ;)
describe('concating test',()=>{
  
  it('should normally concat two strings', () =>{
    const result = concatting("Keep on", " Keeping on!");
    expect(result).to.equal("Keep on Keeping on!");
     });
  
  it("Should throw error from missing string", () =>{
    const a = "Hello"
    var b:any;
    expect(()=>{concatting(a,b)}).to.throw('missing one string');
  });
});
