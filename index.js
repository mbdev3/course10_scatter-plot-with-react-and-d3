import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData';
import { AxisBottom } from './axisBottom';
import { AxisLeft } from './axisLeft';
import { Marks } from './Marks';
import {
  csv,
 
  scaleLinear,
  max,
  format,
  extent
} from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;
const margin = {
  top: 20,
  bottom: 60,
  right: 30,
  left: 100,
};

const App = () => {
  const data = useData();
  if (!data) {
    return <pre>loading..</pre>;
  }
  const xValue = (d) => d.sepal_length;
  const xAxisLabel = 'Sepal length'
  
  const yValue = (d) => d.sepal_width;
    const yAxisLabel = 'Sepal width'
  
  const innerHeight =
    height - margin.top - margin.bottom;
  const innerWidth =
    width - margin.right - margin.left;
  
    const xScale = scaleLinear()
    .domain(extent(data,xValue))
    .range([0, innerWidth]).nice()
  
  const yScale = scaleLinear()
    .domain(extent(data,yValue))
    .range([0, innerHeight])
   


  const siFormat = format('.2s')
const xAxisTickFormat = tickValue=>siFormat(tickValue).replace('G','B')
const tooltipFormat = tickValue=>format(",.2r")(tickValue).replace('G','B')
 

return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          innerHeight={innerHeight}
          xScale={xScale}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth}/>
        <text
          className="label"
          textAnchor="middle"
          x={innerWidth / 2}
          y={height - margin.bottom / 2}
        >
          {xAxisLabel}
        </text>
        <text
          className="label"
          textAnchor="middle"
          
          transform ={`translate(${-margin.left / 2},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={tooltipFormat}
          circleRadius={10}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);
