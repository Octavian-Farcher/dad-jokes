In this project I created two components JokeList and Joke
Joke component is stateless only using the props passed down by parent component
JokeList uses JSON parsing to initialize the state from LocalStorage window property
The parent component uses axios to render jokes as json objects from "https://icanhazdadjoke.com/" that are stored as strings in the localStorage being stored in state
With each pressing of the New Jokes button the app calls for a set of 10 new Jokes (having a default props numJokesToGet: 10 that is used in a condition)
After each rendering of the constructor, we store the items from the local storage inside  seenJokes that we initialize in the constructor.
When we are rendering a new Set of jokes we always check if each joke is already stored inside the seenJokes variable if it is, our while loop will render a new set
With each arrow u can upvote or downvote any joke, immediately changing their positioning in the list by sorting them from the highest number of votes to lowest
