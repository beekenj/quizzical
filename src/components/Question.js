import { useEffect, useState } from 'react'
import he from 'he'

export default function Question(props) {

    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        setSelected(-1);
    }, [props.quiz]);
    
    // console.log(props.correct)
    
    const prettyAnswers = props.answer.map((ans, idx) => {
        // let buttonColor = '#F5F7FB'
        const isCorrect = ans === props.correct
        const isSelected = selected === idx
        
        // if (props.showAnswer && isCorrect) {
        //     buttonColor = '#94D7A2'
        // } else if (props.showAnswer && !isCorrect && isSelected) {
        //     buttonColor = '#F8BCBC'
        // } else if (isSelected) {
        //     buttonColor = '#D6DBF5'
        // }

        const style = () => {
            // Answer screen correct
            if (props.showAnswer && isCorrect) {
                return {background: '#94D7A2', border: 'none'}
            // Answer screen incorrect
            } else if (props.showAnswer && !isCorrect && isSelected) {
                return {background: '#F8BCBC', border: 'none'}
            // Answer screen default
            } else if (props.showAnswer && !isCorrect && !isSelected) {
                return {background: '#F5F7FB', opacity: '0.4'}
            // Quiz screen selected
            } else if (isSelected) {
                return {background: '#D6DBF5', border: 'none'}
            // Quiz screen default
            } else {
                return {background: '#F5F7FB'}
            }
        }

        return <button
            style={style()}
            className="question--button" 
            key={idx} 
            onClick={() => {
                if (!props.showAnswer) {
                    props.questionClick(props.id, isCorrect);
                    setSelected(idx);
                }
            }}
        >
            {he.decode(ans)}
        </button>         
    })

    return (
        <div className="question--container">
            <div className="question--header">
                {he.decode(props.question)}
            </div>
            <div className="question--answers">
                {prettyAnswers}
            </div>
            {/* <p>{props.quiz.correct_answer}</p> */}
            <hr />
        </div>
    )
}