"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyBarChart = ({ visits }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleBarClick = (entry) => {
    setSelectedValue(entry.value);
  };
  

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={visits}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" fill="#8884d8" onClick={handleBarClick} />
        </BarChart>
      </ResponsiveContainer>
      {selectedValue && (
        <div>
          Valor seleccionado: {selectedValue}
        </div>
      )}
    </div>
  );
};

export default MyBarChart;


