import React from 'react'

export default function Header(props) {
  return (
    <div>
      <header className="App-header">
        <h2>{props.header}</h2>
      </header>
    </div>
  );
}
