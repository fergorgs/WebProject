import React from 'react'
import '../style.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Content() {
        return(
            <main>
                <div class="sub">
                    <h2>
                        Você é?
                    </h2>
                </div>
                <div class="btnHolder">
                    <Link to="/admin">
                    
                        <button class="select">Admiminstrador</button>
                    
                    </Link>
                    <Link to="/client">
                        <button class="select">Cliente</button>
                        </Link>
                </div>
          </main>
        )
}

export default Content