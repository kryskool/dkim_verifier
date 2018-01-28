/* eslint-env browser */
/* eslint strict: ["warn", "function"] */
/* global Components, Services */

Components.utils.import("resource://gre/modules/Services.jsm");

function onLoad(paneID) {
	"use strict";

	/**
	 * Ensure that the window is with enough to fit the given element
	 * @param {string} id - ID of element to fit window to
	 * @return {void}
	 */
	function sizeWidthToContent(id) {
		let currentPane = document.getElementById(id);
		if (currentPane) {
			let changeWidthBy = currentPane._content.scrollWidth - currentPane._content.clientWidth;
			window.resizeBy(changeWidthBy, 0);
		} else {
			Components.utils.reportError("DKIM Verifier: id '" + id + "' not found");
		}
	}

	if (Services.vc.compare(Services.appinfo.platformVersion, "59.0-1") < 0) {
		// Resize the separate options window, which was used before Thunderbird 59.
		let fadeInEffect = Services.prefs.
		getBoolPref("browser.preferences.animateFadeIn");
		if (!fadeInEffect) {
			window.sizeToContent();
		} else {
			sizeWidthToContent(paneID);
		}
	} else {
		// fix bug ???
		let prefWindow = document.getElementById("dkim_verifier-preferences");
		prefWindow._initialized = true;
		sizeWidthToContent(paneID);
	}
}

var gDKIMonpaneload = this.onLoad;
