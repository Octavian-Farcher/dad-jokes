import React, { Component } from 'react'
import "./Joke.css"

class Joke extends Component {
    getColor() {
        if (this.props.votes >= 15) {
            return "#4CAF50";
        } else if (this.props.votes >= 12) {
            return "#8bc34a";
        } else if (this.props.votes >= 9) {
            return "#CDDC39";
        } else if (this.props.votes >= 6) {
            return "#FFEB3B";
        } else if (this.props.votes >= 3) {
            return "#FFC107";
        } else if (this.props.votes >= 0) {
            return "#FF9800";
        } else return "#f44336";

    }
    getEmoji() {
        if (this.props.votes >= 15) {
            return "em em-rolling_on_the_floor_laughing";
        } else if (this.props.votes >= 12) {
            return "em em-laughing";
        } else if (this.props.votes >= 9) {
            return "em em-smiley";
        } else if (this.props.votes >= 6) {
            return "em em-slightly_smiling_face";
        } else if (this.props.votes >= 3) {
            return "em em-neutral_face";
        } else if (this.props.votes >= 0) {
            return "em em-confused";
        } else return "em em-angry";
    }




    render() {
        return (
            <div className='Joke'>
                <div className='Joke-buttons'>
                    <div onClick={this.props.upvote}>
                        <i className="fas fa-arrow-up"
                        /></div>
                    <span style={{ borderColor: this.getColor() }} className='Joke-votes'>{this.props.votes}</span>
                    <div onClick={this.props.downvote}>
                        <i className="fas fa-arrow-down" />
                    </div>
                </div>
                <div className='Joke-text'>{this.props.text}</div>
                <i className={this.getEmoji()}></i>

            </div >
        )
    }
}

export default Joke