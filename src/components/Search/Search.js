import React from "react";
import './Search.css';
import searchIcon from '../../images/search.png';
const Search = ({inputCity}) => {
    function sendCity(){
        const inputValue = document.getElementById('inputField').value;
        inputCity(inputValue);
    }
    return(
        <div>
            <div className="search">
                <input id="inputField" type="text" placeholder="enter city name" spellcheck="false" />
                <button id="searchBtn"><img src={searchIcon} alt="searchIcon" onClick={sendCity}/></button>
            </div>
        </div>
    )
};
export default Search;