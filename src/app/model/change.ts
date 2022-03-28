
export class Change {
  id: string;
  amount: number;
  rate: number;
  currencyTo: string;
  currencyFrom: string;
  exchangeRate: string;
  
  constructor() {
    this.id = '';
    this.currencyTo = '';
    this.currencyFrom = '';
    this.exchangeRate = '';
    this.amount = 0;   
    this.rate = 0;
  }

}

export class PageChange{
  content: Change [];
  size: number;
  totalElements: number;
  number: number;
  last: boolean;
  first: boolean;

  constructor() {
    this.content = [];
    this.size = 0;   
    this.totalElements = 0;
    this.number = 0;
    this.last = false;
    this.first = false;
  }
}

