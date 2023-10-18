import React, {useState} from 'react';
import { getRandom } from './helpers';
import Coin from "./Coin"

const CoinFlipper = (props) => {
    const [coin, setCoin] = useState(null)
    const [headCounter, setHeadCounter] = useState(0)
    const [tailCounter, setTailCounter] = useState(0)

    const handleClick = () => {
        const flippedCoin = getRandom(props.coins)
        setCoin(flippedCoin)
        if(flippedCoin.side == "head") {
            setHeadCounter(headCounter + 1)
        } else {
            setTailCounter(tailCounter + 1)
        }
    }

    return (
        <div className='CoinFlipper'>
            <h1>Let's flip</h1>
            {coin && <Coin imgSrc={coin.imgSrc} side={coin.side} />}
            <button onClick={handleClick} data-testid="flipping-button">Flip it!</button>
            <p> Out of {headCounter + tailCounter}, head: {headCounter} and tail: {tailCounter}</p>
        </div>
    )
}

CoinFlipper.defaultProps = {
    coins: [
      {
        side: "head",
        imgSrc: "https://www.pcgs.com/UserImages/71009269o.jpg"
      },
      {
        side: "tail",
        imgSrc: "https://www.pcgs.com/UserImages/71009269r.jpg"
      }
    ]
};

export default CoinFlipper;