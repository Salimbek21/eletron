import React, {Component} from 'react';

class Timer extends Component {

   state = {
      code: null,
      time: {},
      seconds: this.props.time ? this.props.time : 0
   };

   _isMounted = false;

   timer = 0;

   secondsToTime = (secs) => {
      let hours = Math.floor(secs / (60 * 60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);

      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      return {
         "h": hours,
         "m": minutes,
         "s": seconds
      };
   };

   componentDidMount() {
      this._isMounted = true;
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      if (this._isMounted)
         this.setState({time: timeLeftVar});
   }

   componentWillUnmount() {
      this.setState({
         time: null,
         seconds: 180
      });
      this._isMounted = false;
   }

   startTimer = () => {
      if (this.timer === 0 && this.state.seconds > 0) {
         this.timer = setInterval(this.countDown, 1000);
      }
   };

   countDown = () => {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      if (this._isMounted)
         this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
         });

      // Check if we're at zero.
      if (seconds === 0) {
         this.props.setTimeLeft(false);
         clearInterval(this.timer);
      }
   };

   render() {
      return (
          <React.Fragment>
             {this.startTimer()}
             0{this.state.time.m} : {this.state.time.s < 10 ? `0${this.state.time.s}`: `${this.state.time.s}`}
          </React.Fragment>
      );
   }
}

export default Timer;