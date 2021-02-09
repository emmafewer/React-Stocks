import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    allStocks: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(json => this.setState({allStocks: json, stocks: json}))
  }

  handleStock = (stock) => {
    let portfolio = this.state.portfolio.filter(stateStock => stateStock.id !== stock.id)
    if (this.state.portfolio.includes(stock)) {
      this.setState({
        portfolio: portfolio
      })
    } else {
      this.setState({
        portfolio: [...this.state.portfolio,stock]
      })
    }
  }

  filterStocks = (e) => {
    let filteredStocks = this.state.allStocks.filter(stock => stock.type === e.target.value)
    if (e.target.value !== 'All') {
      this.setState({
        stocks: filteredStocks
      })
    } else {
      this.setState({stocks: this.state.allStocks})
    }
  }

  handleSort = (e) => {
    console.log(e.target.value)
    switch(e.target.value){
      case 'Price':
        let sortedStocksByPrice = this.state.allStocks.sort((a, b) => (b.price - a.price))
        this.setState({stocks:sortedStocksByPrice})
      case 'Alphabetically':
        let sortedStocksByName = this.state.allStocks.sort((a, b) => a.name.localeCompare(b.name))
        this.setState({stocks:sortedStocksByName})
      default:
        this.setState({stocks: this.state.allStocks})
    }
  }

  render() {
    return (
      <div>
        <SearchBar priceChecked={this.state.priceChecked} handleSort={this.handleSort} filterStocks={this.filterStocks}/>
          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} handleStock={this.handleStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} handleStock={this.handleStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
