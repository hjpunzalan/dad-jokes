import React, { Component } from 'react';
import axios from 'axios';
import './_JokeList.scss';
import Joke from './Joke';
import uuid from 'uuid/v4';

export default class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};

	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]')
		};
		this.handleVote = this.handleVote.bind(this);
	}

	componentDidMount() {
		if (this.state.jokes.length === 0) this.getJokes();
	}

	handleVote(id, change) {
		this.setState(st => ({
			jokes: st.jokes.map(j =>
				j.id === id ? { ...j, votes: j.votes + change } : j
			)
		}));
	}

	async getJokes() {
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' }
			});
			jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
		}
		this.setState({ jokes: jokes });
		window.localStorage.setItem('jokes', JSON.stringify(jokes));
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
							<div key={j.id} className="JokeList__jokes-joke">
								<Joke
									upvote={() => this.handleVote(j.id, 1)}
									downvote={() => this.handleVote(j.id, -1)}
									votes={j.votes}
									text={j.text}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
