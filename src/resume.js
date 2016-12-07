import React from 'react';
require('./style/resume.scss');

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

class resume extends React.Component{
    constructor(){
        super();
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.click = this.click.bind(this);
        this.state = {
            classAdd: 'hideResume'
        }
    }
    handleClick(){
        this.props.open();
    }
    handleMouseEnter(){
        this.setState({classAdd: 'showResume'});
    }
    handleMouseLeave(){
        this.setState({classAdd: 'hideResume'});
    }
    click(){
        if(isMobile.any()) {
            this.props.open();
        }
    }
    render(){
        let styles = {
            backgroundImage: "url("+this.props.img+")"
        }
        let classClick = 'clickHandle '+this.state.classAdd;
        return(
            <div className="col-md-4">
                <div>
                    <div className="titleJob">
                    <h2>{this.props.title}</h2>
                    <h3><a href={this.props.link}>{this.props.company}</a></h3>
                    </div>
                </div> 
                <div className="works" style={styles}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.click}
                >
                    <div className={classClick} onClick={ (e) => {this.handleClick()} }>+ More info...</div>
                      
                </div>
                
            </div>
            
        )
    }
};

export default resume;