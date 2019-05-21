import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './_Joke.scss';

export default class Joke extends Component {
	render() {
		return (
			<div className="Joke">
				<div className="Joke-buttons">
					<i className="fas fa-arrow-up" onClick={this.props.upvote} />
					<span className="Joke-votes">{this.props.votes}</span>
					<i className="fas fa-arrow-down" onClick={this.props.downvote} />
				</div>
				<div className="Joke-text">{this.props.text}</div>
				<div className="Joke-smiley">
					<i class="em em-rolling_on_the_floor_laughing" />
				</div>
			</div>
		);
	}
}
