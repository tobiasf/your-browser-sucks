/* globals module console window document require setTimeout */

const React = require('react');
const UserAgentParser = require('ua-parser-js');
const languageMessages = require('../src/languages.json');
const PropTypes = require('prop-types');

class Browser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showElement: true,
		};
	}
	render() {
		const parsedUserAgent = new UserAgentParser(window.navigator.userAgent).getResult();

		const options = {};

		const browserLocale = window.navigator.language ||
			window.navigator.userLanguage;

		const browserSupport = {
			Chrome: this.props.supported.Chrome ? this.props.supported.Chrome : 37,
			IE: this.props.supported.IE ? this.props.supported.IE : 11,
			Safari: this.props.supported.Safari ? this.props.supported.Safari : 9,
			'Mobile Safari': this.props.supported['Mobile Safari'] ? this.props.supported['Mobile Safari'] : 9,
			Firefox: this.props.supported.Firefox ? this.props.supported.Firefox : 32,
		};

		const requiredCssProperty = options.requiredCssProperty || false;
		const language = options.language || browserLocale.slice(0, 2);

		let updateSource = 'web';

		const isAndroid = parsedUserAgent.os.name === 'Android';
		if (isAndroid) {
			updateSource = 'googlePlay';
		}

		let isAndroidButNotChrome = null;
		if (options.requireChromeOnAndroid) {
			isAndroidButNotChrome = (isAndroid) && (parsedUserAgent.browser.name !== 'Chrome');
		}

		if (parsedUserAgent.os.name === 'iOS') {
			updateSource = 'appStore';
		}

		const isBrowserOutOfDate = () => {
			const browserName = parsedUserAgent.browser.name;
			const browserMajorVersion = parsedUserAgent.browser.major;
			let isOutOfDate = false;
			if (browserSupport[browserName]) {
				if (browserMajorVersion < browserSupport[browserName]) {
					isOutOfDate = true;
				}
			}
			return isOutOfDate;
		};

		const isPropertySupported = (prop) => {
			if (!prop) {
				return true;
			}
			const div = document.createElement('div');
			const vendorPrefixes = 'Khtml Ms O Moz Webkit'.split(' ');
			let count = vendorPrefixes.length;

			if (div.style[prop]) {
				return true;
			}

			const propz = prop.replace(/^[a-z]/, val => (
				val.toUpperCase()
			));

			while (count > 0) {
				count -= 1;
				if (div.style[vendorPrefixes[count] + propz]) {
					return true;
				}
			}
			return false;
		};

		const closeElement = (e) => {
			e.preventDefault();
			this.setState({ showElement: false });
		};

		const getmessage = (lang) => {
			const messages = languageMessages[lang] || languageMessages.en;

			const updateMessages = {
				web: (
					<p>
						{messages.update.web}
						<a id="buttonUpdateBrowser" href={messages.url} target="_blank" rel="noopener noreferrer">
							{messages.callToAction}
						</a>
					</p>
				),
				googlePlay: (
					<p>
						{messages.update.googlePlay}
						<a
							id="buttonUpdateBrowser"
							href="https://play.google.com/store/apps/details?id=com.android.chrome"
							target="_blank"
							rel="noopener noreferrer"
						>
							{messages.callToAction}
						</a>
					</p>),
				appStore: (
					<p>{messages.update[updateSource]}</p>
				),
			};

			const updateMessage = updateMessages[updateSource];

			return this.state.showElement ? (
				<div>
					<h6>{messages.outOfDate}</h6>
					{updateMessage}
					<a href="/" id="closeUpdateBrowserMessage" title={messages.close} onClick={closeElement}>×</a>
				</div>
			) : null;
		};

		if (
			(isBrowserOutOfDate() ||
			!isPropertySupported(requiredCssProperty) ||
			isAndroidButNotChrome) && this.state.showElement
		) {
			return (
				<div className={this.props.className}>
					{getmessage(language)}
				</div>
			);
		}
		return null;
	}
}

Browser.propTypes = {
	className: PropTypes.string,
	supported: PropTypes.shape({
		Chrome: PropTypes.number,
		IE: PropTypes.number,
		Safari: PropTypes.number,
		'Mobile Safari': PropTypes.number,
		Firefox: PropTypes.number,
	}),
};

Browser.defaultProps = {
	supported: {
		Chrome: 37,
		IE: 11,
		Safari: 9,
		'Mobile Safari': 9,
		Firefox: 32,
	},
	className: 'your-browser-sucks',
};

module.exports = Browser;
