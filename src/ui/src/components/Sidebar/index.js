import React from 'react';

import styles from './style.module.scss';

class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state={ opened: true };
    }

    changeOpenState(){
        this.setState({ opened: !this.state.opened });
    }

    render(){
        return (
            <div className={styles["Sidebar"] + " " + (this.state.opened ? styles["expanded"] : styles["collapsed"])} onClick={this.changeOpenState.bind(this)}>

            </div>
        );
    }
}

export { Sidebar };