import React, { PureComponent } from "react";

export default class Profile extends PureComponent {
	render() {
		const help = chrome.i18n.getMessage("help");
		const intro = chrome.i18n.getMessage("introduction");
		// const motto = chrome.i18n.getMessage("motto");
		const profile1 = chrome.i18n.getMessage("profile1");
		const profile2 = chrome.i18n.getMessage("profile2");

		return (
			<div id="profile">
				<div className="profile-body">
					<h1>
						{help} <i className="cp-iconfont cp-searchclose"></i>
					</h1>

					<div className="profile-content">
						<dl>
							<dt>{intro}</dt>
							<dd>
								<p>{profile1}</p>
								<p>{profile2}</p>
							</dd>
						</dl>
            dl
					</div>
				</div>
			</div>
		);
	}
}
