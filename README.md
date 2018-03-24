# Your Browser Sucks

[![Greenkeeper badge](https://badges.greenkeeper.io/tobiasf/your-browser-sucks.svg)](https://greenkeeper.io/)

[![npm](https://img.shields.io/npm/v/your-browser-sucks.svg)](https://www.npmjs.com/package/your-browser-sucks)
[![npm](https://img.shields.io/npm/l/your-browser-sucks.svg)](https://github.com/tobiasf/your-browser-sucks/blob/master/LICENSE)

A simple React component for detecting outdated browsers and showing a notification to the user advising them to update.

## Installation

Using [npm](https://www.npmjs.com/package/your-browser-sucks):

```bash
npm install --save your-browser-sucks
```

## Usage

        import Browser from 'your-browser-sucks';
        <Browser />

You can also specify specific browser version requirements:

        <Browser supported={{Chrome: 61}} />

## Author

[Tobias Føyn Føyen]({http://github.com/tobiasf})

Based on [outdated-browser-rework](https://github.com/mikemaccana/outdated-browser-rework)
