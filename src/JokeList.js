import React, { Component } from 'react';
import axios from 'axios';
import './_JokeList.scss';

export default class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};

	constructor(props) {
		super(props);
		this.state = { jokes: [] };
	}

	async componentDidMount() {
		// Load jokes
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' }
			});
			jokes.push(res.data.joke);
		}
		this.setState({ jokes: jokes });
	}

	render() {
		return (
			<div className="JokeList">
				<div className="JokeList__sidebar">
					<h1 className="JokeList__sidebar-title">
						<span>Dad</span> Jokes
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="zany face"
						className="JokeList__sidebar-image"
					/>
					<button className="JokeList__sidebar-getmore">New Jokes</button>
				</div>
				<div className="JokeList__jokes">
					{this.state.jokes.map(j => {
						return <div>{j}</div>;
					})}
				</div>
			</div>
		);
	}
}
