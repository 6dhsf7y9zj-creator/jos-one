import assert from 'node:assert/strict';
import test from 'node:test';
import {advanceStatus, healthScore, nextSku, sourceCheck} from '../../assets/domain.js';
const base={sku:'JAE-0009',brand:'Nike',category:'Hoodie',description:'Test',condition:'Excellent',status:'Prep',grade:'A',storage:'A1',purchasePrice:5,landedCost:5,expectedSale:25,expectedProfit:20,roi:4,daysInStock:0};
test('SKU increments',()=>assert.equal(nextSku([base]),'JAE-0010'));
test('lifecycle advances',()=>assert.equal(advanceStatus(base).status,'Photographed'));
test('strong sourcing example buys',()=>assert.equal(sourceCheck(6,28,'Excellent','High').decision,'BUY'));
test('hard fail rejects needs attention',()=>assert.equal(sourceCheck(2,40,'Needs attention','High').decision,'PASS'));
test('health is bounded',()=>assert.ok(healthScore([base],[])>=45));
