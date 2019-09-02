import React, { Component } from 'react'
import style from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      CardList: [],
      MyCard: [],
      cardDetails: {},
      showList: false,
      showDetail: false,
    }
  }

  componentDidMount() {
    Axios.get(`http://localhost:3030/api/cards`)
    .then( res =>
      {this.setState({CardList: res.data.cards})}
    );
  }

  componentDidUpdate() {
    console.log(this.state.MyCard);
    console.log(this.state.CardList);
  }

  openList = () => {
    this.setState({showList:true});
  }

  addToDex = value => {
    let tempDex = this.state.MyCard;
    tempDex.push(value);
    this.setState({MyCard:tempDex,showList:false});
  }

  removeDex = index => {
    let tempDex = this.state.CardList;
    tempDex.splice(index,1);
    this.setState({CardList:tempDex});
  }

  returnCard = (value,index) => {
    let tempMyDex = this.state.MyCard;
    let tempListDex = this.state.CardList
    tempMyDex.splice(index,1);
    tempListDex.push(value);
    this.setState({CardList:tempListDex,MyCard:tempMyDex});
  }

  cardDetail = value => {
    this.setState({cardDetails:value,showDetail:true});
  }
  closeDetail = () => {
    this.setState({showDetail:false})
  }


  render () {
    return (
      <div style={{height:"100%",width:"100%",overflow:"scroll"}}>
        <nav className="navbar navbar-danger bg-danger" style={{position:"absolute",bottom:"0",width:"100%",zIndex:"2"}}>
          <button onClick={this.openList} className="btn btn-danger">ADD</button>
        </nav>
        <div className="container-fulid">
        <h3>My Pokemon's Dex</h3>
        <div className="row">
        {this.state.MyCard.map((res,index) => 
          <React.Fragment>
          <img key={index} className="col-3" src={res.imageUrl} />
          <div className="col-3">
            <h4>id: {res.name}</h4>
            <p>Type: {res.type}</p>
            <p>HP: {res.hp}</p>
            <p>RetreatCost: {res.convertedRetreatCost}</p>
            <p>Series: {res.series}</p>
            <button onClick={this.cardDetail.bind(this,res)} className="btn btn-primary">Details</button>
            <button onClick={this.returnCard.bind(this,res,index)} className="btn btn-danger">Remove</button>
          </div>
          </React.Fragment>
        )}
        </div>
        </div>
        {this.state.showList ?  <CardList CardList={this.state.CardList} addCard={this.addToDex} removeDex={this.removeDex}/>:null}
        {this.state.showDetail ? <CardDetail detail={this.state.cardDetails} closeBut={this.closeDetail} />:null }
      </div>
    )
  }
}

class CardList extends Component {
  constructor(props){
    super(props)
  }

  addToDex = (value,index) => {
    this.props.addCard(value);
    this.props.removeDex(index);
  }
  render() {
    return (
      <div style={{height:"650px",width:"100%",position:"absolute",top:"0",zIndex:"1",overflowX:"hidden",overflowY:"scroll",backgroundColor:"#333",color:"white"}}>
        <div  className="row">
        {this.props.CardList.map((res,index) => 
          <React.Fragment>
          <img key={index} className="col-3" src={res.imageUrl} />
          <div className="col-3">
            <h4>id: {res.name}</h4>
            <p>Type: {res.type}</p>
            <p>HP: {res.hp}</p>
            <p>RetreatCost: {res.convertedRetreatCost}</p>
            <p>Series: {res.series}</p>
            <button onClick={this.addToDex.bind(this,res,index)} className="btn btn-danger">Add</button>
          </div>
          </React.Fragment>
        )}
        </div>
      </div>
    )
  }
}

class CardDetail extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    console.log(this.props);
    
  }
  render() {
    const card = this.props.detail;
    return (
      <div style={{height:"650px",width:"100%",position:"absolute",top:"0",zIndex:"1",overflowX:"hidden",overflowY:"scroll",backgroundColor:"#333",color:"white"}}>
        <div className="row justify-content-center">
          <img src={card.imageUrlHiRes} className="col-9" />
          <div className="col-12 row justify-content-center">
          <button className="btn btn-secondary" onClick={this.props.closeBut}>Close</button>
          </div>
        </div>
      </div>
    )
  }
}