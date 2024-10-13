import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice"

function Counter() {

    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0)

    const addValue = Number(amount) || 0;

    const resetall = () => {
        dispatch(reset())
        setAmount(0)
    }
  return (
    <section>
        <h1>{count}</h1>
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(reset())}>reset</button>
        </div>

        <div>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <button onClick={() => dispatch(incrementByAmount(addValue))}>add amount</button>
            <button onClick={resetall}>Reset All</button>
        </div>
    </section>
  )
}

export default Counter