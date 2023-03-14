import React, { Component } from 'react'
import axios from 'axios'
import "./JokeList.css"
import Joke from './Joke';
import { v4 as uuidv4 } from 'uuid'


class JokeList extends Component {

    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"), id: '', loading: false
        }
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this)
    };

    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes()
    }

    async getJokes() {
        try {
            let jokes = []
            while (jokes.length < this.props.numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: 'application/json' } }
                );
                let newJoke = res.data.joke
                if (!this.seenJokes.has(newJoke)) {
                    jokes.push({ joke: res.data.joke, votes: 0, id: uuidv4() });
                } else
                    console.log("Duplicate")
            }
            this.setState(st => ({
                jokes: [...st.jokes, ...jokes],
                loading: false

            }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
        } catch (e) {
            alert(e)
        }

    }
    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j =>
                j.id === id ? { ...j, votes: j.votes + delta } : j)

        }),
            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))

    }
    handleClick() {

        this.setState({ loading: true }, this.getJokes)


    }
    render() {
        let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes)
        return (
            this.state.loading ?
                <div className='JokeList-Loading'>
                    <h1 className='JokeList-title'>Loading...</h1>
                    <div className='JokeList-spinning'></div>
                    <p className='JokeList-title'>Gamers these days have no patience.
                        Two thousand years ago, respawn wait times were  three days</p>
                </div > :
                <div className='JokeList'>
                    <div className='JokeList-sidebar'>
                        <h1 className='JokeList-title'><span>Dad</span> Jokes</h1>
                        <img src='https://www.svgrepo.com/show/209058/laughing-emoji.svg' alt='lol-emoji'></img>
                        <button className='JokeList-getmore' onClick={this.handleClick}>New Jokes</button>
                    </div>
                    <div className='JokeList-jokes'>
                        {jokes.map(j => (
                            <Joke
                                upvote={() => this.handleVote(j.id, 1)}
                                downvote={() => this.handleVote(j.id, -1)}
                                text={j.joke}
                                votes={j.votes}
                                key={j.id}
                            />
                        ))}
                    </div>
                </div>
        )
    }
}

export default JokeList