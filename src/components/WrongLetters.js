const WrongLetters = ({ wrongLetters }) =>
{
    return (
        <div className="wrong-letters-container">
            <div>
                {wrongLetters.length > 0 && <p>Wrong</p>}
                {wrongLetters
                .map( (letter, i) => <span key={i}>{letter}</span>) //Mapping through array elements (letters) and creating new array with letters inside spans
                .reduce((prev, curr) => prev === null ? [curr] : [prev, ", ", curr], null)} {/*Going through spans containing letters and putting a comma between them*/}
            </div>
        </div>
    )
}

export default WrongLetters;