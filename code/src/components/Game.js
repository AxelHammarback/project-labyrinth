import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { startGame} from '../reducers/rooms'

import { continueGame } from '../reducers/rooms'

import arrow_one from '../assets/arrow-one.svg'
import arrow_split from '../assets/arrow-split.svg'

export const Game = () => {
  const room = useSelector(store => store.rooms)
  // We'll use this variable to check if things are loading or not.
  const isLoading = useSelector(store => store.loader.isLoading)
  const universalUsername = useSelector(state => state.rooms.username)

  // This will make it run only the first time the component mounts. 
  // "You can use the useEffect hook to run a function when the component has been mounted. By giving it an empty array as second argument it will only be run after the initial render."
  useEffect(() => {
    startGame(universalUsername);
  }, []);

  return (
    <>
      <div className="box-description">
        <p>{room.gameState.coordinates}</p>
        <p className="spacer-description">◆</p>
        <p>"{room.gameState.description}"</p>
      </div>

      {/* Logic to display either one arrow, two arrows, or a "Game completed" text */}
      {
        (room.gameState.actions.length === 1)
          ? <img className="image-arrow" src={arrow_one} alt="arrow" />
          : null
      }
      {
        (room.gameState.actions.length === 2)
          ? <img className="image-arrow" src={arrow_split} alt="arrow" />
          : null
      }
      {
        (room.gameState.actions.length === 0)
          ?
          <>
            <h2 className="gameover-text">You completed the labyrinth!</h2>
            <button onClick={() => window.location.reload()}>
              &gt; Restart game
            </button>
          </>
          : null
      }

      <div className="container-actions">
        {/* // For every action that's possible, push out a "box-action" box – the box containing an action description and direction. */}
        {room.gameState.actions.map((action) =>
          <div className="box-action">
            <p>"{action.description}"</p>
            <button
              key={action.direction}
              /* If the game is loading (using the global "isLoading" variable), set disabled to true to prevent multiple clicks.*/
              disabled={isLoading}
              /* When clicking button, run the "continueGame" function, and pass the direction as an argument. */
              onClick={() => continueGame(action.direction, universalUsername)}
            >
              &gt; {action.direction}
            </button>
          </div>
        )}
      </div>
    </>
  )
}