import React, { Component } from 'react'

export default class Pagination extends Component {
    state = {
      paginator: {
        pages: Math.ceil(Number(this.props.totalClients)/this.props.paginatorLimit)
      }

    }

  render() {

    const { newest } = this.props
    const btnLast = (newest > 1) ? <button 
    onClick={this.props.lastPage}
    className="btn btn-success mr-2">
      &laquo; Prior Page 
    </button> : '';

    // Next button 
    const { pages } = this.state.paginator;

    const btnNext = (newest !== pages) ? <button 
     onClick={this.props.nextPage}
    className="btn btn-success">
    Next Page &raquo; 
  </button> : '';
    

    return (
      <div className="mt-5 d-flex justify-content-center">
        {btnLast}
        {btnNext}
      </div>
    )
  }
}
