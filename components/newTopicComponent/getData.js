import React, { Component } from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';

class GetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TopicData: [],
    };
    this.Topic = this.Topic.bind(this);
  }

  componentDidMount() {
    let getRawData = JSON.parse(
      JSON.stringify(window.localStorage.getItem('content'))
    );

    let rawData = JSON.parse(getRawData);

    console.log(rawData.blocks);

    //if(rawData){
    this.setState({
      TopicData: rawData.blocks,
    });
    //}

    console.log(this.state.TopicData);
  }

  Topic = (data) => {
    console.log('asdada');
    data.map((item) => {
      return (<h1 key={item}>hello</h1>);
    });
  };

  render() {
    if (!this.state.TopicData) {
      return <h3 className='loading'>Loading...</h3>;
    }

    return <div>{this.Topic(this.state.TopicData)}</div>;
  }
}

export default GetData;
