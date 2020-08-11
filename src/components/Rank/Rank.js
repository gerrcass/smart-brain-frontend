import React from "react";

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: "",
    };
  }
  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.entries === this.props.entries &&
      prevProps.name === this.props.name
    ) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    /* see the code of the following AWS Lambda function:
    https://github.com/gerrcass/smart-brain-serverless-aws-lambda */
    fetch(
      `https://mogvpxyhci.execute-api.us-east-1.amazonaws.com/prod/rank/?rank=${entries}`
    )
      .then((resp) => resp.json())
      .then((emojiRank) => this.setState({ emoji: emojiRank.input }))
      .catch(console.log);
  };
  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div className="white f3">
          {`${name}, your current entry count is...`}
        </div>
        <div className="white f1">{entries}</div>
        <div className="white f3">{`Rank Badge: ${this.state.emoji}`}</div>
      </div>
    );
  }
}
export default Rank;
