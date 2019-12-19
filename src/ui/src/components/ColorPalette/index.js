import React from 'react';
import styles from './style.module.scss';

class ColorPalette extends React.Component {
    render(){
        return (
            <div className={styles["colorPalette"]}>
                <div className={styles["colorSection"]}>
                    <div className={styles["color"]}></div>
                    <div className={styles["color"]}></div>
                    <div className={styles["color"]}></div>
                    <div className={styles["color"]}></div>
                    <div className={styles["color"]}></div>
                    <div className={styles["color"]}></div>
                    <div className={styles["color"]}></div>
                    <div className={styles["color"]}></div>
                    <div className={styles["color"]}></div>
                </div>
            </div>
        );
    }
}

export { ColorPalette };
