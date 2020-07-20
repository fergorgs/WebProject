import React, { useState } from 'react';
import './Carousel.css'

function Carousel(props) {
    const { cardsPerPage, children } = props;

    const [ page, setPage ] = useState(0);

    const pageBegin = page * cardsPerPage;
    const pageEnd = (page + 1) * cardsPerPage; 

    const left = () => {
        if (pageBegin > 0)
            setPage(page - 1)
    }

    const right = () => {
        if (pageEnd < children.length)
            setPage(page + 1)
    }

    let getSliderPage = () => {

        if(pageEnd === children.length)
            return 'sliderLastPage'
        else
            return 'sliderMiddlePage'
    }

    return (
        <div className="wrapper">
            <h1>{props.name}</h1>
            <div className="sliderHolder">
                <span onClick={left}> <img alt="<" src={require("./images/arrow.svg")} class="leftPointer" id="left1"/> </span>
                <div className={getSliderPage()}>
                    { children.slice(pageBegin, pageEnd) }
                </div>
                <span onClick={right}> <img alt=">" src={require("./images/arrow.svg")} class="rightPointer" id="rigth1"/> </span>
            </div>
        </div>
    )
}

export default Carousel;