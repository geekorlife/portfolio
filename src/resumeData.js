import React from 'react';

const resumeData = [
    {
        title: 'CutiDeals.com',
        link: 'http://www.cutideals.com',
        data: (
            <div className="diaglog">
                <hr/>
                <h4>From October 2016 to now...</h4>
                <div className="detail">
                    I develop a web app from scratch for a group of mom who was interested to have a 
                    dedicated place to sell and buy kid stuff.
                    <br/>
                    My main technical goal was to use ReactJS with Redux and enjoy the benefit of 
                    the Virtual DOM with a single page app.
                    <br/>
                    <div className="row">
                        <h4> Stacks</h4>
                        <div className="col-md-6">
                            <h5>Front end:</h5>
                            - React JS<br/>
                            - React Router<br/>
                            - Redux<br/>
                            - Axio / Ajax<br/>
                            - Bootstrap<br/>
                            - Webpack with Babel<br/>
                            - ES6<br/>
                        </div>
                        <div className="col-md-6">
                            <h5>Back end:</h5>
                            - Nginx<br/>
                            - Node JS<br/>
                            - Express<br/>
                            - Express route<br/>
                            - MongoDB<br/>
                            - Mongoose<br/>
                        </div>
                    </div>
                </div>
            </div>
        ),
        img: "/img/cutideals.jpg"
    },
    {
        title: 'PlatoApp.com',
        link: 'http://www.platoapp.com',
        data: (
            <div className="diaglog">
                <hr/>
                <h4>From March 2014 to October 2016</h4>
                <div className="detail">
                    Platoapp.com is mobile gaming messenger app which allows users to play multiplayer games, 
                    turn base with their Friend or Strangers.<br/>
                    As the very first employee of the Startup, I was in charge to create Javascript 
                    multiplayer games base with our API (WebGL / OpenGL).
                    <br/>
                    <h4>I created differents game (client JS / server Node JS / Mongo DB):</h4>
                    - Chess<br/>
                    - Checkers<br/>
                    - Scrabble like<br/>
                    - Go<br/>
                    - Backgammon<br/>
                    - Dominoes<br/>
                    - PlatoBlock (When Tetris becomes multiplayer and Turn base)<br/>
                </div>
            </div>
        ),
        img: "/img/plato.jpg"
    },
    {
        title: 'Gamorlive.com',
        link: 'http://venturebeat.com/2012/08/20/gamorlive-creates-a-portal-for-html5-multiplayer-mobile-games/',
        data: (
            <div className="diaglog">
                <hr/>
                <h4>From March 2011 to March 2014</h4>
                <div className="detail">
                    Gamorlive was the first cross-platform multiplayer game portal on cloud. I was 
                    in charge of the UI/UX design.
                    My work was to improve the user experience on the game portal (mobile and desktop).
                    <br/>
                    <h4>My main technical tasks were:</h4>
                    - Provided user interface design for Web-based projects, including dashboards, 
                    widgets, products and wireframes or prototypes.<br/>
                    - Developed HTML prototypes and UI deliverables, such as wireframes, flowcharts, 
                    screen mock-ups, and interface design specifications.<br/>
                    - Assisted with walk-throughs and usability testing. Update UI per changing needs 
                    and requirements.<br/>
                    - Discussed regularly with the development team features and implementation of 
                    the project.<br/>
                    - Implemented the design of the Facebook application.<br/>
                    - Created online and print ads.<br/>
                </div>
            </div>
        ),
        img: "/img/gamorlive.jpeg"
    },
    {
        title: 'Contact me',
        link: 'http://www.geekorlife.com',
        data: (
            <div className="diaglog">
                <hr/>
                <h4>Contact me by email at </h4>
                <p>
                    <a href="mailto:geekorlife@gmail.com?Subject=Hello%20Pascal" target="_top">geekorlife@gmail.com</a>
                </p>
                <h4>On my Linkedin profile</h4>
                <a href='https://www.linkedin.com/in/pascal-boudier-b7555221/en'>Linkedin</a>
                <h4>On twitter</h4>
                <a href="https://www.twitter.com/geekorlife">Twitter</a>
            </div>
        ),
        img: "/img/email.jpg"
    },
    {
        title: 'Save my skils',
        link: 'http://www.geekorlife.com',
        data: (
            <div className="diaglog" style={{textAlign:'center'}}>
                <br/><br/>
                <iframe 
                    style={{width:'670px', height:'352px', border:'none'}} 
                    src="http://www.geekorlife.com/pascalgame"
                >
                </iframe>
            </div>
        )
    }
];

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
export {resumeData, isMobile};