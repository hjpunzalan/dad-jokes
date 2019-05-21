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
			jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
			loading: false
		};
		this.handleVote = this.handleVote.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		if (this.state.jokes.length === 0) this.getJokes();
	}

	handleVote(id, change) {
		this.setState(
			st => ({
				jokes: st.jokes.map(j =>
					j.id === id ? { ...j, votes: j.votes + change } : j
				)
			}),
			() =>
				window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
	}

	async getJokes() {
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let res = await axios.get('https://icanhazdadjoke.com/', {
				headers: { Accept: 'application/json' }
			});
			jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
		}
		this.setState(
			st => ({
				loading: false,
				jokes: [...st.jokes, ...jokes]
			}),
			() =>
				window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
	}

	handleClick() {
		this.setState({ loading: true }, this.getJokes);
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="JokeList__spinner">
					<i className="far fa-8x fa-laugh fa-spin" />
					<h1 className="JokeList-title loading">Loading...</h1>
				</div>
			);
		}
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
					<button
						className="JokeList__sidebar-getmore"
						onClick={this.handleClick}
					>
						New Jokes
					</button>
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
