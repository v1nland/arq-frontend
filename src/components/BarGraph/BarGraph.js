import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, XAxis, YAxis, Area, CartesianGrid, AreaChart, Bar, BarChart, ResponsiveContainer } from '../../vendor/recharts';

class BarGraph extends Component{
    constructor(props, context){
        super(props, context);
    }

    render(){
        return(
            <ResponsiveContainer width="90%" aspect={2}>
                <BarChart data={this.props.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} >
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pv" stackId="1" fill="#8884d8" />
                    <Bar dataKey="uv" stackId="1" fill="#82ca9d" />
                    <Bar type="monotone" dataKey="amt" fill="#ffc658" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
export default BarGraph;
