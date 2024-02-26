import React from "react";
import './Search.css';
import searchIcon from '../../images/search.png';
const Search = () => {
    return(
        <div>
            <div className="search">
                <input id="inputField" type="text" placeholder="enter city name" spellcheck="false" />
                <button id="searchBtn"><img src={searchIcon} alt="searchIcon"/></button>
            </div>
        </div>
    )
};
export default Search;