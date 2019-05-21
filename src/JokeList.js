import React, { Component } from 'react';
import axios from 'axios';
import './_JokeList.scss';
import Joke from './Joke';

export default class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};

	constructor(props) {
		super(props);
		this.state = { jokes: [] };
		this.handleVote = this.handleVote.bind(this);
	}

	async componentDidMount() {
		// Load jokes
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' }
			});
			jokes.push({ id: res.data.id, text: res.data.joke, votes: 0 });
		}
		this.setState({ jokes: jokes });
	}

	handleVote(id, change) {
		this.setState(st => ({
			jokes: st.jokes.map(j =>
				j.id === id ? { ...j, votes: j.votes + change } : j
			)
		}));
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
						return (
							<Joke
								upvote={() => this.handleVote(j.id, 1)}
								downvote={() => this.handleVote(j.id, -1)}
								key={j.id}
								votes={j.votes}
								text={j.text}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}
