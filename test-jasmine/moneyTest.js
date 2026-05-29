import { formatCurrency } from "../scripts/utils/money.js"; 

describe('test suite:formatCurrency',()=>
{
    it('converts cents into dollers',()=>
    {
        expect(formatCurrency(2005)).toEqual('20.05');
    });
    it('works with 0',()=>
    {
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds up to nearest cent',()=>
    {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
});