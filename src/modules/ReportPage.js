import React, { Component } from 'react';
import {Link} from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../index.css';

var divStyle = {
  borderStyle: 'solid',
  height: '175px',
};

var centerStyle = {
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '160px',
}

class RootSection extends Component {
  render() {
    return (
      <div style={divStyle}>
        <p style={centerStyle}>{this.props.name}</p>
      </div>
    )
  }
}

class Comment extends Component {
  render() {
    var customDivStyle = Object.assign({}, divStyle);
    customDivStyle['padding'] = '1em';
    return (
      <div style={customDivStyle}>
        {this.props.comments.map(function(comment, i){
            return <p key={i}>* {comment}</p>;
        })}
      </div>
    )
  }
}

class Grade extends Component {
  render() {
    return (
      <div style={divStyle}>
        <p style={centerStyle}>{this.props.numerator} / {this.props.denominator}</p>
      </div>
    )
  }
}


class ReportPage extends Component {
  render() {
    var containerStyle = {
      // marginLeft
    };

    var rowStyle = {
      marginBottom: '2em'
    };

    var rootSections = [
      {
        'name': 'Markup & Accessibility',
        'comments': ['this', 'that', 'and that'],
        'numerator': 37,
        'denominator': 40
      },
      {
        'name': 'Header',
        'comments': ['this', 'that', 'and that', 'plus this!'],
        'numerator': 29,
        'denominator': 30
      }
    ];

    return (
      <div className="body">
        <h1>Grade Report</h1>
        <Link to="/">Home</Link>

        <div className='container' style={containerStyle}>
        {rootSections.map(function(rootSection, i){
          return (
            <div key={i} className='row' style={rowStyle}>
              <div className='col-sm-2'>
                <RootSection name={rootSection.name}/>
              </div>

              <div className='col-sm-8'>
                <Comment comments={rootSection.comments}/>
              </div>

              <div className='col-sm-2'>
                <Grade numerator={rootSection.numerator} denominator={rootSection.denominator}/>
              </div>
            </div>
          );
        })}

        </div>
      </div>
    );

  }
}

export default ReportPage;

            // <div className='col-xs-2'>
            //   <RootSection name={"Markup & Accessibility"}/>
            // </div>

            // <div className='col-xs-8'>
            //   <Comment comments={['this', 'that', 'and that']}/>
            // </div>

            // <div className='col-xs-2'>
            //   <Grade numerator={37} denominator={40}/>
            // </div>