import React, {useState, useEffect} from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

//Manages the list of jokes- fetches from API, displays and manages all voting logic



// class JokeList extends Component {
//   static defaultProps = {
//     numJokesToGet: 5
//   };
function JokeList({ numJokesToGet = 5 }) {




  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     jokes: [],
  //     isLoading: true
  //   };

  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  //switching to functional components there is no need to bind functions in the constructor. Hooks take care of manageing state and effects
  //   this.generateNewJokes = this.generateNewJokes.bind(this);
  //   this.vote = this.vote.bind(this);
  // }


  /* at mount, get jokes CALLS BEFORE IN CLASS*/

  // componentDidMount() {
  //   this.getJokes();
  // }

  /* retrieve jokes from API */

  // async getJokes() {
  //   try {
  //     // load jokes one at a time, adding not-yet-seen jokes
  //     let jokes = [];
  //     let seenJokes = new Set();

    const getJokes = async () => {
       try {
         let jokes = [];
         let seenJokes = new Set();


      // while (jokes.length < this.props.numJokesToGet) {
      //   let res = await axios.get("https://icanhazdadjoke.com", {
      //     headers: { Accept: "application/json" }
      //   });
      //   let { ...joke } = res.data;

      while (jokes.length < numJokesToGet) {
        let res = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' },
        });
        let joke = res.data;

      //   if (!seenJokes.has(joke.id)) {
      //     seenJokes.add(joke.id);
      //     jokes.push({ ...joke, votes: 0 });
      //   } else {
      //     console.log("duplicate found!");
      //   }
      // }

          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokes.push({ ...joke, votes: 0 });
          } else {
            console.log('duplicate found!');
          }
        }

  //     this.setState({ jokes, isLoading: false });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

        setJokes(jokes);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
      };

      useEffect(() => {//this replaces lifecycle methods like line 34 componenetDidMount to perform the side effects: fetching jokes from API when the component mounts
        getJokes();
      }, []); 



  /* empty joke list, set to loading state, and then call getJokes */

  // generateNewJokes() {
  //   this.setState({ isLoading: true});
  //   this.getJokes();
  // }

    const generateNewJokes = () => {
      setIsLoading(true);
      getJokes();
    };


  /* change vote for this id by delta (+1 or -1) */

  // vote(id, delta) {
  //   this.setState(st => ({
  //     jokes: st.jokes.map(j =>
  //       j.id === id ? { ...j, votes: j.votes + delta } : j
  //     )
  //   }));
  // }
  const vote = (id, delta) => {
    setJokes(jokes =>
      jokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke,
      ),
    );
  };


  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);


  /* render: either loading spinner or list of sorted jokes. */

  // render() {
  //   let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
  //   if (this.state.isLoading) {
  //     return (
  //       <div className="loading">
  //         <i className="fas fa-4x fa-spinner fa-spin" />
  //       </div>
  //     )
  //   }

    return (
      <div className="JokeList">
        <button
          className="JokeList-getmore"
          // onClick={this.generateNewJokes}
          onClick={generateNewJokes}
        >
          Get New Jokes
        </button>

        {sortedJokes.map(j => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))}
      </div>
    );
  }


export default JokeList;
