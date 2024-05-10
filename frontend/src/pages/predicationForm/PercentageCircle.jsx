import React from 'react';

export default class PercentageCircle extends React.Component {
  constructor(props) {
    super(props);
    const percent = Math.floor(Math.max(Math.min(this.props.percent, 100), 0));
    const percentText = this.props.duration === 0 ? percent : 0;
    this.state = {
      percentText,
      percent,
      fontColor: '', // Added fontColor to state
    };
  }

  componentDidMount() {
    const { percent } = this.state;
    const divide = this.props.duration / percent; // Corrected calculation
    const unit = Math.ceil(this.props.offset / divide);
    const time = percent > 0 ? divide * unit : 0;
    if (time) {
      const addPer = () => {
        const { percent, percentText } = this.state;
        this.timeout = setTimeout(() => {
          const newPercentText = percentText + unit > percent ? percent : percentText + unit;
          return this.setState({ percentText: newPercentText }, () => {
            if (newPercentText < percent) {
              return addPer();
            }
            return clearTimeout(this.timeout);
          });
        }, time);
      };
      addPer();
    }

    this.setColors(); // Set initial colors
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  timeout = null;

  setColors = () => {
    const { percent } = this.state;
    let circleColor, circleInnerColor, fontColor;

    if (percent <= 40) {
      circleColor = 'green';
      circleInnerColor = '#c7c7c7';
      fontColor = 'green';
    } else if (percent <= 70) {
      circleColor = '#aba110';
      circleInnerColor = '#c7c7c7';
      fontColor = '#aba110';
    } else {
      circleColor = 'red';
      circleInnerColor = '#f0c3c3';
      fontColor = 'red';
    }

    this.setState({ circleColor, circleInnerColor, fontColor });
  };

  render() {
    const {
      state: { percent, percentText, circleColor, circleInnerColor, fontColor },
      props: { circleSize, duration },
    } = this;

    const viewbox = `0 0 ${circleSize} ${circleSize}`;
    const strokeWidth = circleSize / 17;
    const diameter = circleSize - strokeWidth;
    const radius = diameter / 2;
    const circumference = 2 * Math.PI * radius;
    const fakePercent = percent === 98 || percent === 99 ? 97 : percent;
    const pCircumference = (circumference * fakePercent) / 100;
    const x = circleSize / 2;
    const y = (circleSize - diameter) / 2;
    const fontSize = circleSize / 3.73;
    const textX = circleSize / 2 - fontSize / 1.8;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@-webkit-keyframes progress${circleSize}{0%{stroke-dasharray: 0 ${circumference};}}`,
      styleSheet.cssRules.length,
    );

    const d = `
      M ${x} ${y}
      a ${radius} ${radius} 0 0 1 0 ${diameter}
      a ${radius} ${radius} 0 0 1 0 ${diameter * -1}
    `;

    return (
      <div className="percentage">
        <div
          id="progress"
          style={{
            position: 'relative',
            width: circleSize,
            height: circleSize,
          }}
        >
          <svg viewBox={viewbox} stroke={circleColor}>
            <path
              style={{
                fill: 'none',
                stroke: circleInnerColor,
                strokeWidth,
              }}
              d={d}
            />
            {percent && (
              <path
                style={{
                  fill: 'none',
                  strokeWidth,
                  strokeLinecap: 'square',
                  animation: `progress${circleSize} ${duration}ms ease-out forwards`,
                }}
                d={d}
                strokeDasharray={[pCircumference, circumference]}
              />
            )}
          </svg>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              color: fontColor,
              fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
              top: textX,
              fontSize,
            }}
          >
            {percentText}
            <span style={{ fontSize: fontSize / 2 }}>%</span>
          </div>
        </div>
      </div>
    );
  }
}

PercentageCircle.defaultProps = {
  circleSize: 150, // Increased size
  percent: 39,
  duration: 1000,
  offset: 200,
};
